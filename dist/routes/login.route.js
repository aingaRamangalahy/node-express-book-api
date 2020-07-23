"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Login_controller_1 = __importDefault(require("../controllers/Login.controller"));
const passport_1 = __importDefault(require("passport"));
class LoginRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        this.router.post('/', passport_1.default.authenticate('local'), Login_controller_1.default.Login);
    }
}
exports.default = new LoginRouter().router;
