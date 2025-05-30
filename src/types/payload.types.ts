import mongoose from "mongoose";

export interface Ipayload {
  id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
}

export interface IUser {
  id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
}
