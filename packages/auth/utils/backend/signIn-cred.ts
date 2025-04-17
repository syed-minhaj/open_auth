import { sign } from "jsonwebtoken";
import { User_table_checkdb, OPT_table_checkdb } from "./checkdb";
import { opt_create } from "./optdb";
import { sendEmail } from "./sendEmail";
import { varifyEmail } from "./varifyCred";

export async function signInCred({ email  , prevUrl } : {email : string , prevUrl : string }) {


    await User_table_checkdb().catch(err => {
        console.log(err);
        return {err: 'Database error check logs for more details'}
    })
    const  EmailError = await varifyEmail(email)
    if ( EmailError) {
        return {err: EmailError}
    }
    await OPT_table_checkdb().catch(err => {
        console.log(err);
        return {err: 'Database error check logs for more details'}
    })


    
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

    const cred = {
        email : email ,
        prevUrl : prevUrl
    }
    const credJwt = sign(cred , process.env.AUTH_SECRET as string)
    return {message : "OTP sent to via email" , credJwt : credJwt}
}