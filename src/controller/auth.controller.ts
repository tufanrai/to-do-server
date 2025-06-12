import { Request, Response, NextFunction } from "express";
import { asyncHelper } from "../helper/asyncFn.helper";
import { errorHelper } from "../helper/error.helper";
import { hashPass, verifyPass } from "../helper/hash.helper";
import User from "../model/user.model";
import { GenToken } from "../helper/jwt.helper";

// create user account
export const createAccount = asyncHelper(
  async (req: Request, res: Response) => {
    const { password, ...data } = req.body;

    if (!password || !data) {
      throw new errorHelper("please enter all the required data", 406);
    }

    const pass = await hashPass(password);

    const user = await User.create({ password: pass, ...data });

    if (!user) {
      throw new errorHelper("user with this email already exists", 406);
    }

    res.status(200).json({
      message: "account successfully created",
      data: user,
    });
  }
);

// log user
export const logUser = asyncHelper(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email) throw new errorHelper("please enter the email", 406);
  if (!password) throw new errorHelper("please enter your password", 406);

  const user = await User.findOne({ email });

  if (!user) {
    throw new errorHelper("user with this email does not exists", 406);
  }

  const pass = verifyPass(password, user.password);

  if (!pass) {
    throw new errorHelper("either your password or email is incorrect", 406);
  }

  const token = await GenToken({
    id: user._id,
    full_name: user.full_name,
    email: user.email,
    password: user.password,
  });

  res.status(200).json({
    message: "user successfully loged in",
    data: user,
    access_token: token,
  });
});
