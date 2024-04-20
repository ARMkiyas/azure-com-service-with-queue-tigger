import { HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import MessageClient, { MessageTemplate, MessageTemplateBindings, MessageTemplateQuickAction, MessageTemplateValue } from "@azure-rest/communication-messages";
import { EmailClient, EmailMessage, KnownEmailSendStatus } from "@azure/communication-email";
import { z } from "zod";
import otpEmailTemplates from "../../../Templates/otpEmailTemplates";
import sendMail from "../../services/SendMail";

import sendMessage from "../../services/SendMessage";
import { EmailOTPvalidationSc } from "../../../utils/ValidataionSc";



export type sendEmailOTPT = z.infer<typeof EmailOTPvalidationSc>;

export async function sendEmailOTP(data: sendEmailOTPT): Promise<void> {

    try {


        if (!EmailOTPvalidationSc.safeParse(data).success) {

            throw new Error("Invalid Data");
        }

        const message: EmailMessage = {
            senderAddress: "DoNotReply@kiyas-cloud.live",
            content: {
                subject: "2FA OTP For CloudCare",

                html: otpEmailTemplates(data.otp, data.username),
            },
            recipients: {
                to: [
                    {
                        address: data.email,
                        displayName: data.username,
                    },
                ],
            },
        };


        await sendMail(message);



    } catch (error) {

        console.log("Error", error);
    }


};
