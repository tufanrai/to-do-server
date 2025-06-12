import { Request, Response, NextFunction, RequestHandler } from "express";

type Handler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

export const asyncHelper = (fn: Handler): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};
