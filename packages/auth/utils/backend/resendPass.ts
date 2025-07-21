import { User_table_checkdb, OPT_table_checkdb } from "./checkdb";
import { opt_create } from "./optdb";
import { sendEmail } from "./sendEmail";
import { verify } from "jsonwebtoken";
import {z} from "zod";



const CredSchema = z.object({
    username : z.string().optional() ,
    email : z.string().email({message : "invalid email"}) ,
    prevUrl : z.string()
}) 



export async function resendPass({ credJwt } : {  credJwt : string }) {
    
    if(!process.env.AUTH_SECRET) {
        console.log('Auth secret not set');
        return {err: 'Auth secret not set'}
    }
    
    let cred_from_jwt;
    try {
        cred_from_jwt = verify(credJwt , process.env.AUTH_SECRET )
    } catch (err) {
        console.log(err , 'Invalid cred jwt');
        return {err: 'Invalid cred jwt'}
    }

    let safeCred = CredSchema.safeParse(cred_from_jwt)
    if(!safeCred.success) {
        return {err : 'invalid input(cred jwt)'}
    }
    const cred = safeCred.data;

    await User_table_checkdb().catch(err => {
        console.log(err);
        return {err: 'Database error check logs for more details'}
    })
    
    
    await OPT_table_checkdb().catch(err => {
        console.log(err);
        return {err: 'Database error check logs for more details'}
    })
    

    const opt = Math.floor(100000 + Math.random() * 900000);
    
    await opt_create(cred.email , opt).catch(err => {
        console.log(err);
        return {err: 'Database error check logs for more details'}
    })

    // send email to user
    await sendEmail(cred.email , `Your OTP is ${opt}`,"resendOPT").catch(err => {
        console.log(err);
        return {err: 'Database error check logs for more details'}
    })
    return {message : "OTP sent to via email"}
    
}


