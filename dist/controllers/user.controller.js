"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../model/user.model"));
const SALT_ROUND = 10;
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
        this.PostUser = (req, res) => {
            console.log("controler action post");
            let user = new user_model_1.default(req.body);
            user.save((err, users) => {
                if (err)
                    res.status(500).send(err);
                else
                    res.send(users);
            });
        };
        this.UpdateUser = (req, res) => {
            user_model_1.default.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
                if (err)
                    res.status(500).send(err);
                else
                    res.send("update done");
            });
        };
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
