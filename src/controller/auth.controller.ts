import { Request, Response } from "express";
import { asyncHandler } from "../helper/async.helper";
import errorHelper from "../helper/error.helper";
import { hashPassword, veriPassword } from "../helper/bcrypt.helper";
import User from "../model/use.model";
import { genToken } from "../helper/jwt.helper";

// register new user
export const signup = asyncHandler(async (req: Request, res: Response) => {
  const { password, ...data } = req.body;

  if (!password) {
    throw new errorHelper("please enter the password", 406);
  }
  if (!data) {
    throw new errorHelper("please enter all the required datas", 406);
  }

  const haspass = await hashPassword(password);

  const user = await User.create({ password: haspass, ...data });

  res.status(200).json({
    message: "user created successfully",
    data: user,
    status: "success",
    success: true,
  });
});

// login user
export const logUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email) {
    throw new errorHelper("please enter email", 406);
  }
  if (!password) {
    throw new errorHelper("please enter password", 406);
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new errorHelper("user doesnot exists", 404);
  }

  const authPass = await veriPassword(password, user.password);
  if (!authPass) {
    throw new errorHelper("email or password is incorrect", 406);
  }

  const token = await genToken({
    id: user._id,
    name: user.name,
    email: user.email,
    password: user.password,
  });

  res.status(200).json({
    message: "successfully loged in",
    data: user,
    status: "success",
    success: true,
    acess_token: token,
  });
});
