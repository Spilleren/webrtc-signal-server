import * as admin from 'firebase-admin';
import { MessagingPayload, MessagingTopicResponse } from 'firebase-admin/lib/messaging/messaging-api';
import { NotifierInterface } from '../component_interface/notifier.interface';
import {ShepardServiceAccount} from '../firebase/service-account';

export class Notifier implements NotifierInterface{
    private serviceAccount : admin.ServiceAccount;
    private fcm : admin.messaging.Messaging;
    private app : admin.app.App;


    public constructor(){
        this.serviceAccount = ShepardServiceAccount as admin.ServiceAccount;
        this.app = admin.initializeApp({
            credential: admin.credential.cert(this.serviceAccount)
        });
        this.fcm = admin.messaging();

    }

    public sendToTopic(topic :string, message : MessagingPayload) :  void{
        this.fcm.sendToTopic(topic, message).then((res) => {
            console.log('Succesfully sent message: ', res);
        }).catch((error) => {
            console.log('Error sending message: ', error);
        })
    }
}

