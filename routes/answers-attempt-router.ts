import { Router } from "express";
import { postAnswerAttempt, getAttemptAnswerByQuestionId } from "../controllers/answers_attempt_controller";

const answersAttemptRouter = Router();

// POST /api/attempt_answer - create a new answer attempt
answersAttemptRouter.post("/", postAnswerAttempt);

// GET /api/attempt_answer/:question_id - get answer attempt by question id
answersAttemptRouter.get("/:question_id", getAttemptAnswerByQuestionId);


export default answersAttemptRouter;