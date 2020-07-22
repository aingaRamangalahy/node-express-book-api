import { Router } from 'express';
import userController from '../controllers/User.controller';

class UserRouter {

    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
      console.log("router action post")
        this.router.get('/getAll', userController.GetUsers);
        this.router.get('/get/:id', userController.GetUserById);
        this.router.get('/paginate', userController.GetPaginatedUser);
        this.router.put('/put/:id', userController.UpdateUser);
        this.router.post('/post', userController.PostUser);
        this.router.delete('/delete', userController.DeleteUser);
        
    }
}

export default  new UserRouter().router;