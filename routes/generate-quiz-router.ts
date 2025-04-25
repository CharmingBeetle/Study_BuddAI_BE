import { Router } from "express";
import generateQuiz from "../controllers/generateQuiz_controller";

const generateQuizRouter = Router();

// POST /api/generate_quiz - generate a new quiz
generateQuizRouter.post("/", generateQuiz);

export default generateQuizRouter;