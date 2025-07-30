import { createTransport } from "nodemailer";

type subjectType = "signIn" | "signUp" | "deleteAccount" | "resendOTP"; 

export async function sendEmail (email_to : string , message : string , subject : subjectType) {
    const app_password = process.env.APP_PASSWORD;
    if(!app_password) {
        console.log("\n\n\n Enter APP_PASSWORD in .env \n Enter APP_PASSWORD in .env \n\n\n")
        throw new Error('Backend error')
    }

    const from_email = process.env.FROM_EMAIL;
    if(!from_email) {
        console.log("\n\n\n Enter FROM_EMAIL in .env \n Enter FROM_EMAIL in .env \n\n\n")
        throw new Error('Backend error')
    }

    const transporter = createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: from_email,
            pass: app_password
        }
    });

    const subject_title = 
            subject === "signIn" ? "Sign In" : 
            subject === "signUp" ? "Sign Up" :
            subject === "deleteAccount" ? "Delete Account" : "Subject";

    const app_name = process.env.APP_NAME || "Open Auth"
    transporter.sendMail({
        from: `"${app_name}" <${from_email}>`,
        to: email_to,
        subject: subject_title ,
        text: message
    });
}