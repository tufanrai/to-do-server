import { Request, Response } from "express";
import { asyncHandler } from "../helper/async.helper";
import User from "../model/use.model";
import errorHelper from "../helper/error.helper";

// update user
export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.user;
  const { name, email, password } = req.body;

  const user = await User.findOne({ _id: id });
  if (!user) throw new errorHelper("user doesnot exists", 404);

  if (name) user.name = name;
  if (email) user.email = email;
  if (password) user.password = password;

  user.save();

  res.status(200).json({
    message: "user successfully updated",
    data: user,
    status: "success",
    success: true,
  });
});

// remove user
export const remUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.user;

  const user = await User.findOneAndDelete({ _id: id });

  res.status(200).json({
    message: "user successfully removed",
    data: user,
    status: "success",
    success: true,
  });
});
