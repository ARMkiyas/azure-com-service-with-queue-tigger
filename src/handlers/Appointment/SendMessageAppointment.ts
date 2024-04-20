import { HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { z } from "zod";

import { EmailMessage } from "@azure/communication-email";
import generateAppointmentEmail from "../../../Templates/appointmentTemplates";
import sendMail from "../../services/SendMail";
import sendMessage from "../../services/SendMessage";
import { MessageTemplate, MessageTemplateBindings, MessageTemplateQuickAction, MessageTemplateValue } from "@azure-rest/communication-messages";
import { phoneValidationSc } from "../../../utils/ValidataionSc";
import { messageAppointmentValidationSc } from "../../../utils/ValidataionSc";



export type SendMessageAppointmentT = z.infer<typeof messageAppointmentValidationSc>;



export async function SendMessageAppointment(data: SendMessageAppointmentT): Promise<void> {

    try {


        if (!messageAppointmentValidationSc.safeParse(data).success) {
            throw new Error("Invalid Data")
        }


        const recipientList = [data.phoneNumber];

        const headerValue: MessageTemplateValue = {
            kind: "text",
            name: "type",
            text: data.type === "booking" ? "Appointment Booked" : data.type === "checking" ? "Appointment Checking" : data.type === "cancelled" ? "Appointment Cancelled" : data.type === "completed" ? "Appointment Completed" : "Appointment Rescheduled",
        };

        const bodyvalue1: MessageTemplateValue = {
            kind: "text",
            name: "patientName",
            text: data.patientName
        }

        const bodyvalue2: MessageTemplateValue = {
            kind: "text",
            name: "doctorName",
            text: data.doctorName
        }

        const bodyvalue3: MessageTemplateValue = {
            kind: "text",
            name: "Date",
            text: data.date
        }

        const bodyvalue4: MessageTemplateValue = {
            kind: "text",
            name: "Time",
            text: data.time
        }

        const bodyvalue5: MessageTemplateValue = {
            kind: "text",
            name: "referenceId",
            text: data.referenceId || ""
        };
        const bodyvalue6: MessageTemplateValue = {
            kind: "text",
            name: "Message_type",
            text: data.type === "booking" ? "Scheduled" : data.type === "checking" ? "Scheduled" : data.type === "cancelled" ? "Cancelled" : data.type === "completed" ? "Completed" : "Rescheduled",
        };




        const bindings: MessageTemplateBindings = {
            kind: "whatsApp",
            header: [
                {
                    refValue: headerValue.name
                }
            ],
            body: [
                {
                    refValue: bodyvalue1.name
                },
                {
                    refValue: bodyvalue2.name
                },
                {
                    refValue: bodyvalue3.name
                },
                {
                    refValue: bodyvalue4.name
                },
                {
                    refValue: bodyvalue5.name
                },
                {
                    refValue: bodyvalue6.name
                }
            ],

        }

        const template: MessageTemplate = {
            name: "appointment",
            language: "en",
            bindings: bindings,
            values: [headerValue, bodyvalue1, bodyvalue2, bodyvalue3, bodyvalue4, bodyvalue5, bodyvalue6]

        };

        const templateMessageResult = await sendMessage({
            kind: "template",
            recipientList,
            template: template
        })



    } catch (error) {
        console.log(error);

    }




}

