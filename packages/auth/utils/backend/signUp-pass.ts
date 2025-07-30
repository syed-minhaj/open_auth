import { User_table_checkdb, OTP_table_checkdb } from "./checkdb";
import { otp_delete, otp_varify } from "./otpdb";
import { sendEmail } from "./sendEmail";
import { createUser } from "./userdb";
import {sign, verify} from "jsonwebtoken";
import {z} from "zod";

const credSchema = z.object({
    username : z.string() ,
    email : z.string() ,
    prevUrl : z.string()
})

export async function signUpPass({ password , credJwt  } : { password : number  , credJwt : string }) {
    
    

    if(!process.env.AUTH_SECRET) {
        console.log('Auth secret not set');
        return {err: 'Auth secret not set'}
    }
    await User_table_checkdb().catch(err => {
        console.log(err);
        return {err: 'Database error check logs for more details'}
    })
    
    
    await OTP_table_checkdb().catch(err => {
        console.log(err);
        return {err: 'Database error check logs for more details'}
    })
    let cred_from_jwt;
    try {
        cred_from_jwt = verify(credJwt , process.env.AUTH_SECRET )
    } catch (err) {
        console.log(err , 'Invalid cred jwt');
        return {err: 'Invalid cred jwt'}
    }

    const safeCred = credSchema.safeParse(cred_from_jwt)
    if(!safeCred.success) {
        return {err : 'invalid input(cred jwt)'}
    }
    let cred = safeCred.data;
    
    const varifyOTP = await otp_varify(cred.email , password)
    
    if(!varifyOTP) {
        return {err: 'wrong password'}
    }else if(varifyOTP != true && varifyOTP.err) {
        console.log(varifyOTP.err);
        return {err: varifyOTP.err}
    }

    await otp_delete(cred.email).catch(err => {
        console.log(err);
        return {err: 'Database error check logs for more details'}
    })

    let userId : number ;
    try {
        userId = await createUser({username : cred.username , email : cred.email})
    }catch(err) {
        console.log(err);
        return {err: 'Database error check logs for more details'}
    }

    
    await sendEmail(cred.email , `Your account has been created`,"signUp").catch(err => {
        console.log(err);
        return {err: 'Database error check logs for more details'}
    })

    // create jwt
    const user = {
        userId : userId,
        userName : cred.username,
        userEmail : cred.email
    }
    const jwt_tocken = sign(user , process.env.AUTH_SECRET as string)
    return {message : "Account created" , jwt : jwt_tocken , returnUrl : cred.prevUrl}

    
}
