import { Router } from 'express';
import userController from '../controllers/User.controller';
import auth from '../auth/auth'
class UserRouter {

    router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.get('/getAll', auth.ensureAdmin, userController.GetUsers);
        this.router.get('/get/:id', auth.ensureAdmin, userController.GetUserById);
        this.router.get('/paginate', auth.ensureAdmin, userController.GetPaginatedUser);
        this.router.put('/put/:id', auth.ensureAdmin, userController.UpdateUser);
        this.router.post('/post', auth.ensureAdmin, userController.PostUser);
        this.router.delete('/delete/:id', auth.ensureAdmin, userController.DeleteUser);
    }
}

export default  new UserRouter().router;