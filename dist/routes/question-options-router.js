"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const options_controller_1 = require("../controllers/options_controller");
const questionOptionsRouter = (0, express_1.Router)();
// GET /api/questions_options - get question option by question id
questionOptionsRouter.get("/:question_id", options_controller_1.getOptionsByQuestionId);
// POST /api/question_options - create question options
questionOptionsRouter.post("/", options_controller_1.postOptions);
exports.default = questionOptionsRouter;
