"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const options_controller_1 = require("../controllers/options_controller");
const express_1 = require("express");
const questionOptionsRouter = (0, express_1.Router)();
questionOptionsRouter.get("/:question_id", options_controller_1.getOptionsByQuestionId);
questionOptionsRouter.post("/", options_controller_1.postOptions);
exports.default = questionOptionsRouter;
