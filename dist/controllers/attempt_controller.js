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
exports.getResults = exports.postAttempt = void 0;
const attempt_models_1 = require("../models/attempt_models");
const generateResults_1 = require("../generateResults");
const postAttempt = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { quiz_id } = req.body;
    try {
        const attempt = yield (0, attempt_models_1.insertAttempt)(quiz_id);
        res.status(201).send({ attempt });
    }
    catch (err) {
        next(err);
    }
});
exports.postAttempt = postAttempt;
const getResults = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const attemptId = Number(req.params.attempt_id);
        const result = yield (0, generateResults_1.generateResults)(attemptId);
        res.status(200).send({ result });
    }
    catch (err) {
        next(err);
    }
});
exports.getResults = getResults;
