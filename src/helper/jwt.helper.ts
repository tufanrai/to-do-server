import jwt, { JwtPayload } from "jsonwebtoken";
import { Ipayload } from "../types/payload.types";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY ?? "";
const JWT_EXPIRY_DATE = process.env.JWT_EXPIRY_DATE;

// generate token
export const genToken = async (user: Ipayload) => {
  return jwt.sign(user, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRY_DATE as any });
};

// check token
export const veriToken = async (token: string) => {
  return jwt.verify(token, JWT_SECRET_KEY) as JwtPayload;
};
