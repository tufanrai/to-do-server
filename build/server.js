"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const error_middlware_1 = require("./middleware/error.middlware");
const auth_router_1 = __importDefault(require("./router/auth.router"));
const task_router_1 = __importDefault(require("./router/task.router"));
const db_config_1 = require("./config/db.config");
// import url's
const PORT = process.env.PORT;
const URl = (_a = process.env.DB_URL) !== null && _a !== void 0 ? _a : "";
// database configuration
(0, db_config_1.dbConfig)(URl);
// app instance
const app = (0, express_1.default)();
// use cors
app.use((0, cors_1.default)({
    origin: "*",
}));
// use middleware
app.use(express_1.default.urlencoded());
app.use(express_1.default.json());
// use router
app.use("/api/auth", auth_router_1.default);
app.use("/api", task_router_1.default);
app.use("/*spalt", (req, res) => {
    res.status(404).json({
        message: "search not found",
    });
});
app.use(error_middlware_1.errorMiddleware);
// server start
app.listen(PORT, () => console.log(`server started at http://localhost:${PORT}`));
