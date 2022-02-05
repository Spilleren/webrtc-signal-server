import { MessagingPayload, MessagingTopicResponse } from 'firebase-admin/lib/messaging/messaging-api';


export interface NotifierInterface {
    sendToTopic(topic : string, message : MessagingPayload) : void;
}