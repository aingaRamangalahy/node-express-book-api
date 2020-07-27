"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// import * as morgan from 'morgan'
// import * as chalk from 'chalk';
//import routes
const book_route_1 = __importDefault(require("./routes/book.route"));
const main_route_1 = __importDefault(require("./routes/main.route"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const login_route_1 = __importDefault(require("./routes/login.route"));
//import authentification
const auth_1 = __importDefault(require("./auth/auth"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// Server class
class Server {
    constructor() {
        dotenv_1.default.config({ path: path_1.default.resolve(process.cwd(), '.env') });
        this.app = express_1.default();
        this.config();
        this.mongo(process.env.MONGODB_URI);
        this.routes();
    }
    config() {
        auth_1.default.setAuthStrategies();
        this.app.use(cookie_parser_1.default());
        this.app.use(body_parser_1.default.json({ limit: '50mb' }));
        this.app.use(body_parser_1.default.urlencoded({ limit: '50mb', extended: true }));
        this.app.use(cors_1.default());
        // this.app.use(express.static(path.join(__dirname, 'dist')))
        //this.app.use('/public', express.static(path.join(process.cwd(), 'public')))
        // this.app.use('/assets',express.static(path.join(__dirname, 'dist/v3/assets')))
    }
    mongo(uri) {
        // console.log('Connecting to DB....');
        // mongoose.connect("mongodb://localhost:27017/BIBLIO", { useNewUrlParser: true, useUnifiedTopology: true })
        //     .then(() => console.log('Dabatase connected.'))
        //     .catch((e) => console.log('Error connection db.',e))
        // mongoose.set('useFindAndModify', false);
        const connection = mongoose_1.default.connection;
        connection.on("connected", () => {
            console.log("Mongo Connection Established");
        });
        connection.on("reconnected", () => {
            console.log("Mongo Connection Reestablished");
        });
        connection.on("disconnected", () => {
            console.log("Mongo Connection Disconnected");
            // console.log("Trying to reconnect to Mongo ...");
            // setTimeout(() => {
            //   mongoose.connect("mongodb://localhost:27017/BIBLIO", {
            //     autoReconnect: true, 
            //     keepAlive: true,
            //     socketTimeoutMS: 3000, 
            //     connectTimeoutMS: 3000,
            //     useNewUrlParser: true, 
            //     useUnifiedTopology: true
            //   });
            // }, 3000);
        });
        connection.on("close", () => {
            console.log("Mongo Connection Closed");
        });
        connection.on("error", (error) => {
            console.log("Mongo Connection ERROR: " + error);
        });
        const run = () => __awaiter(this, void 0, void 0, function* () {
            console.log(`mongo uri ${uri}`);
            yield mongoose_1.default.connect(uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
        });
        run().catch(error => console.error(error));
    }
    routes() {
        this.app.use('/api/user', user_route_1.default);
        this.app.use('/api/book', book_route_1.default);
        this.app.use('/api/login', login_route_1.default);
        this.app.use('/', main_route_1.default);
    }
    start() {
        this.app.listen(process.env.SERVER_PORT, () => {
            console.log("server started" + process.env.SERVER_PORT);
        });
    }
}
exports.default = Server;
