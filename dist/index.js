"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const server_1 = __importDefault(require("./server"));
dotenv_1.default.config({ path: path_1.default.resolve(process.cwd(), '.env') });
const server = new server_1.default();
server.routes();
server.start();
