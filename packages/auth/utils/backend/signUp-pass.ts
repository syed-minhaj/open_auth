import { User_table_checkdb, OPT_table_checkdb } from "./checkdb";
import { opt_delete, opt_varify } from "./optdb";
import { sendEmail } from "./sendEmail";
import { createUser } from "./userdb";
import {sign} from "jsonwebtoken";

export async function signUpPass({ email , password , username } : {email : string , password : number , username : string}) {
    
    await User_table_checkdb().catch(err => {
        console.log(err);
        return {err: 'Database error check logs for more details'}
    })
    
    
    await OPT_table_checkdb().catch(err => {
        console.log(err);
        return {err: 'Database error check logs for more details'}
    })
    

    const varityOPT = await opt_varify(email , password)

    if(!varityOPT) {
        return {err: 'wrong password'}
    }

    await opt_delete(email).catch(err => {
        console.log(err);
        return {err: 'Database error check logs for more details'}
    })
    console.log(username)
    const userId = await createUser({username : username , email : email}).catch(err => {
        console.log(err);
        return {err: 'Database error check logs for more details'}
    })

    await sendEmail(email , `Your account has been created`).catch(err => {
        console.log(err);
        return {err: 'Database error check logs for more details'}
    })

    // create jwt
    const user = {
        id : userId,
        username : username,
        email : email
    }
    const jwt_tocken = sign(user , process.env.AUTH_SECRET as string)
    return {message : "Account created" , jwt : jwt_tocken}

    
}
