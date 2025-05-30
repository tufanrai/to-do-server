import bcryptjs from "bcryptjs";

// hash password
export const hashPassword = async (password: string) => {
  const salt = await bcryptjs.genSalt(11);
  return bcryptjs.hash(password, salt);
};

// verify password
export const veriPassword = (password: string, hash: string) => {
  return bcryptjs.compare(password, hash);
};
