import * as mongoDB from 'mongodb';
import * as dotenv from 'dotenv';
import {Robot} from '../types/robot_db';
import {InternalMessage} from '../types/messages';
import {DataBaseInterface} from '../component_interface/database.interface';
import { query } from 'express';

export class DataBaseHandler implements DataBaseInterface {
  private client!: mongoDB.MongoClient;
  private db!: mongoDB.Db;
  private robotsCollection!: mongoDB.Collection;

  public constructor() {
    dotenv.config();
    this.connect();
  }


  private async connect() {
    this.client = new mongoDB.MongoClient(<string>process.env.DB_CONN_STRING);
    await this.client.connect();
    console.log('Connected to database');
    this.db = this.client.db(process.env.DB_NAME);
    this.robotsCollection = this.db.collection(
      <string>process.env.ROBOT_COLLECTION_NAME
    );
  }

  public async addToDb(message: InternalMessage) {
    const query = {name: message.name};
    const update = {$set: message};
    const options = {upsert: true};
    this.robotsCollection.updateOne(query, update, options);
  }

  public async removeFromDb(name: string) {
    const query = {name: name};
    this.robotsCollection.deleteOne(query);
  }
 
  public async getAllFromDb(): Promise<Robot[]> {
    const robots = (await this.robotsCollection
      .find({})
      .toArray()) as Robot[];
    return robots;
  }

  public async getHelpNeeded(): Promise<Robot[]> {
    const query = {help : true};

    const robots = (await this.robotsCollection
      .find({query})
      .toArray()) as Robot[];
    return robots;

  }
  public async updateRobot(name: string, help : boolean) {
    const query = {name:name};
    const update = {$set: {help: help}};

    this.robotsCollection.updateOne(query, update);
  }
}
