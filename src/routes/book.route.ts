import { Router } from 'express';
import BookController from '../controllers/book.controller';

class BookRouter {

    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.get('/getAll', BookController.GetBooks);
        this.router.get('/get/:id', BookController.GetBookById);
        this.router.get('/put/:id', BookController.UpdateBook);
        this.router.get('/post', BookController.PostBook);
        this.router.get('/delete', BookController.DeleteBook);
        this.router.get('/paginate', BookController.GetPaginatedBook);
    }
}

export default  new BookRouter().router;