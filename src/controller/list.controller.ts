import { Request, Response, NextFunction } from "express";
import { errorHelper } from "../helper/error.helper";
import ToDoList from "../model/list.model";
import { asyncHelper } from "../helper/asyncFn.helper";

// create new to do task
export const addToDo = asyncHelper(async (req: Request, res: Response) => {
  const data = req.body;
  const { id } = req.user;

  if (!data) {
    throw new errorHelper("please enter all  the required inputs", 406);
  }

  const toDo = await ToDoList.create({ user: id, ...data });

  res.status(200).json({
    message: "task added successfully",
    data: toDo,
  });
});

// read all to do task
export const readToDo = asyncHelper(async (req: Request, res: Response) => {
  const { id } = req.user;
  const toDos = await ToDoList.find({ user: id }).sort({ createdAt: -1 });

  if (!toDos) {
    throw new errorHelper("no any task to be displayed", 404);
  }

  res.status(200).json({
    message: "data fatched",
    data: toDos,
  });
});

// get task by id
export const getTaskById = asyncHelper(async (req: Request, res: Response) => {
  const { id } = req.user;
  const userId = req.params.id;
  const toDos = await ToDoList.findOne({ _id: userId, user: id });

  if (!toDos) {
    throw new errorHelper("no any task to be displayed", 404);
  }

  res.status(200).json({
    message: "data fatched",
    data: toDos,
  });
});

// update todo task
export const updateToDo = asyncHelper(async (req: Request, res: Response) => {
  const id = req.params;
  const { title, description } = req.body;

  if (!id) {
    throw new errorHelper("please enter the todo id", 406);
  }

  const todo = await ToDoList.findOne({ _id: id });

  if (!todo) {
    throw new errorHelper("todo not found", 404);
  }

  if (title) todo.title = title;

  todo.save();

  res.status(200).json({
    message: "todo successfully updated",
    data: todo,
  });
});

// delete todo task
export const deleteToDo = asyncHelper(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) throw new errorHelper("todo not found", 404);

  const todo = await ToDoList.findOneAndDelete({ _id: id });

  res.status(200).json({
    message: "todo task successfully deleted",
    data: todo,
  });
});
