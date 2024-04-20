import { app, InvocationContext } from "@azure/functions";

import { sendEmailOTP } from "../handlers/OTP/sendEmailOTP";
import { emailTrigger } from "../tiggerhanlers/EmailTrigger";
import { messageTrigger } from "../tiggerhanlers/messageTrigger";




app.storageQueue('email-to-send', {
    queueName: 'email-to-send',
    connection: 'queueConnectionstring',
    handler: emailTrigger
});

app.storageQueue('message-to-send', {
    queueName: 'sms-to-send',
    connection: 'queueConnectionstring',
    handler: messageTrigger
});

