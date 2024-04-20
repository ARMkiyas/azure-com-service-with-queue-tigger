import { InvocationContext } from "@azure/functions";
import { decrypt } from "../../utils/Decrypt";
import { sendEmailOTP, sendEmailOTPT } from "../handlers/OTP/sendEmailOTP";
import { SendPwdResetMail, SendPwdResetMailRequest } from "../handlers/pwd-reset/SendPwdResetMail";
import { SendEmailAppointment, SendEmailAppointmentRequestT } from "../handlers/Appointment/SendEmailAppointment";

export async function emailTrigger(queueItem: string, context: InvocationContext): Promise<void> {

    const data = decrypt(queueItem);

    if (data.type === "otp") {
        console.log("otp email trigger");
        return sendEmailOTP(data.data as sendEmailOTPT);
    }

    if (data.type === "pwd-reset") {
        console.log("pwd-reset email trigger");
        return SendPwdResetMail(data.data as SendPwdResetMailRequest)
    }
    if (data.type === "appointment") {
        console.log("appointment email trigger");
        return SendEmailAppointment(data.data as SendEmailAppointmentRequestT)
    }


}