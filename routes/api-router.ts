import { Router } from "express";
import usersRouter from "./users-router";
import quizzesRouter from "./quizzes-router";
import questionsRouter from "./questions-router";
import questionOptionsRouter from "./question-options-router";
import quizAttemptsRouter from "./quiz-attempts-router";
import answersAttemptRouter from "./answers-attempt-router";
import generateQuizRouter from "./generate-quiz-router";

const apiRouter = Router();

apiRouter.use("/users", usersRouter);
apiRouter.use("/quizzes", quizzesRouter);
apiRouter.use("/questions", questionsRouter);
apiRouter.use("/question_options", questionOptionsRouter);
apiRouter.use("/attempt_answer", answersAttemptRouter);
apiRouter.use("/attempt", quizAttemptsRouter);
apiRouter.use("/generate_quiz", generateQuizRouter);

export { apiRouter };