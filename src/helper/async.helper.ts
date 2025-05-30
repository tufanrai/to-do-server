import { Request, RequestHandler, Response } from "express";

type Handler = (req: Request, res: Response) => Promise<any>;

export const asyncHandler = (fun: Handler): RequestHandler => {
  return (req, res) => {
    Promise.resolve(fun(req, res)).catch((err) => console.log(err));
  };
};
