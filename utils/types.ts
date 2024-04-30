import { sendEmailOTPT } from "../src/handlers/OTP/sendEmailOTP"
import { sendMessageOTPT } from "../src/handlers/OTP/sendmessageOTP"

type OTPdataT = sendEmailOTPT | sendMessageOTPT

type reqT = "otp" | "pwd-reset" | "appointment"

export type item<T> = {
    type: reqT
    data: T

}


