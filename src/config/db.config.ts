import mongoose from "mongoose";

export const dbConfig = (url: string) => {
  mongoose
    .connect(url)
    .then(() => console.log("server connected to DB successfully 💾"))
    .catch((err) => console.log(err));
};
