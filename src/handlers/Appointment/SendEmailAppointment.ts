
import { z } from "zod";
import { EmailMessage } from "@azure/communication-email";
import generateAppointmentEmail from "../../../Templates/appointmentTemplates";
import sendMail from "../../services/SendMail";
import { emailAppointmentValidationSc } from "../../../utils/ValidataionSc";



export type SendEmailAppointmentRequestT = z.infer<typeof emailAppointmentValidationSc>;


export async function SendEmailAppointment(data: SendEmailAppointmentRequestT): Promise<void> {

    try {


        if (!emailAppointmentValidationSc.safeParse(data).success) {
            throw new Error("Invalid Data");
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

