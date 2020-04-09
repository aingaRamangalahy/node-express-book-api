"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const book_model_1 = __importDefault(require("../model/book.model"));
var app = express_1.default();
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
app.listen(8085, () => {
    console.log("server started");
});
