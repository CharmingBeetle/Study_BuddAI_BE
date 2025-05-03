"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const errors_controller_1 = require("./controllers/errors.controller");
const api_router_1 = require("./routes/api-router");
// init app
const app = (0, express_1.default)();
// middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// root
app.get("/", (req, res) => {
    res.send("Server running");
});
// routers
app.use("/api", api_router_1.apiRouter);
const files_router_1 = __importDefault(require("./routes/files-router"));
app.use("/files", files_router_1.default);
// error handling
app.use((req, res) => {
    res.status(404).send({ msg: "Path not found" });
});
app.use(errors_controller_1.handleMySqlErrors);
app.use(errors_controller_1.handleCustomErrors);
app.use(errors_controller_1.handleServerErrors);
exports.default = app;
