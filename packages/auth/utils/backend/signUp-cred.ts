import {createTransport}  from "nodemailer";
import { User_table_checkdb , OPT_table_checkdb} from "./checkdb";
import { varifyEmail , varifyUserName } from "./varifyCred";
import {Pool} from "pg";
import { opt_create } from "./optdb";
import { sendEmail } from "./sendEmail";

type functype = {
    message : string
} | {
    err : string | {
        UserNameError : string | undefined
        EmailError : string | undefined
    }
}

export async function signUpCred({ username , email} : {username : string , email : string }): Promise<functype> {
    
    await User_table_checkdb().catch(err => {
        console.log(err);
        return {err: 'Database error check logs for more details'}
    })
    
    const [UserNameError , EmailError] = await Promise.all([varifyUserName(username) , varifyEmail(email)])

    const credErr = {UserNameError , EmailError}
    if (UserNameError || EmailError) {
        return {err: credErr}
    }
    
    await OPT_table_checkdb().catch(err => {
        console.log(err);
        return {err: 'Database error check logs for more details'}
    })
    
    // generate a 8 digit OTP

    const opt = Math.floor(100000 + Math.random() * 900000);

    await opt_create(email , opt).catch(err => {
        console.log(err);
        return {err: 'Database error check logs for more details'}
    })

    // send email to user
    await sendEmail(email , `Your OTP is ${opt}`).catch(err => {
        console.log(err);
        return {err: 'Database error check logs for more details'}
    })
    return {message : "OTP sent to via email"}



    // create a new user in User table
    // const app_password = process.env.APP_PASSWORD;
    // if(!app_password) {
    //     console.log("\n\n\n Enter APP_PASSWORD in .env \n Enter APP_PASSWORD in .env \n\n\n")
    //     throw new Error('Backend error')
    // }

    // const from_email = process.env.FROM_EMAIL;
    // if(!from_email) {
    //     console.log("\n\n\n Enter FROM_EMAIL in .env \n Enter FROM_EMAIL in .env \n\n\n")
    //     throw new Error('Backend error')
    // }

    // const transporter = createTransport({
    //     host: "smtp.gmail.com",
    //     port: 465,
    //     secure: true,
    //     auth: {
    //         user: from_email,
    //         pass: app_password
    //     }
    // });

    // const app_name = process.env.APP_NAME || "Open Auth"
    // transporter.sendMail({
    //     from: `"${app_name}" <${from_email}>`,
    //     to: email,
    //     subject: 'Sign Up',
    //     text: `Hello ${username} , Welcome to Open Auth`
    // });

}