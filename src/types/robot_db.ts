import {RobotData, SdpObject} from './robot_db_interface';
import {ObjectId} from 'mongodb';

export class Robot implements RobotData {
  constructor(public readonly robotName: string, public readonly robotLocation: string, public readonly robotSdp: SdpObject, public readonly robotId: ObjectId) {  }
}