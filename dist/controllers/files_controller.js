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
const pdfParse_1 = __importDefault(require("../services/pdfParse"));
const files_model_1 = __importDefault(require("../models/files_model"));
const uploadFiles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    try {
        if (!file) {
            res.status(400).json({ error: "No PDF uploaded" });
            return;
        }
        const { text } = yield (0, pdfParse_1.default)(file.buffer);
        const user_id = parseInt(req.body.user_id);
        if (isNaN(user_id)) {
            res.status(400).json({ error: "Invalid user ID" });
            return;
        }
        const { file_id } = yield (0, files_model_1.default)(text, user_id);
        res.status(201).json({
            success: true,
            message: "PDF text saved to database",
            file_id: file_id
        });
    }
    catch (err) {
        console.error("PDF extraction failed:", err);
        res.status(500).json({
            error: "PDF processing failed."
        });
    }
});
exports.default = uploadFiles;
