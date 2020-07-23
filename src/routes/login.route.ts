import { Router } from 'express';
import LoginController from '../controllers/Login.controller';
import passport from 'passport';

class LoginRouter {

    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.post('/', passport.authenticate('local'), LoginController.Login);
    }
}

export default  new LoginRouter().router;