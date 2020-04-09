import mongoose  from 'mongoose';
import express from 'express';
import Book from './model/book.model';
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const uri = "mongodb://localhost:27017/BIBLIO";

mongoose.connect(uri,(err)=>{
    if (err) console.log(err);
    else console.log("mongo connection sucess");
});

app.get("/",(req, res)=>{
    res.send("hello Ainga...")
});

app.get("/books",(req, res)=>{
    Book.find((err, books)=>{
        if (err) res.status(500).send(err);
        else res.send(books)
    })
})

/*with pagination /pbooks?page=1&size=5*/
app.get("/pbooks",(req, res)=>{
    let p:number = parseInt(req.query.page || 1);
    let s:number = parseInt(req.query.size || 5);
    Book.paginate(
        {},
        {page:p,limit:s},
        (err, books)=>{
        if (err) res.status(500).send(err);
        else res.send(books)
    })
})

/*with pagination /search?kw=abc&page=1&size=5*/
app.get("/search",(req, res)=>{
    let p:number = parseInt(req.query.page || 1);
    let s:number = parseInt(req.query.size || 5);
    let kw:string = req.query.kw || "";
    Book.paginate(
        {title:{
            $regex: ".*(?i)"+kw+".*"
        }},
        {page:p,limit:s},
        (err, books)=>{
        if (err) res.status(500).send(err);
        else res.send(books)
    })
})

app.get("/book/:id",(req, res)=>{
    Book.findById(req.params.id,(err, book)=>{
        if (err) res.status(500).send(err);
        else res.send(book)
    })
})

app.put("/book/:id",(req, res)=>{
    Book.findByIdAndUpdate(req.params.id, req.body, (err, book)=>{
        if (err) res.status(500).send(err);
        else res.send("update done")
    })
})

app.delete("/book/:id",(req, res)=>{
    Book.findByIdAndDelete(req.params.id, (err, book)=>{
        if (err) res.status(500).send(err);
        else res.send("Delete done")
    })
})

app.post("/book",(req, res)=>{
    let book = new Book(req.body);
    book.save((err, books)=>{
        if (err) res.status(500).send(err);
        else res.send(books)
    })
})
app.listen(8085,()=>{
    console.log("server started")
})