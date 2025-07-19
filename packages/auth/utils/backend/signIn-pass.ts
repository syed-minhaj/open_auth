import { User_table_checkdb, OPT_table_checkdb } from "./checkdb";
import { opt_delete, opt_varify } from "./optdb";
import { getUser } from "./userdb";
import { sign, verify } from "jsonwebtoken";
import {z} from "zod";

const credSchema = z.object({
    email : z.string() ,
    prevUrl : z.string()
})

const userSchema = z.object({
    userId : z.number() ,
    userName : z.string() ,
    userEmail : z.string().email({message : "invalid email form database , check database"})
})

export async function signInPass({ password , credJwt  } : { password : number  , credJwt : string }) {
    
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
    const user = await getUser({userEmail : cred.email}).catch(err => {
        console.log(err);
        return {err: 'Database error check logs for more details'}
    })

    const verified_user = userSchema.safeParse(user)
    if(!verified_user.success) {
        console.log(verified_user.error , 'Database error : user table');
        return {err : 'data base error: check logs for more details'}  
    }

    const jwt_tocken = sign(verified_user.data , process.env.AUTH_SECRET as string)
    return {message : "Signed In" , jwt : jwt_tocken , returnUrl : cred.prevUrl}

    
}
