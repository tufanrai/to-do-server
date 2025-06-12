import "dotenv/config";
import express, { json, urlencoded, Request, Response } from "express";
import cors from "cors";
import userRouter from "./router/user.router";
import taskRouter from "./router/todo.router";
import { errorMidware } from "./middleware/error.middleware";
import { DbConfig } from "./config/dbConfig";

// import of sensative data
const PORT = process.env.PORT;
const url = process.env.DB_URL ?? "";

// app instance
const app = express();

// db config
DbConfig(url);

// use of middleware
app.use(
  cors({
    origin: "*",
  })
);
app.use(urlencoded());
app.use(json());

// router
app.use("/api/user", userRouter);
app.use("/api/todo", taskRouter);
app.use("/*spalt", (req: Request, res: Response) => {
  res.status(404).json({
    message: "search not found",
    status: 404,
  });
});
app.use(errorMidware);

app.listen(PORT, () =>
  console.log(`server started at http://localhost:${PORT}`)
);
