import { EmailMessage } from "@azure/communication-email";
import { z } from "zod";
import pwdResetEmailTemplates from "../../../Templates/pwdResetEmailTemplates";
import sendMail from "../../services/SendMail";
import { PWDRestValidationSc } from "../../../utils/ValidataionSc";





export type SendPwdResetMailRequest = z.infer<typeof PWDRestValidationSc>;

export async function SendPwdResetMail(requestPayload: SendPwdResetMailRequest): Promise<void> {



    try {


        if (!PWDRestValidationSc.safeParse(requestPayload).success) {
            console.log("invalid Data");
            throw new Error("invalid Data")
        }

        const message: EmailMessage = {
            senderAddress: "DoNotReply@kiyas-cloud.live",
            content: {
                subject: "CloudCare Password Reset Request",
                html: pwdResetEmailTemplates(requestPayload.username, requestPayload.url),

            },
            recipients: {
                to: [
                    {
                        address: requestPayload.email,
                        displayName: requestPayload.username,
                    },
                ],
            },
        };

        await sendMail(message);






    } catch (error) {
        console.log(error);

    }




}