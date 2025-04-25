import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from "cors";
import { Request, Response } from "express";
import { 
  handleServerErrors,
  handleMySqlErrors, 
  handleCustomErrors 
} from "./controllers/errors.controller";
import { apiRouter } from "./routes/api-router";

// init app
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// root
app.get("/", (req: Request, res: Response) => {
  res.send("Server running");
});

// routers
app.use("/api", apiRouter);

import filesRouter from "./routes/files-router";
app.use("/files", filesRouter);

// error handling
app.use((req: Request, res: Response) => {
  res.status(404).send({ msg: "Path not found" });
});

app.use(handleMySqlErrors);
app.use(handleCustomErrors);
app.use(handleServerErrors);

export default app;