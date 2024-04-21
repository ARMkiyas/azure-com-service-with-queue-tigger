import { InvocationContext } from "@azure/functions";
import { decrypt } from "../../utils/Decrypt";
import { sendmessageOTP, sendMessageOTPT } from "../handlers/OTP/sendmessageOTP";;
import { SendMessageAppointment, SendMessageAppointmentT } from "../handlers/Appointment/SendMessageAppointment";
import { sendMessagePWDResetT, sendPWDResetMessage } from "../handlers/pwd-reset/sendPWDResetMessage";

export async function messageTrigger(queueItem: string, context: InvocationContext): Promise<void> {


    // Decrypt the data
    const data = decrypt(queueItem);

    // Check the type of the data
    if (data.type === "otp") {
        console.log("otp message trigger");
        return sendmessageOTP(data.data as sendMessageOTPT);
    }

    if (data.type === "pwd-reset") {
        return sendPWDResetMessage(data.data as sendMessagePWDResetT);

    }
    if (data.type === "appointment") {
        console.log("appointment message trigger");
        return SendMessageAppointment(data.data as SendMessageAppointmentT)
    }


}
