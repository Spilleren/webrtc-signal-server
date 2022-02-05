// External Dependencies
import * as Websocket from 'ws';
import * as ip from 'ip';
import {RobotMessage} from '../types/messages';
import {DataBaseInterface} from '../component_interface/database.interface';
import {MyWebsocket} from '../types/websocket';
import { Messages } from '../messages/messages';

// Initialize Connection

export class WebSocketHandler {
  private wss!: Websocket.WebSocketServer;
  private connectedPeers: Map<string, Websocket>;
  private dataBase: DataBaseInterface;
  private host :string;
  private port : number;


  constructor(host: string, port: number, dataBase: DataBaseInterface) {
    this.connectedPeers = new Map();
    this.dataBase = dataBase;
    this.host = host;
    this. port = port;
  }
  public run() {
    this.createSocket();
    this.listen();
    this.onConnection();
  }

  private createSocket(): void {
    this.wss = new Websocket.WebSocketServer({
      port: this.port,
      host: this.host,
      maxPayload: 4000,
    });
  }

  private listen(): void {
    this.wss.on('listening', () => {
      console.log(`Server started at ws://${ip.address()}:${this.port}`);
    });
  }

  private onConnection(): void {
    console.log('in onConnection');
    this.wss.on('connection', (ws: MyWebsocket) => {
      ws.on('message', (message: string) => this.onMessage(message, ws));
      ws.on('close', () => this.onClose(ws));
    });
  }

  private onClose(ws: MyWebsocket) {
    console.log('In onClose!');
    console.log(ws.name);

    if (ws.name !== undefined) {
      this.connectedPeers.delete(ws.name);
      this.dataBase.removeFromDb(ws.name);
      console.info(`User ${ws.name} logged of`);
    }
  } //TODO: Fix sletning - udbyg typen websocket, så den kan holde et navn

  private onMessage(data: string, ws: MyWebsocket): void {
    const jsonObj = this.jsonParse(data);
    if (!jsonObj) {
      return;
    }
    const message: RobotMessage = <RobotMessage>jsonObj;

    switch (message.type) {
      case 'robot_login':
        {
          if (this.connectedPeers.has(message.message.name)) {
            console.log('Relogged robot!');
            this.dataBase.addToDb(message.message);
            this.sendTo(ws, Messages.NotUniqueName);
          } else {
            console.log('Robot logged: ', message.message.name);
            ws.name = message.message.name;
            this.sendTo(ws, Messages.LoginSuccess);
            this.connectedPeers.set(message.message.name, ws);
            console.log(ws.name);

            console.log('robotten %s logged on', ws.name);

            this.dataBase.addToDb(message.message);
          }
        }
        break;
      case 'user_login':
        {
            console.log('User logged: ', message.message.name);
            this.connectedPeers.set(message.message.name, ws);

            this.sendTo(ws, Messages.LoginSuccess);
            const target = this.connectedPeers.get(message.message.target);
            if (target !== undefined) {
              console.log('Sending answer to: ', message.message.target);
              this.sendTo(target, {
                type: 'answer',
                message: {type:  message.message.sdp.type, sdp: message.message.sdp.sdp},
              });
              this.dataBase.updateRobot(message.message.target, false);
            
          }
        }
        break;
      case 'offer':
        console.log('Not yet implemented!');

        break;
      case 'answer':
        {
          const target = this.connectedPeers.get(message.message.target);
          if (target !== undefined) {
            console.log('Sending answer to: ', message.message.target);
            this.sendTo(target, {
              type: 'answer',
              message: {type: message.message.sdp.type, sdp: message.message.sdp.sdp},
            });
          }
        }
        break;
      case 'candidate':
        {
          const target = this.connectedPeers.get(message.message.target);
          if (target !== undefined) {
            this.sendTo(target, message);
          }
        }

        break;
      case 'logoff':
        {
          console.log('Not yet implemented!');
        }
        break;
      default:
        this.sendTo(ws, {
          type: 'error',
          message: 'command not found: ' + message.type,
        });
        break;
    }
  }

  private sendTo(ws: Websocket, message: object) {
    //console.log(JSON.stringify(message));
    ws.send(JSON.stringify(message));
  }

  private jsonParse(data: string) {
    let parsed_data;
    try {
      parsed_data = JSON.parse(data);
    } catch (error) {
      console.log('Invalid JSON');
      return;
    }
    return parsed_data;
  }
}
