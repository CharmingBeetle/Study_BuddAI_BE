"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const upload_1 = __importDefault(require("../services/upload"));
const files_controller_1 = __importDefault(require("../controllers/files_controller"));
const filesRouter = express_1.default.Router();
const multerErrorHandler_1 = __importDefault(require("../middleware/multerErrorHandler"));
// POST /api/files/upload - create a new file
filesRouter.post('/upload', upload_1.default.single('file'), multerErrorHandler_1.default, files_controller_1.default);
exports.default = filesRouter;
