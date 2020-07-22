"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
// import * as dotenv from 'dotenv'
// import * as path from 'path'
// import * as morgan from 'morgan'
// import * as chalk from 'chalk';
//import routes
const book_route_1 = __importDefault(require("./routes/book.route"));
const book_route_2 = __importDefault(require("./routes/book.route"));
const user_route_1 = __importDefault(require("./routes/user.route"));
// Server class
class Server {
    //private PORT = process.env.APP_PORT;
    constructor(port) {
        this.port = port;
        this.mongodbUri = "mongodb://localhost:27017/BIBLIO";
        this.app = express_1.default();
        this.config();
    }
    config() {
        // load env
        // dotenv.config({ path: path.resolve(process.cwd(), '.env') })
        // set up mongoose
        console.log('Connecting to DB....');
        mongoose_1.default.connect(this.mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => console.log('Dabatase connected.'))
            .catch((e) => console.log('Error connection db.', e));
        mongoose_1.default.set('useFindAndModify', false);
        //mongoose.pluralize(null);
        // config body paser
        this.app.use(body_parser_1.default.json({ limit: '50mb' }));
        this.app.use(body_parser_1.default.urlencoded({ limit: '50mb', extended: true }));
        //config cors
        this.app.use(cors_1.default());
        // this.app.use(express.static(path.join(__dirname, 'dist')))
        //this.app.use('/public', express.static(path.join(process.cwd(), 'public')))
        // this.app.use('/assets',express.static(path.join(__dirname, 'dist/v3/assets')))
    }
    routes() {
        // this.app.use('/api/crud', CrudRouter)
        this.app.use('/api/user', user_route_1.default);
        this.app.use('/api/book', book_route_1.default);
        this.app.use('/', book_route_2.default);
    }
    start() {
        this.app.listen(this.port, () => {
            console.log("server started");
        });
    }
}
exports.default = Server;
