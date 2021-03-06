"use strict";
<<<<<<< HEAD
//function to check user is authentified as admin
=======
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
>>>>>>> 328738a6d0e14a9497b91e2bf4e3991ded739a75
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
<<<<<<< HEAD
const express_session_1 = __importDefault(require("express-session"));
const passport_local_1 = __importDefault(require("passport-local"));
const Strategy = passport_local_1.default.Strategy;
const sessionSecret = process.env.SESSION_SECRET || 'mark it zero';
const adminPassword = process.env.ADMIN_PASSWORD || 'adminpass';
class Auth {
    constructor() {
    }
    setAuthStrategies() {
        passport_1.default.use(this.adminStrategy());
        //passport serialization/deserialization (identity function => return its arguments)
        passport_1.default.serializeUser((user, cb) => cb(null, user));
        passport_1.default.deserializeUser((user, cb) => cb(null, user));
    }
    setAuthMiddleware(app) {
        app.use(this.session());
        app.use(passport_1.default.initialize());
        app.use(passport_1.default.session());
    }
    session() {
        return express_session_1.default({
            secret: sessionSecret,
            resave: false,
            saveUninitialized: false
        });
=======
const passport_local_1 = __importDefault(require("passport-local"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Strategy = passport_local_1.default.Strategy;
const jwtSecret = process.env.SESSION_SECRET || 'mark it zero';
const adminPassword = process.env.ADMIN_PASSWORD || 'adminpass';
const jwtOpts = { algorithm: 'HS256', expiresIn: '30d' };
class Auth {
    constructor() {
        this.authenticate = passport_1.default.authenticate('local', { session: false });
    }
    setAuthStrategies() {
        passport_1.default.use(this.adminStrategy());
>>>>>>> 328738a6d0e14a9497b91e2bf4e3991ded739a75
    }
    adminStrategy() {
        return new Strategy(function (username, password, cb) {
            const isAdmin = username === 'admin' || 'ainga' && password === adminPassword;
            if (isAdmin)
                return cb(null, { username: 'admin' });
            cb(null, false);
        });
    }
    ensureAdmin(req, res, next) {
<<<<<<< HEAD
        const isAdmin = req.user && req.user.username === 'admin';
        if (isAdmin)
            return next();
        res.status(401).json({ error: 'Unauthorized' });
=======
        return __awaiter(this, void 0, void 0, function* () {
            const jwtString = req.headers.authorization || req.cookies.jwt;
            const payload = yield this.verify(jwtString); // toDo : create interface for payload
            if (payload.username === 'admin')
                return next();
            const err = new Error('Unauthorized'); // toDo: create interface with statusCode that implements Error
            err.statusCode = 401;
            next(err);
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield this.sign({ username: req.user.username });
            res.cookie('jwt', token, { httpOnly: true });
            res.json({ success: true, token: token });
        });
    }
    sign(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield jsonwebtoken_1.default.sign(payload, jwtSecret, jwtOpts);
            return token;
        });
    }
    verify(jwtString = '') {
        return __awaiter(this, void 0, void 0, function* () {
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
>>>>>>> 328738a6d0e14a9497b91e2bf4e3991ded739a75
    }
}
const auth = new Auth();
exports.default = auth;
