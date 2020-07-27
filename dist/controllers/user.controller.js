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
const user_model_1 = __importDefault(require("../model/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const SALT_ROUNDS = 10;
const hashPassword = (user) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user.password)
        throw user.invalidate('password', 'password is required');
    if (user.password.length < 12)
        throw user.invalidate('password', 'password must be\
  at least 12 characters');
    user.password = yield bcrypt_1.default.hash(user.password, SALT_ROUNDS);
});
class UserController {
    constructor() {
        this.GetUsers = (req, res) => {
            user_model_1.default.find((err, users) => {
                if (err)
                    res.status(500).send(err);
                else
                    res.send(users);
            });
        };
        /*with pagination /pUsers?page=1&size=5*/
        this.GetPaginatedUser = (req, res) => {
            let p = parseInt(req.query.page || 1);
            let s = parseInt(req.query.size || 5);
            user_model_1.default.paginate({}, { page: p, limit: s }, (err, users) => {
                if (err)
                    res.status(500).send(err);
                else
                    res.send(users);
            });
        };
        this.PostUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log("controler action post");
            let user = yield new user_model_1.default(req.body);
            console.log('user created');
            yield hashPassword(user);
            user.save((err, user) => {
                if (err)
                    res.status(500).send(err);
                else
                    res.json({ message: 'user created', username: user.username });
            });
        });
        this.UpdateUser = (req, res, change) => __awaiter(this, void 0, void 0, function* () {
            // User.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
            //   if (err) res.status(500).send(err);
            //   else res.send("update done")
            // })
            let user = user_model_1.default.findOne(req.body.username);
            res.json({ data: user });
            // Object.keys(change).forEach(key => { user[key] = change[key] })
            // if (change.password) await hashPassword(user)
            // user.save((err, user) => {
            //   if (err) res.status(500).send(err)
            //   else res.send(user)
            // })
        });
        this.GetUserById = (req, res) => {
            user_model_1.default.findById(req.params.id, (err, user) => {
                if (err)
                    res.status(500).send(err);
                else
                    res.send(user);
            });
        };
        this.DeleteUser = (req, res) => {
            user_model_1.default.findByIdAndDelete(req.params.id, (err, user) => {
                if (err)
                    res.status(500).send(err);
                else
                    res.send("Delete done");
            });
        };
        /*with pagination /search?kw=abc&page=1&size=5*/
        this.SearchUser = (req, res) => {
            let p = parseInt(req.query.page || 1);
            let s = parseInt(req.query.size || 5);
            let kw = req.query.kw || "";
            user_model_1.default.paginate({
                title: {
                    $regex: ".*(?i)" + kw + ".*"
                }
            }, { page: p, limit: s }, (err, users) => {
                if (err)
                    res.status(500).send(err);
                else
                    res.send(users);
            });
        };
    }
}
const userController = new UserController();
exports.default = userController;
