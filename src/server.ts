import "dotenv/config";
import cors from "cors";
import express, { Request, Response } from "express";
import { errorMiddleware } from "./middleware/error.middlware";
import router from "./router/auth.router";
import routerTask from "./router/task.router";
import { dbConfig } from "./config/db.config";

// import url's
const PORT = process.env.PORT;
const URl = process.env.DB_URL ?? "";

// database configuration
dbConfig(URl);

// app instance
const app = express();

// use cors
app.use(
  cors({
    origin: "*",
  })
);

// use middleware
app.use(express.urlencoded());
app.use(express.json());

// use router
app.use("/api/auth", router);
app.use("/api", routerTask);
app.use("/*spalt", (req: Request, res: Response) => {
  res.status(404).json({
    message: "search not found",
  });
});
app.use(errorMiddleware);
// server start
app.listen(PORT, () =>
  console.log(`server started at http://localhost:${PORT}`)
);
