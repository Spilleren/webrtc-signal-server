import * as express from 'express';
import {DataBaseInterface} from '../component_interface/database.interface';
import * as ip from 'ip';
import { NotifierInterface } from '../component_interface/notifier.interface';
import { Messages } from '../messages/messages';
import { CustomRequest, PutMessage } from '../types/messages';

export class ExpressHandler {
  private app!: express.Application;
  private dataBase: DataBaseInterface;
  private notifier: NotifierInterface;

  private port: number;
  private host: string;

  constructor(host: string, port: number, dataBase: DataBaseInterface, notifier:NotifierInterface) {
    this.dataBase = dataBase;
    this.notifier = notifier;
    this.host = host;
    this.port = port;
  }
  public run() {
    this.createApp();
    this.createRoutes();

    this.app.listen(this.port, () => {
      console.log(`RESTful API lives at ${ip.address()}:${this.port}`);
    });
  }

  private createApp() {
    this.app = express();
  }

  private createRoutes() {
    this.app.get('/all', async (req, res) => {
      const robots = await this.dataBase.getAllFromDb();
      res.send(
        JSON.stringify({
          robots: robots,
        })
      );
    });
    this.app.get('/help', async (req, res) => {
      const robots = await this.dataBase.getHelpNeeded();
      res.send(
        JSON.stringify({
          robots: robots,
        })
      );
    });

    this.app.put('/help', async (req : express.Request ,res : express.Response) => {
      const name = <string>req.query.name;
      console.log(name)
      this.notifier.sendToTopic('help',Messages.HelpMessage);
      this.dataBase.updateRobot(name, true);
      res.status(202).send('Success');
    })
  }
}

