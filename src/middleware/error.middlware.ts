import { Request, Response, NextFunction } from "express";

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const message = err.message ?? "server side error";
  const statusCode = err.statusCode ?? 500;
  const status = err.status ?? "error";
  const success = false;

  res.status(statusCode).json({
    message,
    status,
    success,
  });
};
