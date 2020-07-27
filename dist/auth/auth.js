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
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../model/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const Strategy = passport_local_1.default.Strategy;
const jwtSecret = process.env.SESSION_SECRET || 'mark it zero';
const adminPassword = process.env.ADMIN_PASSWORD || 'adminpass';
const jwtOpts = { algorithm: 'HS256', expiresIn: '30d' };
class Auth {
    constructor() {
        this.authenticate = passport_1.default.authenticate('local', { session: false });
        this.setAuthStrategies = () => {
            passport_1.default.use(this.adminStrategy());
        };
        this.adminStrategy = () => {
            return new Strategy(function (username, password, cb) {
                return __awaiter(this, void 0, void 0, function* () {
                    const isAdmin = username === 'admin' || 'ainga' && password === adminPassword;
                    if (isAdmin)
                        return cb(null, { username: 'admin' });
                    try {
                        const user = yield user_model_1.default.findOne({ username });
                        if (!user)
                            return cb(null, false);
                        const isUser = yield bcrypt_1.default.compare(password, user.password);
                        if (isUser)
                            return cb(null, { username: user.username });
                    }
                    catch (err) { }
                    cb(null, false);
                });
            });
        };
        this.ensureAdmin = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const jwtString = req.headers.authorization || req.cookies.jwt;
            const payload = yield this.verify(jwtString); // toDo : create interface for payload
            if (payload.username === 'admin')
                return next();
            const err = new Error('Unauthorized'); // toDo: create interface with statusCode that implements Error
            err.statusCode = 401;
            next(err);
        });
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const token = yield this.sign({ username: req.user.username });
            res.cookie('jwt', token, { httpOnly: true });
            res.json({ success: true, token: token });
        });
        this.sign = (payload) => __awaiter(this, void 0, void 0, function* () {
            const token = yield jsonwebtoken_1.default.sign(payload, jwtSecret, jwtOpts);
            console.log(token);
            return token;
        });
        this.verify = (jwtString = '') => __awaiter(this, void 0, void 0, function* () {
            jwtString = jwtString.replace(/^Bearer /i, '');
            try {
                const payload = yield jsonwebtoken_1.default.verify(jwtString, jwtSecret);
                return payload;
            }
            catch (err) {
                err.statusCode = 401;
                throw err;
            }
        });
    }
}
const auth = new Auth();
exports.default = auth;
