
import { MessageTemplate, MessageTemplateBindings, MessageTemplateQuickAction, MessageTemplateValue } from "@azure-rest/communication-messages";

import { z } from "zod";

import sendMessage from "../../services/SendMessage";
import { PWDMessageRestValidationSc } from "../../../utils/ValidataionSc";



export type sendMessagePWDResetT = z.infer<typeof PWDMessageRestValidationSc>;

export async function sendPWDResetMessage(data: sendMessagePWDResetT): Promise<void> {

    try {

        const validate = PWDMessageRestValidationSc.safeParse(data)
        if (!validate.success) {
            throw new Error("Invalid Data");
        }


        const uri = data.url.split("/");

        const recipientList = [data.phoneNumber];

        const bodyValue: MessageTemplateValue = {
            kind: "text",
            name: "username",
            text: data.username
        };

        const copybuttonValue: MessageTemplateQuickAction = {
            kind: "quickAction",
            name: "url",
            payload: `auth/reset/${uri[uri.length - 1]}`
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
            name: "restpassword",
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
