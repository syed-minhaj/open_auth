import { User_table_checkdb , OPT_table_checkdb} from "./checkdb";
import { uniqueEmail , uniqueUserName } from "./varifyCred";
import { opt_create } from "./optdb";
import { sendEmail } from "./sendEmail";
import { sign } from "jsonwebtoken";

type functype = {
    message : string ,
    credJwt : string
} | {
    err : string | {
        UserNameError : string | undefined
        EmailError : string | undefined
    }
}

export async function signUpCred({ username , email , prevUrl} : {username : string , email : string , prevUrl : string }): Promise<functype> {
    
    await User_table_checkdb().catch(err => {
        console.log(err);
        return {err: 'Database error check logs for more details'}
    })
    
    const [UserNameError , EmailError] = await Promise.all([uniqueUserName(username) , uniqueEmail(email)])

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
    await sendEmail(email , `Your OTP is ${opt}` , "signUp").catch(err => {
        console.log(err);
        return {err: 'Database error check logs for more details'}
    })

    const cred = {
        username : username,
        email : email ,
        prevUrl : prevUrl
    }
    const credJwt = sign(cred , process.env.AUTH_SECRET as string)
    return {message : "OTP sent to via email" , credJwt : credJwt}




}