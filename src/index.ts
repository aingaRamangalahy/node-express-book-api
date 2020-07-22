import * as http from 'http';
import * as path from 'path';
//import * as dotenv from 'dotenv';
import Server from './server';

// dotenv.config({ path: path.resolve(process.cwd(), '.env') })
const server = new Server(3000);

server.routes();
server.start();