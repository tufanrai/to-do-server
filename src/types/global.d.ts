import { IPayload } from "./payload";

declare global {
  namespace Express {
    interface Request {
      user: IPayload;
    }
  }
}
