import { User_table_checkdb, OPT_table_checkdb } from "./checkdb";
import { opt_delete, opt_varify } from "./optdb";
import { sendEmail } from "./sendEmail";
import { createUser } from "./userdb";
import { varifyUserName, varifyEmail } from "./varifyCred";

export async function signUpPass({ email , password } : {email : string , password : number}) {
    
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

    await createUser({username : email , email : email}).catch(err => {
        console.log(err);
        return {err: 'Database error check logs for more details'}
    })

    await sendEmail(email , `Your account has been created`).catch(err => {
        console.log(err);
        return {err: 'Database error check logs for more details'}
    })
    return {message : "Account created"}

    
}
