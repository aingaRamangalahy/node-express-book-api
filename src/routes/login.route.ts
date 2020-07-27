import { Router } from 'express';
import passport from 'passport';
import auth from '../auth/auth'

class LoginRouter {

    router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.post('/', auth.authenticate, auth.login);
    }
}

export default  new LoginRouter().router;