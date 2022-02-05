import {ObjectId} from 'mongodb';

export interface SdpObject {
  sdp: string;
  type: string;
}

export interface RobotData {
  robotName: string;
  robotLocation: string;
  robotSdp: SdpObject;
  robotId: ObjectId;
}
