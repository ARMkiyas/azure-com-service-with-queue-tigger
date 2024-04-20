import { app } from "@azure/functions";
import { emailTrigger } from "../tiggerhanlers/EmailTrigger";

app.storageQueue('email-to-send', {
    queueName: 'email-to-send',
    connection: 'queueConnectionstring',
    handler: emailTrigger
});

