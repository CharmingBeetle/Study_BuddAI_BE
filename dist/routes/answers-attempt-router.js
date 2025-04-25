"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const answers_attempt_controller_1 = require("../controllers/answers_attempt_controller");
const answersAttemptRouter = (0, express_1.Router)();
answersAttemptRouter.post("/:question_id", answers_attempt_controller_1.getAttemptAnswerByQuestionId);
answersAttemptRouter.get("/", answers_attempt_controller_1.postAnswerAttempt);
exports.default = answersAttemptRouter;
