import { Request, Response } from "express";
import { asyncHelper } from "../helper/asyncFn.helper";
import User from "../model/user.model";
import { errorHelper } from "../helper/error.helper";

// update user
export const updateUser = asyncHelper(async (req: Request, res: Response) => {
  const data = req.body;
  const { id } = req.user;

  const user = await User.findOne({ _id: id });

  if (!user) throw new errorHelper("user does not exists", 406);

  if (data.full_name) user.full_name = data.full_name;
  if (data.email) user.email = data.email;
  if (data.password) user.password = data.password;

  user.save();

  res.status(200).json({
    message: "user successfully updated",
    data: user,
  });
});

// remove user
export const delUser = asyncHelper(async (req: Request, res: Response) => {
  const { id } = req.user;

  const user = await User.findOneAndDelete({ _id: id });

  if (!user) {
    throw new errorHelper("user does not exists", 406);
  }

  res.status(200).json({
    message: "user successfully deleted",
    data: user,
  });
});
