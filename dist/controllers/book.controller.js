"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const book_model_1 = __importDefault(require("../model/book.model"));
class BookController {
    constructor() {
        this.GetBooks = (req, res) => {
            book_model_1.default.find((err, books) => {
                if (err)
                    res.status(500).send(err);
                else
                    res.send(books);
            });
        };
        /*with pagination /pbooks?page=1&size=5*/
        this.GetPaginatedBook = (req, res) => {
            let p = parseInt(req.query.page || 1);
            let s = parseInt(req.query.size || 5);
            book_model_1.default.paginate({}, { page: p, limit: s }, (err, books) => {
                if (err)
                    res.status(500).send(err);
                else
                    res.send(books);
            });
        };
        this.PostBook = (req, res) => {
            let book = new book_model_1.default(req.body);
            book.save((err, books) => {
                if (err)
                    res.status(500).send(err);
                else
                    res.send(books);
            });
        };
        this.UpdateBook = (req, res) => {
            book_model_1.default.findByIdAndUpdate(req.params.id, req.body, (err, book) => {
                if (err)
                    res.status(500).send(err);
                else
                    res.send("update done");
            });
        };
        this.GetBookById = (req, res) => {
            book_model_1.default.findById(req.params.id, (err, book) => {
                if (err)
                    res.status(500).send(err);
                else
                    res.send(book);
            });
        };
        this.DeleteBook = (req, res) => {
            book_model_1.default.findByIdAndDelete(req.params.id, (err, book) => {
                if (err)
                    res.status(500).send(err);
                else
                    res.send("Delete done");
            });
        };
        /*with pagination /search?kw=abc&page=1&size=5*/
        this.SearchBook = (req, res) => {
            let p = parseInt(req.query.page || 1);
            let s = parseInt(req.query.size || 5);
            let kw = req.query.kw || "";
            book_model_1.default.paginate({
                title: {
                    $regex: ".*(?i)" + kw + ".*"
                }
            }, { page: p, limit: s }, (err, books) => {
                if (err)
                    res.status(500).send(err);
                else
                    res.send(books);
            });
        };
    }
}
const bookController = new BookController();
exports.default = bookController;
