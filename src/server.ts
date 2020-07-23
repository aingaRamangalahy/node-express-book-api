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
import passport from 'passport';
import localStrategy from 'passport-local';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session'

const Strategy = localStrategy.Strategy
const sessionSecret = process.env.SESSION_SECRET || 'mark it zero'
const adminPassword = process.env.ADMIN_PASSWORD || 'adminpass'
// Server class
class Server {

    public app: express.Application;

    constructor(){
        this.app = express()
        this.config()
    }

    public config(){
        //load env
        dotenv.config({ path: path.resolve(process.cwd(), '.env') })
        
        //local passport strategy config
        passport.use(
          new Strategy(function (username, password, cb) {
            const isAdmin = (username === 'admin' || 'ainga') && (password === adminPassword)
            if (isAdmin) cb(null, { username: 'admin' })
            cb(null, false)
          })
        )
        //passport serialization/deserialization (identity function => return its arguments)
        passport.serializeUser((user, cb) => cb(null, user))
        passport.deserializeUser((user, cb) => cb(null, user))
        //parse cookies
        this.app.use(cookieParser())
        this.app.use(
          expressSession({
            secret: sessionSecret, // so we can sign cookies
            resave: false,
            saveUninitialized: false
          })
        )
        //initialize passport 
        this.app.use(passport.initialize())
        this.app.use(passport.session())
        // set up mongoose
        console.log('Connecting to DB....');
        mongoose.connect("mongodb://localhost:27017/BIBLIO", { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => console.log('Dabatase connected.'))
            .catch((e) => console.log('Error connection db.',e))
        mongoose.set('useFindAndModify', false);
        //mongoose.pluralize(null);

        // config body paser
        this.app.use(bodyParser.json({limit: '50mb'}));
        this.app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
        //config cors
        this.app.use(cors())
        // this.app.use(express.static(path.join(__dirname, 'dist')))
        //this.app.use('/public', express.static(path.join(process.cwd(), 'public')))
        // this.app.use('/assets',express.static(path.join(__dirname, 'dist/v3/assets')))
    }

    public routes(): void {
        // this.app.use('/api/crud', CrudRouter)
        this.app.use('/api/user', UserRouter);
        this.app.use('/api/book', BookRouter);
        this.app.use('/api/login', LoginRouter)
        this.app.use('/', MainRouter);
        
    }

    public start(): void {
      this.app.listen(process.env.SERVER_PORT, ()=>{
        console.log("server started"+ process.env.SERVER_PORT);
      } )
    }
}

export default Server;