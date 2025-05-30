"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandler = void 0;
const asyncHandler = (fun) => {
    return (req, res) => {
        Promise.resolve(fun(req, res)).catch((err) => console.log(err));
    };
};
exports.asyncHandler = asyncHandler;
