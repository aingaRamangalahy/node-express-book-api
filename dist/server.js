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
const auth_1 = __importDefault(require("./utils/auth"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// Server class
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
    }
    config() {
        //load env
        dotenv_1.default.config({ path: path_1.default.resolve(process.cwd(), '.env') });
        auth_1.default.setAuthStrategies();
        //parse cookies
        this.app.use(cookie_parser_1.default());
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
