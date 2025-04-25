"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const { handleServerErrors, handleMySqlErrors, handleCustomErrors, } = require("./controllers/errors.controller");
const users_controller_1 = __importDefault(require("./controllers/users_controller"));
const quizzes_controller_1 = require("./controllers/quizzes_controller");
const options_controller_1 = require("./controllers/options_controller");
const files_router_1 = __importDefault(require("./routes/files-router"));
const answers_attempt_controller_1 = require("./controllers/answers_attempt_controller");
const questions_controller_1 = require("./controllers/questions_controller");
const attempt_controller_1 = require("./controllers/attempt_controller");
const generateQuiz_controller_1 = __importDefault(require("./controllers/generateQuiz_controller"));
//MIDDLEWARE
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// app.use("/api", apiRouter);
app.use("/files", files_router_1.default);
app.get("/", (req, res) => {
    res.send("Server running");
});
//Users
app.post("/api/users", users_controller_1.default);
//Quizzes
app.post("/api/quizzes", quizzes_controller_1.postQuizzes);
app.get("/api/quizzes/:user_id", quizzes_controller_1.getQuizByUserId);
// app.patch("/quizzes/:quiz_id", updateQuizById) //quizzes/:quiz_id/scores ??git
// app.delete("/quizzes/:quid_id", deleteQuizById) // to be added later
// //Quiz Questions
app.post("/api/questions", questions_controller_1.postQuestions);
app.get("/api/questions/:quiz_id", questions_controller_1.getQuestionsById);
// //Question Options
app.post("/api/question_options", options_controller_1.postOptions);
app.get("/api/question_options/:question_id", options_controller_1.getOptionsByQuestionId);
// //Attempted answers
app.get("/api/attempt_answer/:question_id", answers_attempt_controller_1.getAttemptAnswerByQuestionId);
app.post("/api/attempt_answer", answers_attempt_controller_1.postAnswerAttempt);
//poat answer
// //Quiz attempt
app.post("/api/attempt", attempt_controller_1.postAttempt); //posts to db
app.get("/api/attempt/:attempt_id/submit", attempt_controller_1.postResults); //posts to db
// app.patch("/attempt/:attempt_id"), updateQuizAttemptById //update score
// QUIZ GENERATION
app.post("/api/generate_quiz", generateQuiz_controller_1.default); //use this one
// *******************************************************************************
//ERROR HANDLING
app.all("*", (req, res) => {
    res.status(404).send({ msg: "Path not found" });
});
app.use(handleMySqlErrors);
app.use(handleCustomErrors);
app.use(handleServerErrors);
exports.default = app;
