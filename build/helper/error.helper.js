"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHelper = void 0;
class errorHelper extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = statusCode >= 400 && statusCode < 500 ? "fail" : "error";
        this.success = false;
        Error.captureStackTrace(this, errorHelper);
    }
}
exports.errorHelper = errorHelper;
