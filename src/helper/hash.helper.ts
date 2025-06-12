import bcrypt from "bcryptjs";

// Password hashing
export const hashPass = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// verify Password
export const verifyPass = async (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};
