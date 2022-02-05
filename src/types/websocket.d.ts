import * as Websocket from 'ws';

export interface MyWebsocket extends Websocket {
  name: string;
}
