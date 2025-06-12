"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHelper = void 0;
const asyncHelper = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch((err) => next(err));
    };
};
exports.asyncHelper = asyncHelper;
