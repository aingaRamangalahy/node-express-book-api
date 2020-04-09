"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const book_model_1 = __importDefault(require("./model/book.model"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = express_1.default();
app.use(body_parser_1.default.json());
const uri = "mongodb://localhost:27017/BIBLIO";
mongoose_1.default.connect(uri, (err) => {
    if (err)
        console.log(err);
    else
        console.log("mongo connection sucess");
});
app.get("/", (req, res) => {
    res.send("hello Ainga...");
});
app.get("/books", (req, res) => {
    book_model_1.default.find((err, books) => {
        if (err)
            res.status(500).send(err);
        else
            res.send(books);
    });
});
/*with pagination /pbooks?page=1&size=5*/
app.get("/pbooks", (req, res) => {
    let p = parseInt(req.query.page || 1);
    let s = parseInt(req.query.size || 5);
    book_model_1.default.paginate({}, { page: p, limit: s }, (err, books) => {
        if (err)
            res.status(500).send(err);
        else
            res.send(books);
    });
});
/*with pagination /search?kw=abc&page=1&size=5*/
app.get("/search", (req, res) => {
    let p = parseInt(req.query.page || 1);
    let s = parseInt(req.query.size || 5);
    let kw = req.query.kw || "";
    book_model_1.default.paginate({ title: {
            $regex: ".*(?i)" + kw + ".*"
        } }, { page: p, limit: s }, (err, books) => {
        if (err)
            res.status(500).send(err);
        else
            res.send(books);
    });
});
app.get("/book/:id", (req, res) => {
    book_model_1.default.findById(req.params.id, (err, book) => {
        if (err)
            res.status(500).send(err);
        else
            res.send(book);
    });
});
app.put("/book/:id", (req, res) => {
    book_model_1.default.findByIdAndUpdate(req.params.id, req.body, (err, book) => {
        if (err)
            res.status(500).send(err);
        else
            res.send("update done");
    });
});
app.delete("/book/:id", (req, res) => {
    book_model_1.default.findByIdAndDelete(req.params.id, (err, book) => {
        if (err)
            res.status(500).send(err);
        else
            res.send("Delete done");
    });
});
app.post("/book", (req, res) => {
    let book = new book_model_1.default(req.body);
    book.save((err, books) => {
        if (err)
            res.status(500).send(err);
        else
            res.send(books);
    });
});
app.listen(8085, () => {
    console.log("server started");
});
