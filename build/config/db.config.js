"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConfig = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dbConfig = (url) => {
    mongoose_1.default
        .connect(url)
        .then(() => console.log("server connected to DB successfully 💾"))
        .catch((err) => console.log(err));
};
exports.dbConfig = dbConfig;
