
import { EmailMessage } from "@azure/communication-email";
import { z } from "zod";
import otpEmailTemplates from "../../../Templates/otpEmailTemplates";
import sendMail from "../../services/SendMail";

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
