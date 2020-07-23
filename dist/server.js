"use strict";
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
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const Strategy = passport_local_1.default.Strategy;
const sessionSecret = process.env.SESSION_SECRET || 'mark it zero';
const adminPassword = process.env.ADMIN_PASSWORD || 'adminpass';
// Server class
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
    }
    config() {
        //load env
        dotenv_1.default.config({ path: path_1.default.resolve(process.cwd(), '.env') });
        //local passport strategy config
        passport_1.default.use(new Strategy(function (username, password, cb) {
            const isAdmin = (username === 'admin' || 'ainga') && (password === adminPassword);
            if (isAdmin)
                cb(null, { username: 'admin' });
            cb(null, false);
        }));
        //passport serialization/deserialization (identity function => return its arguments)
        passport_1.default.serializeUser((user, cb) => cb(null, user));
        passport_1.default.deserializeUser((user, cb) => cb(null, user));
        //parse cookies
        this.app.use(cookie_parser_1.default());
        this.app.use(express_session_1.default({
            secret: sessionSecret,
            resave: false,
            saveUninitialized: false
        }));
        //initialize passport 
        this.app.use(passport_1.default.initialize());
        this.app.use(passport_1.default.session());
        // set up mongoose
        console.log('Connecting to DB....');
        mongoose_1.default.connect("mongodb://localhost:27017/BIBLIO", { useNewUrlParser: true, useUnifiedTopology: true })
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
