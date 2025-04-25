
import { getQuestionsById, postQuestions } from "../controllers/questions_controller";
import { Router } from "express";

const questionsRouter = Router();

// GET /api/questions/:quiz_id - get the new quiz questions by quiz id
questionsRouter.get("/:quiz_id", getQuestionsById)

// POST /api/questions - create the new questions
questionsRouter.post("/", postQuestions)

export default questionsRouter;