import { HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { z } from "zod";
import { phoneValidationSc } from "../../utils/validSc";
import { EmailMessage } from "@azure/communication-email";
import generateAppointmentEmail from "../../Templates/appointmentTemplates";
import sendMail from "../../services/SendMail";
import sendMessage from "../../services/SendMessage";
import { MessageTemplate, MessageTemplateBindings, MessageTemplateQuickAction, MessageTemplateValue } from "@azure-rest/communication-messages";



const validationSc = z.object({
    email: z.string().email(),
    phoneNumber: phoneValidationSc.optional(),
    type: z.enum(["booking", "checking", "cancelled", "completed", "rescheduled"]),
    patientName: z.string(),
    doctorName: z.string(),
    date: z.string(),
    time: z.string(),
    referenceId: z.string().optional(),
});


type AppointmentRequest = z.infer<typeof validationSc>;



export async function appointmetHanlder(data: AppointmentRequest): Promise<HttpResponseInit> {

    try {

        if (!validationSc.safeParse(data).success) {
            return { jsonBody: { message: "Invalid Data" }, status: 400 };
        }

        const message: EmailMessage = {
            senderAddress: "DoNotReply@kiyas-cloud.live",
            content: {
                subject: data.type === "booking" ? "Appointment Booked" : data.type === "checking" ? "Appointment Checking" : data.type === "cancelled" ? "Appointment Cancelled" : data.type === "completed" ? "Appointment Completed" : "Appointment Rescheduled",
                html: generateAppointmentEmail({
                    type: data.type,
                    patientName: data.patientName,
                    doctorName: data.doctorName,
                    date: data.date,
                    time: data.time,
                    referenceId: data.referenceId || "",
                }),
            },
            recipients: {
                to: [
                    {
                        address: data.email,
                        displayName: data.patientName,
                    },
                ],
            },
        };


        await sendMail(message);



    } catch (error) {
        console.log(error);
    }




}

