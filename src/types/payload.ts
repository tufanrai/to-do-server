import mongoose from "mongoose";

export interface IPayload {
  id: mongoose.Types.ObjectId;
  full_name: string;
  email: string;
  password: string;
}
