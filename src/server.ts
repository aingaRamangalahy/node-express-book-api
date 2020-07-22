import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
// import * as dotenv from 'dotenv'
// import * as path from 'path'
// import * as morgan from 'morgan'
// import * as chalk from 'chalk';

//import routes
import BookRouter from './routes/book.route';
import MainRouter from './routes/book.route';
import UserRoute from './routes/user.route';

// Server class
class Server {

    public app: express.Application;
    private mongodbUri = "mongodb://localhost:27017/BIBLIO";
    //private PORT = process.env.APP_PORT;

    constructor(private port: number){
        this.app = express()
        this.config()
    }

    public config(){

        // load env
        // dotenv.config({ path: path.resolve(process.cwd(), '.env') })

        // set up mongoose
        console.log('Connecting to DB....')
        mongoose.connect(this.mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true })
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
        this.app.use('/api/user', UserRoute);
        this.app.use('/api/book', BookRouter);
        this.app.use('/', MainRouter);
        
    }

    public start(): void {
      this.app.listen(this.port, ()=>{
        console.log("server started")
      } )
    }
}

export default Server;