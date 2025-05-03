"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const quizzes_controller_1 = require("../controllers/quizzes_controller");
const quizzesRouter = (0, express_1.Router)();
// POST /api/quizzes - create a new quiz
quizzesRouter.post("/", quizzes_controller_1.postQuizzes);
// GET /api/quizzes/:user_id - get quizzes by user id
quizzesRouter.get("/:user_id", quizzes_controller_1.getQuizByUserId);
exports.default = quizzesRouter;
