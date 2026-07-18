import {
  consumeVerificationCode,
  generateVerificationCode,
  upsertVerification,
} from "./store";
import { sendVerificationEmail } from "./email";

export async function issueAndSendVerificationCode(input: {
  email: string;
  name: string;
}): Promise<void> {
  const code = generateVerificationCode();
  await upsertVerification(input.email, code, 15);
  await sendVerificationEmail({
    to: input.email,
    name: input.name,
    code,
  });
}

export { consumeVerificationCode };
