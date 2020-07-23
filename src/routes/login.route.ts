import { Router } from 'express';
import LoginController from '../controllers/Login.controller';
import passport from 'passport';
import auth from '../utils/auth'

class LoginRouter {

    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.post('/', passport.authenticate('local'), auth.login);
    }
}

export default  new LoginRouter().router;