"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/rps";
console.log("connecting to", dbUrl);
mongoose_1.default.connect(dbUrl).then(() => {
    console.log("Connected to MongoDB");
});
exports.default = mongoose_1.default;
