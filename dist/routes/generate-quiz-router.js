"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const generateQuiz_controller_1 = __importDefault(require("../controllers/generateQuiz_controller"));
const generateQuizRouter = (0, express_1.Router)();
// POST /api/generate_quiz - generate a new quiz
generateQuizRouter.post("/", generateQuiz_controller_1.default);
exports.default = generateQuizRouter;
