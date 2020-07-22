import { Router } from 'express';
import userController from '../controllers/User.controller';

class UserRouter {

    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.get('/getAll', userController.GetUsers);
        this.router.get('/get/:id', userController.GetUserById);
        this.router.get('/put/:id', userController.UpdateUser);
        this.router.get('/post', userController.PostUser);
        this.router.get('/delete', userController.DeleteUser);
        this.router.get('/paginate', userController.GetPaginatedUser);
    }
}

export default  new UserRouter().router;