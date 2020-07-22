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
        this.router.get('/paginate', book_controller_1.default.GetPaginatedBook);
        this.router.put('/put/:id', book_controller_1.default.UpdateBook);
        this.router.post('/post', book_controller_1.default.PostBook);
        this.router.delete('/delete', book_controller_1.default.DeleteBook);
    }
}
exports.default = new BookRouter().router;
