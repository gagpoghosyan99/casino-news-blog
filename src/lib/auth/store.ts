import { createHash, randomBytes, randomInt } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import type { AuthUser, EmailVerificationRecord } from "./types";

type AuthDb = {
  users: AuthUser[];
  verifications: EmailVerificationRecord[];
};

function dataDir() {
  return process.env.AUTH_DATA_DIR || path.join(process.cwd(), "data", "auth");
}

function dbPath() {
  return path.join(dataDir(), "store.json");
}

async function ensureStore(): Promise<void> {
  const dir = dataDir();
  await fs.mkdir(dir, { recursive: true });
  try {
    await fs.access(dbPath());
  } catch {
    const empty: AuthDb = { users: [], verifications: [] };
    await fs.writeFile(dbPath(), JSON.stringify(empty, null, 2), "utf8");
  }
}

async function readDb(): Promise<AuthDb> {
  await ensureStore();
  const raw = await fs.readFile(dbPath(), "utf8");
  const parsed = JSON.parse(raw) as AuthDb;
  return {
    users: Array.isArray(parsed.users) ? parsed.users : [],
    verifications: Array.isArray(parsed.verifications) ? parsed.verifications : [],
  };
}

async function writeDb(db: AuthDb): Promise<void> {
  await ensureStore();
  const tmp = `${dbPath()}.${process.pid}.${Date.now()}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(db, null, 2), "utf8");
  await fs.rename(tmp, dbPath());
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function createUserId(): string {
  return `u_${randomBytes(12).toString("hex")}`;
}

export function hashCode(code: string): string {
  return createHash("sha256").update(code).digest("hex");
}

export function generateVerificationCode(): string {
  return String(randomInt(100000, 999999));
}

export async function findUserByEmail(email: string): Promise<AuthUser | undefined> {
  const db = await readDb();
  const key = normalizeEmail(email);
  return db.users.find((u) => u.email === key);
}

export async function findUserById(id: string): Promise<AuthUser | undefined> {
  const db = await readDb();
  return db.users.find((u) => u.id === id);
}

export async function createUser(input: {
  name: string;
  email: string;
  passwordHash: string;
}): Promise<AuthUser> {
  const db = await readDb();
  const email = normalizeEmail(input.email);
  if (db.users.some((u) => u.email === email)) {
    throw new Error("EMAIL_TAKEN");
  }
  const now = new Date().toISOString();
  const user: AuthUser = {
    id: createUserId(),
    name: input.name.trim(),
    email,
    passwordHash: input.passwordHash,
    emailVerified: false,
    createdAt: now,
    updatedAt: now,
  };
  db.users.push(user);
  await writeDb(db);
  return user;
}

export async function markUserVerified(email: string): Promise<AuthUser | undefined> {
  const db = await readDb();
  const key = normalizeEmail(email);
  const user = db.users.find((u) => u.email === key);
  if (!user) return undefined;
  user.emailVerified = true;
  user.updatedAt = new Date().toISOString();
  db.verifications = db.verifications.filter((v) => v.email !== key);
  await writeDb(db);
  return user;
}

export async function upsertVerification(
  email: string,
  code: string,
  ttlMinutes = 15
): Promise<void> {
  const db = await readDb();
  const key = normalizeEmail(email);
  const now = Date.now();
  const record: EmailVerificationRecord = {
    email: key,
    codeHash: hashCode(code),
    attempts: 0,
    expiresAt: new Date(now + ttlMinutes * 60_000).toISOString(),
    createdAt: new Date(now).toISOString(),
  };
  db.verifications = db.verifications.filter((v) => v.email !== key);
  db.verifications.push(record);
  await writeDb(db);
}

export async function consumeVerificationCode(
  email: string,
  code: string
): Promise<"ok" | "invalid" | "expired" | "locked"> {
  const db = await readDb();
  const key = normalizeEmail(email);
  const record = db.verifications.find((v) => v.email === key);
  if (!record) return "invalid";
  if (new Date(record.expiresAt).getTime() < Date.now()) {
    db.verifications = db.verifications.filter((v) => v.email !== key);
    await writeDb(db);
    return "expired";
  }
  if (record.attempts >= 8) return "locked";
  if (record.codeHash !== hashCode(code.trim())) {
    record.attempts += 1;
    await writeDb(db);
    return record.attempts >= 8 ? "locked" : "invalid";
  }
  db.verifications = db.verifications.filter((v) => v.email !== key);
  await writeDb(db);
  return "ok";
}
