import jwt, { JwtPayload } from "jsonwebtoken";
import { IPayload } from "../types/payload";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY ?? "";
const JWT_EXPIRY_DATE = process.env.JWT_EXPIRY_DATE;

// gen token
export const GenToken = async (user: IPayload) => {
  const token = await jwt.sign(user, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRY_DATE as any,
  });

  return token;
};

// verify token
export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET_KEY) as JwtPayload;
};
