"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_controller_1 = __importDefault(require("../controllers/User.controller"));
class UserRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        this.router.get('/getAll', User_controller_1.default.GetUsers);
        this.router.get('/get/:id', User_controller_1.default.GetUserById);
        this.router.get('/put/:id', User_controller_1.default.UpdateUser);
        this.router.get('/post', User_controller_1.default.PostUser);
        this.router.get('/delete', User_controller_1.default.DeleteUser);
        this.router.get('/paginate', User_controller_1.default.GetPaginatedUser);
    }
}
exports.default = new UserRouter().router;
