"use strict";
//function to check user is authentified as admin
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
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
        const isAdmin = req.user && req.user.username === 'admin';
        if (isAdmin)
            return next();
        res.status(401).json({ error: 'Unauthorized' });
    }
}
const auth = new Auth();
exports.default = auth;
