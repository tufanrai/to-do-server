import { Request, Response, NextFunction } from "express";
import { errorHelper } from "../helper/error.helper";
import { verifyToken } from "../helper/jwt.helper";

export const AuthUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new errorHelper("no authorization", 401);
    }

    if (authHeader.length != 2 && !authHeader.startsWith("BEARER")) {
      throw new errorHelper("no bearer", 401);
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      throw new errorHelper("no token", 401);
    }

    const verifiedToken = verifyToken(token);

    console.log(verifiedToken.id);

    if (!verifiedToken) {
      throw new errorHelper("no verified", 401);
    }

    if (verifiedToken.exp && verifiedToken.exp * 1000 < Date.now()) {
      throw new errorHelper("token expired please login again", 406);
    }

    req.user = {
      id: verifiedToken.id,
      full_name: verifiedToken.full_name,
      email: verifiedToken.email,
      password: verifiedToken.password,
    };

    next();
  } catch (error) {
    next(error);
  }
};
