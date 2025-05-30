import { IUser } from "./payload.types";

declare global {
  namespace Express {
    interface Request {
      user: IUser;
    }
  }
}
