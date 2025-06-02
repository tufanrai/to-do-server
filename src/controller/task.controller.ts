import { Request, Response } from "express";
import { asyncHandler } from "../helper/async.helper";
import errorHelper from "../helper/error.helper";
import Task from "../model/task.model";

// create task
export const createTask = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.user;
  const { title, discription } = req.body;

  if (!title) {
    throw new errorHelper("please enter the title of your task", 406);
  }

  const task = await Task.create({
    user: id,
    title,
    discription,
  });

  res.status(200).json({
    message: "task successfully created",
    data: task,
    status: "success",
    success: true,
  });
});

// read task
export const readTask = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.user;
  const { limit, page } = req.params;

  const limitingPage = parseInt(limit) || 5;
  const currentPage = parseInt(page) || 1;

  const task = await Task.find({ user: id })
    .limit(limitingPage)
    .skip((currentPage - 1) * limitingPage)
    .sort({ createdAt: -1 });

  const totalPage = (await Task.countDocuments({ user: id })) / limitingPage;

  if (!task) {
    throw new errorHelper("no any task to display", 404);
  }

  res.status(200).json({
    message: "task found successfully",
    status: "success",
    data: task,
    success: true,
  });
});

// get task by id
export const redByIdTask = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.user;
  const { _id } = req.body;

  if (!_id) {
    throw new errorHelper("please enter the task id", 406);
  }

  const task = await Task.findOne({ _id, user: id });

  if (!task) {
    throw new errorHelper("task doen not exist", 404);
  }
});

// update task
export const updTask = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.user;
  const { _id, title, discription } = req.body;

  const task = await Task.findOne({ _id, user: id });
  if (!task) throw new errorHelper("task not founc", 406);

  if (title) task.title = title;
  if (discription) task.discription = discription;

  task.save();

  res.status(200).json({
    message: "task updated successfully",
    data: task,
    status: "success",
    success: true,
  });
});

// remove task
export const remTask = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.user;
  const { _id } = req.body;

  const task = await Task.findOneAndDelete({ _id, user: id });

  res.status(200).json({
    message: "task removed successfully",
    data: task,
    status: "success",
    success: true,
  });
});
