import { app } from "@azure/functions";
import { messageTrigger } from "../tiggerhanlers/messageTrigger";

app.storageQueue('message-to-send', {
    queueName: 'sms-to-send',
    connection: 'queueConnectionstring',
    handler: messageTrigger
});

