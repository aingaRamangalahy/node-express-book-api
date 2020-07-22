"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MainController {
    constructor() {
        this.Main = (req, res) => {
            res.send('api not found');
        };
    }
}
const mainController = new MainController();
exports.default = mainController;
