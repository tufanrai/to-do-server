import mongoose from "mongoose";

export const DbConfig = (url: string) => {
  mongoose
    .connect(url)
    .then(() => console.log("database connected to server successfully"))
    .catch((err) => console.log(err));
};
