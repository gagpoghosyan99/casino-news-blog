export type AuthUser = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
};

export type EmailVerificationRecord = {
  email: string;
  codeHash: string;
  attempts: number;
  expiresAt: string;
  createdAt: string;
};

export type PublicUser = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  createdAt: string;
};

export type SessionPayload = {
  sub: string;
  email: string;
  name: string;
};
