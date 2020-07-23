"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LoginController {
    constructor() {
        this.Login = (req, res) => {
            res.json({ success: true, message: 'hello admin' });
        };
    }
}
const loginController = new LoginController();
exports.default = loginController;
