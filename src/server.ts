import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv'
import path from 'path'
// import * as morgan from 'morgan'
// import * as chalk from 'chalk';

//import routes
import BookRouter from './routes/book.route';
import MainRouter from './routes/main.route';
import UserRouter from './routes/user.route';
import LoginRouter from './routes/login.route'
//import authentification
import auth from './auth/auth'
import cookieParser from 'cookie-parser';


// Server class
class Server {

    public app: express.Application;

    constructor() {
        this.app = express()
        this.config()
        this.mongo()
        this.routes()
    }

    public config() {
        dotenv.config({ path: path.resolve(process.cwd(), '.env') })
        auth.setAuthStrategies();
        this.app.use(cookieParser())     
        this.app.use(bodyParser.json({limit: '50mb'}));
        this.app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
        this.app.use(cors())
        // this.app.use(express.static(path.join(__dirname, 'dist')))
        //this.app.use('/public', express.static(path.join(process.cwd(), 'public')))
        // this.app.use('/assets',express.static(path.join(__dirname, 'dist/v3/assets')))
    }

    public mongo(): void {
      console.log('Connecting to DB....');
      mongoose.connect("mongodb://localhost:27017/BIBLIO", { useNewUrlParser: true, useUnifiedTopology: true })
          .then(() => console.log('Dabatase connected.'))
          .catch((e) => console.log('Error connection db.',e))
      mongoose.set('useFindAndModify', false);
    }

    public routes(): void {
        this.app.use('/api/user', UserRouter);
        this.app.use('/api/book', BookRouter);
        this.app.use('/api/login', LoginRouter);
        this.app.use('/', MainRouter);
    }

    public start(): void {
      this.app.listen(process.env.SERVER_PORT, ()=>{
        console.log("server started"+ process.env.SERVER_PORT);
      } )
    }
}

export default Server;