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
        console.log("router action post");
        this.router.get('/getAll', User_controller_1.default.GetUsers);
        this.router.get('/get/:id', User_controller_1.default.GetUserById);
        this.router.get('/paginate', User_controller_1.default.GetPaginatedUser);
        this.router.put('/put/:id', User_controller_1.default.UpdateUser);
        this.router.post('/post', User_controller_1.default.PostUser);
        this.router.delete('/delete', User_controller_1.default.DeleteUser);
    }
}
exports.default = new UserRouter().router;
