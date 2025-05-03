"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const answers_attempt_controller_1 = require("../controllers/answers_attempt_controller");
const answersAttemptRouter = (0, express_1.Router)();
// POST /api/attempt_answer - create a new answer attempt
answersAttemptRouter.post("/", answers_attempt_controller_1.postAnswerAttempt);
// GET /api/attempt_answer/:question_id - get answer attempt by question id
answersAttemptRouter.get("/:question_id", answers_attempt_controller_1.getAttemptAnswerByQuestionId);
exports.default = answersAttemptRouter;
