"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importStar(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_router_1 = __importDefault(require("./router/user.router"));
const todo_router_1 = __importDefault(require("./router/todo.router"));
const error_middleware_1 = require("./middleware/error.middleware");
const dbConfig_1 = require("./config/dbConfig");
// import of sensative data
const PORT = process.env.PORT;
const url = (_a = process.env.DB_URL) !== null && _a !== void 0 ? _a : "";
// app instance
const app = (0, express_1.default)();
// db config
(0, dbConfig_1.DbConfig)(url);
// use of middleware
app.use((0, cors_1.default)({
    origin: "*",
}));
app.use((0, express_1.urlencoded)());
app.use((0, express_1.json)());
// router
app.use("/api/user", user_router_1.default);
app.use("/api/todo", todo_router_1.default);
app.use("/*spalt", (req, res) => {
    res.status(404).json({
        message: "search not found",
        status: 404,
    });
});
app.use(error_middleware_1.errorMidware);
app.listen(PORT, () => console.log(`server started at http://localhost:${PORT}`));
