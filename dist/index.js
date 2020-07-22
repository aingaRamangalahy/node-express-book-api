"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import * as dotenv from 'dotenv';
const server_1 = __importDefault(require("./server"));
// dotenv.config({ path: path.resolve(process.cwd(), '.env') })
const server = new server_1.default(3000);
server.routes();
server.start();
