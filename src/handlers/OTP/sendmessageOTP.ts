
import { MessageTemplate, MessageTemplateBindings, MessageTemplateQuickAction, MessageTemplateValue } from "@azure-rest/communication-messages";

import { z } from "zod";

import sendMessage from "../../services/SendMessage";
import { MessageOTPValidationSC } from "../../../utils/ValidataionSc";



export type sendMessageOTPT = z.infer<typeof MessageOTPValidationSC>;

export async function sendmessageOTP(data: sendMessageOTPT): Promise<void> {

    try {

        const validate = MessageOTPValidationSC.safeParse(data)
        if (!validate.success) {
            throw new Error("Invalid Data");
        }



        const recipientList = [data.phoneNumber];

        const bodyValue: MessageTemplateValue = {
            kind: "text",
            name: "otp",
            text: data.otp
        };

        const copybuttonValue: MessageTemplateQuickAction = {
            kind: "quickAction",
            name: "url",
            payload: data.otp,
        }


        const bindings: MessageTemplateBindings = {
            kind: "whatsApp",
            body: [
                {
                    refValue: bodyValue.name,
                }
            ],
            buttons: [
                {
                    subType: "URL",
                    refValue: copybuttonValue.name
                }
            ]
        }

        const template: MessageTemplate = {
            name: "otp",
            language: "en",
            bindings: bindings,
            values: [bodyValue, copybuttonValue]

        };

        const templateMessageResult = await sendMessage({
            kind: "template",
            recipientList,
            template: template
        })





    } catch (error) {

        console.log("Error", error);
    }


};
