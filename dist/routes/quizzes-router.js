"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const quizzes_controller_1 = require("../controllers/quizzes_controller");
const express_1 = require("express");
const quizzesRouter = (0, express_1.Router)();
quizzesRouter
    .post("/", quizzes_controller_1.postQuizzes);
quizzesRouter
    .get("/:question_id", quizzes_controller_1.getQuizByUserId);
exports.default = quizzesRouter;
