import http from 'http';
import path from 'path';
import dotenv from 'dotenv';
import Server from './server';

dotenv.config({ path: path.resolve(process.cwd(), '.env') })
const server = new Server();

server.routes();
server.start();