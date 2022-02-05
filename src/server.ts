import {WebSocketHandler} from './components/websocket';
import {DataBaseHandler} from './components/database';
import {ExpressHandler} from './components/express';
import { Notifier } from './components/notifier';


const expressPort = 8000;
const wsPort = 8080;
const host = '0.0.0.0';

const db = new DataBaseHandler();
const notifier = new Notifier();

const app = new WebSocketHandler(host, wsPort, db);
const expressApp = new ExpressHandler(host, expressPort, db, notifier);

app.run();
expressApp.run();
