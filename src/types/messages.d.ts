import { Request } from 'express';
import {SdpObject} from './robot_db_interface';

// robot_login
export interface InternalMessage {
  name: string;
  location: string;
  help: boolean;
  sdp: SdpObject;
}
// user_login
export interface InternalMessage {
  name: string;
  target: string;
  sdp: SdpObject;
}
// offer
export interface InternalMessage {
  sdp: SdpObject;
}
// answer
export interface InternalMessage {
  target: string;
  sdp: SdpObject;
}
// candidate
export interface InternalMessage {
  target: string;
  candidate: string;
  sdpMid: string;
  sdpMLineIndex: unknown; // TODO: korrekt type
}

export interface RobotMessage {
  type: string;
  message: InternalMessage;
}

export interface PutMessage {
  readonly name: string,
}

export interface CustomRequest<T> extends Request {
  body: T
}
