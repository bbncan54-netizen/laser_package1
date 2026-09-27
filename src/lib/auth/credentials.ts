import bcrypt from "bcryptjs";

/**
 * Single-admin credential check.
 *
 * Set these in the environment (never in source):
 *   ADMIN_USERNAME       plain username
 *   ADMIN_PASSWORD_HASH  bcrypt hash of the password (see scripts/hash-password.mjs)
 */
export async function verifyAdminCredentials(
  username: string,
  password: string
): Promise<boolean> {
  const expectedUsername = process.env.ADMIN_USERNAME;
  const expectedHash = process.env.ADMIN_PASSWORD_HASH;

  if (!expectedUsername || !expectedHash) {
    throw new Error(
      "ADMIN_USERNAME / ADMIN_PASSWORD_HASH are not set. Configure them before using /admin."
    );
  }

  if (username !== expectedUsername) {
    await bcrypt.compare(password, expectedHash);
    return false;
  }

  return bcrypt.compare(password, expectedHash);
}
