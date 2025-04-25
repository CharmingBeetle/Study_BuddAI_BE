"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const generateQuizTest_1 = require("../generateQuizTest");
const generateQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log(req.body);
        // Validate all fields exist
        if (!req.body.user_id || !req.body.quiz_name || !req.body.file_id) {
            res.status(400).json({ error: "Missing required fields" });
            return;
        }
        const quiz_id = yield (0, generateQuizTest_1.createQuiz)({
            user_id: Number(req.body.user_id),
            quiz_name: req.body.quiz_name,
            file_id: Number(req.body.file_id),
        });
        res.status(201).send({ quiz_id });
        return;
    }
    catch (error) {
        console.error("Quiz-specific error:", error);
        res.status(500).json({
            error: "Quiz generation failed",
            details: error instanceof Error && error.message.includes("quiz")
                ? error.message
                : "Internal error",
        });
        return;
    }
});
exports.default = generateQuiz;
