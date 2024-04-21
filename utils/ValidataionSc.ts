import { z } from "zod";


export const phoneValidationSc = z.string()
    .regex(
        /^\+\d{1,2}\s\(\d{3}\)\s\d{3}-\d{4}$|^\+\d{1,2}\s\(\d{3}\)\s\d{9}$/,
        "Invalid Phone Number, please provide it in international format +94 (123) 456-7890",
    )
    .min(1, "phone is Required")




export const basicOTPSc = z.object({
    username: z.string().optional(),
    otp: z.string()
});


export const EmailOTPvalidationSc = z.object({
    email: z.string().email(),

}).merge(basicOTPSc);


export const MessageOTPValidationSC = z.object({
    phoneNumber: phoneValidationSc,

}).merge(basicOTPSc);



const basicRestValidationSc = z.object({
    url: z.string().url(),
    username: z.string(),
});

export const PWDRestValidationSc = z.object({
    email: z.string().email(),


}).merge(basicRestValidationSc);



export const PWDMessageRestValidationSc = z.object({
    phoneNumber: phoneValidationSc,


}).merge(basicRestValidationSc);

const BasicAppointmentValidationSc = z.object({
    type: z.enum(["booking", "checking", "cancelled", "completed", "rescheduled"]),
    patientName: z.string(),
    doctorName: z.string(),
    date: z.string(),
    time: z.string(),
    referenceId: z.string().optional(),
});


export const emailAppointmentValidationSc = BasicAppointmentValidationSc.extend({
    email: z.string().email(),
});


export const messageAppointmentValidationSc = BasicAppointmentValidationSc.extend({
    phoneNumber: phoneValidationSc,
});