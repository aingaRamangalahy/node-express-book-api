"use strict";
//function to check user is authentified as admin
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
const Strategy = passport_local_1.default.Strategy;
const jwtSecret = process.env.SESSION_SECRET || 'mark it zero';
const adminPassword = process.env.ADMIN_PASSWORD || 'adminpass';
const jwtOpts = { algorithm: 'HS256', expiresIn: '30d' };
const authenticate = passport_1.default.authenticate('local', { session: false });
class Auth {
    constructor() {
    }
    setAuthStrategies() {
        passport_1.default.use(this.adminStrategy());
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
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield this.sign({ username: req.user.username });
            res.cookie('jwt', token, { httpOnly: true });
            res.json({ success: true, token: token });
        });
    }
    sign(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield jsonwebtoken_1.default.sign(payload, jwtSecret, { algorithm: 'HS256', expiresIn: '30d' });
            return token;
        });
    }
}
const auth = new Auth();
exports.default = auth;
