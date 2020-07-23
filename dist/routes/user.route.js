"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_controller_1 = __importDefault(require("../controllers/User.controller"));
const ensureAdmin_1 = __importDefault(require("../utils/ensureAdmin"));
class UserRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        this.router.get('/getAll', ensureAdmin_1.default, User_controller_1.default.GetUsers);
        this.router.get('/get/:id', ensureAdmin_1.default, User_controller_1.default.GetUserById);
        this.router.get('/paginate', ensureAdmin_1.default, User_controller_1.default.GetPaginatedUser);
        this.router.put('/put/:id', ensureAdmin_1.default, User_controller_1.default.UpdateUser);
        this.router.post('/post', ensureAdmin_1.default, User_controller_1.default.PostUser);
        this.router.delete('/delete/:id', ensureAdmin_1.default, User_controller_1.default.DeleteUser);
    }
}
exports.default = new UserRouter().router;
