import { EmailClient, EmailMessage, KnownEmailSendStatus } from "@azure/communication-email";


const sendMail = async (message: EmailMessage) => {

    try {
        const POLLER_WAIT_TIME = 10
        const emailClient = new EmailClient(process.env["connectionString"]);
        const poller = await emailClient.beginSend(message);

        if (!poller.getOperationState().isStarted) {
            throw "Poller was not started."
        }

        let timeElapsed = 0;
        while (!poller.isDone()) {
            poller.poll();
            console.log("Email send polling in progress");

            await new Promise(resolve => setTimeout(resolve, POLLER_WAIT_TIME * 1000));
            timeElapsed += 10;

            if (timeElapsed > 18 * POLLER_WAIT_TIME) {
                throw "Polling timed out.";
            }
        }

        if (poller.getResult().status === KnownEmailSendStatus.Succeeded) {
            console.log(`Successfully sent the email (operation id: ${poller.getResult().id})`);
        }
        else {
            throw poller.getResult().error;
        }


        console.log("Email sent successfully");

    } catch (error) {
        throw new Error(`Error sending email: ${error}`);
    }

}


export default sendMail;