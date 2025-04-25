import { Router } from "express";
import { postAttempt, getResults } from "../controllers/attempt_controller";

const quizAttemptsRouter = Router();

// // POST /api/attempt - create a new quiz attempt
quizAttemptsRouter.post("/", postAttempt);

// GET /api/attempt/:attempt_id/submit - saves to db
quizAttemptsRouter.get("/:attempt_id/submit", getResults);

export default quizAttemptsRouter;