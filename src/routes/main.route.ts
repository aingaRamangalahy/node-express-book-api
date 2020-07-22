import { Router } from 'express';
import MainController from '../controllers/main.controller';

class MainRouter {

    router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    routes(){
        this.router.get('*', MainController.Main)
    }
}

export default  new MainRouter().router;