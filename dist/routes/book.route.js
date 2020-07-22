"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const book_controller_1 = __importDefault(require("../controllers/book.controller"));
class BookRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        this.router.get('/getAll', book_controller_1.default.GetBooks);
        this.router.get('/get/:id', book_controller_1.default.GetBookById);
        this.router.get('/put/:id', book_controller_1.default.UpdateBook);
        this.router.get('/post', book_controller_1.default.PostBook);
        this.router.get('/delete', book_controller_1.default.DeleteBook);
        this.router.get('/paginate', book_controller_1.default.GetPaginatedBook);
    }
}
exports.default = new BookRouter().router;
