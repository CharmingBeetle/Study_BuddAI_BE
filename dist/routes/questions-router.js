"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const questions_controller_1 = require("../controllers/questions_controller");
const express_1 = require("express");
const questionsRouter = (0, express_1.Router)();
// GET /api/questions/:quiz_id - get the new quiz questions by quiz id
questionsRouter.get("/:quiz_id", questions_controller_1.getQuestionsById);
// POST /api/questions - create the new questions
questionsRouter.post("/", questions_controller_1.postQuestions);
exports.default = questionsRouter;
