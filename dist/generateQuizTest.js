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
exports.createQuiz = void 0;
const genai_1 = require("@google/genai");
const genai_2 = require("@google/genai");
const connection_1 = __importDefault(require("./db/connection"));
const quizzes_model_1 = require("./models/quizzes_model");
const questions_model_1 = require("./models/questions_model");
const options_model_1 = require("./models/options_model");
const ai = new genai_1.GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });
const createQuiz = (params) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // Validate all parameters
    if (Object.values(params).some(val => typeof val === 'number' ? isNaN(val) : !val)) {
        throw new Error(`Invalid parameters: ${JSON.stringify(params)}`);
    }
    const questionsAmount = 4;
    const ai = new genai_1.GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });
    const [rows] = yield connection_1.default.query(`SELECT file_text, LENGTH(file_text) as length FROM files WHERE file_id = ?`, [params.file_id]);
    // Add type guard
    if (!Array.isArray(rows) || !rows.length) {
        throw new Error("No matching file found");
    }
    if (rows[0].length > 100000) { // ~100KB
        throw new Error("File too large for processing");
    }
    const fileText = rows[0].file_text;
    const fileId = rows[0].file_id;
    if (!(fileText === null || fileText === void 0 ? void 0 : fileText.trim())) {
        throw new Error("File text is empty");
    }
    if (!fileText) {
        throw new Error("File text not found for the given file_id");
    }
    const geminiResult = yield ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: (0, genai_2.createUserContent)([
            fileText,
            "\n\n",
            `Can you make a quiz with ${questionsAmount} multiple questions each with an option A, B, C, D based on the content above with the quiz title of "${params.quiz_name}"? Each question should have a text body and a corresponding array of options objects. Each option object should have a label (A, B, C, D), and an isCorrect  binary key indicating if the answer is correct or not and an option text body. Return the quiz as a JSON object.
      
      For example in the form of:
      
          {
      title: 'My quiz about dogs',
      questions:     [
      {
        text: 'How many adult teeth does a dog typically have?',
        options:     [
      { label: 'A', isCorrect: false, text: '32' },
      { label: 'B', isCorrect: true, text: '42' },
      { label: 'C', isCorrect: false, text: '28' },
      { label: 'D', isCorrect: false, text: '36' }
    ]
      },
      {
        text: 'What is a unique feature that can be used to identify an individual dog?',
        options:     [
      { label: 'A', isCorrect: false, text: '32' },
      { label: 'B', isCorrect: true, text: '42' },
      { label: 'C', isCorrect: false, text: '28' },
      { label: 'D', isCorrect: false, text: '36' }
    ]
      },
      {
        text: 'Which breed is known for NOT barking?',
        options:     [
      { label: 'A', isCorrect: false, text: '32' },
      { label: 'B', isCorrect: true, text: '42' },
      { label: 'C', isCorrect: false, text: '28' },
      { label: 'D', isCorrect: false, text: '36' }
    ]
      },
      {
        text: 'What is a common behavioral issue observed in dogs?',
        options:     [
      { label: 'A', isCorrect: false, text: '32' },
      { label: 'B', isCorrect: true, text: '42' },
      { label: 'C', isCorrect: false, text: '28' },
      { label: 'D', isCorrect: false, text: '36' }
    ]
      }
    ]
    }`,
        ]),
    });
    // trim the result and get data in the correct format
    const quizString = (_a = geminiResult.text) === null || _a === void 0 ? void 0 : _a.replace("```json", "").replace("```", "").trim();
    if (!quizString) {
        throw new Error("quizString is undefined");
    }
    const quizData = JSON.parse(quizString);
    // console.log(quizData.questions[0].options)
    // insert into Quiz table
    // console.log(typeof (params.file_id), "line 31")
    const quizInsert = yield (0, quizzes_model_1.insertQuiz)(params.user_id, params.quiz_name, params.file_id);
    const newQuizId = quizInsert.quiz_id;
    const quizQuestions = quizData.questions;
    for (const question of quizQuestions) {
        const newQuestion = {
            quiz_id: newQuizId,
            question_body: question.text,
        };
        const questionInsert = yield (0, questions_model_1.insertQuestion)(newQuestion);
        const newQuestionId = questionInsert.question_id;
        const questionOptions = question.options;
        for (const option of questionOptions) {
            yield (0, options_model_1.insertQuestionOption)(newQuestionId, option.text, option.isCorrect, option.label);
        }
    }
    return newQuizId;
});
exports.createQuiz = createQuiz;
;
