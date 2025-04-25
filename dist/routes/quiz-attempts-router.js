"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const attempt_controller_1 = require("../controllers/attempt_controller");
const express_1 = require("express");
const quizAttemptsRouter = (0, express_1.Router)();
quizAttemptsRouter
    .post("/", attempt_controller_1.postAttempt);
quizAttemptsRouter
    .post("/:attempt_id/submit", attempt_controller_1.postResults);
exports.default = quizAttemptsRouter;
