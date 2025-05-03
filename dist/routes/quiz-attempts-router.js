"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const attempt_controller_1 = require("../controllers/attempt_controller");
const quizAttemptsRouter = (0, express_1.Router)();
// // POST /api/attempt - create a new quiz attempt
quizAttemptsRouter.post("/", attempt_controller_1.postAttempt);
// GET /api/attempt/:attempt_id/submit - saves to db
quizAttemptsRouter.get("/:attempt_id/submit", attempt_controller_1.getResults);
exports.default = quizAttemptsRouter;
