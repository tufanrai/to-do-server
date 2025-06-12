import { Request, Response, NextFunction } from "express";

export const errorMidware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const message = err.message ?? "system error";
  const statusCode = err.statusCode ?? 500;
  const status = err.status ?? "error";
  const success = err.success;

  res.status(statusCode).json({
    message,
    status,
    success,
  });
};
