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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateResults = void 0;
const connection_1 = __importDefault(require("./db/connection"));
const generateResults = (attempt_id) => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield connection_1.default.query(`SELECT COUNT(*) AS total_correct
FROM attemptAnswer aa
JOIN questionOptions qo 
  ON aa.question_options_id = qo.question_options_id
WHERE aa.attempt_id = ?
  AND qo.is_correct = TRUE;`, [attempt_id]);
    const correctAnswersCount = rows[0];
    const totalCorrect = correctAnswersCount.total_correct;
    const [rows2] = yield connection_1.default.query(`SELECT COUNT(*) AS total_questions
FROM attemptAnswer
WHERE attempt_id = ?;`, [attempt_id]);
    const totalAnswersCount = rows2[0];
    const totalAnswers = totalAnswersCount.total_questions;
    let score = totalCorrect / totalAnswers;
    const [questionResults] = yield connection_1.default.query(`SELECT
    q.question_body,
    attempted.option_body AS attempted_answer,
    correct.option_body AS correct_answer
  FROM attemptAnswer aa
  JOIN questions q
    ON aa.question_id = q.question_id
  JOIN questionOptions attempted
    ON aa.question_options_id = attempted.question_options_id
  JOIN questionOptions correct
    ON correct.question_id = q.question_id AND correct.is_correct = TRUE
  WHERE aa.attempt_id = ?;
`, [attempt_id]);
    if (score === 1) {
        score = Number(score.toFixed(2));
    }
    yield connection_1.default.query(`UPDATE attempt SET score = ? where attempt_id = ? `, [
        score,
        attempt_id,
    ]);
    const overallResult = {
        questions: questionResults,
        score: score,
    };
    return overallResult;
});
exports.generateResults = generateResults;
