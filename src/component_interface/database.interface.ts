import {InternalMessage} from '../types/messages';
import {Robot} from '../types/robot_db';

export interface DataBaseInterface {
  addToDb(message: InternalMessage): Promise<void>;
  removeFromDb(name: string): Promise<void>;
  getAllFromDb(): Promise<Robot[]>;
  getHelpNeeded(): Promise<Robot[]>;
  updateRobot(name: string, help : boolean): Promise<void>;
}
