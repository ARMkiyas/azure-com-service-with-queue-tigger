import { app, InvocationContext } from "@azure/functions";


type item = {
    type: "otp" | "pwd-reset" | "sendAppointment"

}


export async function storageQueueTrigger1(queueItem: unknown, context: InvocationContext): Promise<void> {
    context.log('Storage queue function processed work item:', queueItem);
}

app.storageQueue('email-to-send', {
    queueName: 'email-to-send',
    connection: 'queueConnectionstring',
    handler: storageQueueTrigger1
});

app.storageQueue('message-to-send', {
    queueName: 'sms-to-send',
    connection: 'queueConnectionstring',
    handler: storageQueueTrigger1
});
