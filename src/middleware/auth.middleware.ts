import { Request, Response, NextFunction } from "express";
import errorHelper from "../helper/error.helper";
import { veriToken } from "../helper/jwt.helper";
import User from "../model/use.model";

export const authMiddlware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      throw new errorHelper("unauthorize access, access denied", 406);
    }

    if (authHeader && authHeader.split(" ")[0] !== "BEARER") {
      throw new errorHelper("access denied", 406);
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      throw new errorHelper("access denied", 406);
    }

    const verify = await veriToken(token);

    if (!verify) {
      throw new errorHelper("access denied", 406);
    }

    const expiryDate = verify.exp;
    if (!expiryDate) {
      throw new errorHelper("access denied", 406);
    }

    if (expiryDate / 1000 > Date.now() / 1000) {
      throw new errorHelper("token expired please login again", 406);
    }

    const user = await User.findOne({ _id: verify.id });

    if (!user) {
      throw new errorHelper("access denied", 406);
    }

    req.user = {
      id: verify.id,
      name: verify.name,
      email: verify.email,
      password: verify.password,
    };
    next();
  } catch (error) {
    next(error);
  }
};
