import { Router } from "express";
import { postQuizzes, getQuizByUserId } from "../controllers/quizzes_controller";

const quizzesRouter = Router();

// POST /api/quizzes - create a new quiz
quizzesRouter.post("/", postQuizzes);

// GET /api/quizzes/:user_id - get quizzes by user id
quizzesRouter.get("/:user_id", getQuizByUserId);

export default quizzesRouter;