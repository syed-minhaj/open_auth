import { User_table_checkdb, OPT_table_checkdb } from "./checkdb";
import { opt_delete, opt_varify } from "./optdb";
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
    
    
    await OPT_table_checkdb().catch(err => {
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
    
    const varifyOPT = await opt_varify(cred.email , password)
    
    if(!varifyOPT) {
        return {err: 'wrong password'}
    }else if(varifyOPT != true && varifyOPT.err) {
        console.log(varifyOPT.err);
        return {err: varifyOPT.err}
    }

    await opt_delete(cred.email).catch(err => {
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
