import { Router } from 'express';
import userController from '../controllers/User.controller';
import ensureAdmin from '../utils/ensureAdmin'
class UserRouter {

    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.get('/getAll', ensureAdmin, userController.GetUsers);
        this.router.get('/get/:id', ensureAdmin, userController.GetUserById);
        this.router.get('/paginate', ensureAdmin, userController.GetPaginatedUser);
        this.router.put('/put/:id', ensureAdmin, userController.UpdateUser);
        this.router.post('/post', ensureAdmin, userController.PostUser);
        this.router.delete('/delete/:id', ensureAdmin, userController.DeleteUser);
    }
}

export default  new UserRouter().router;