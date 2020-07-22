"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
let Schema = mongoose_1.default.Schema;
let UserSchema = new Schema({
    pseudo: String,
    password: String,
    name: String,
    accountType: String,
    connected: {
        type: Boolean,
        default: false
    },
    phone_number: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, required: false }
}, { _id: true });
const User = mongoose_1.default.model('User', UserSchema);
exports.default = User;
