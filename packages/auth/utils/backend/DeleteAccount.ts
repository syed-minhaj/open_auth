import { verify } from "jsonwebtoken";
import { User_table_checkdb } from "./checkdb";
import { sendEmail } from "./sendEmail";
import { varifyEmail } from "./varifyCred";
import {z} from "zod";
import { deleteUser } from "./userdb";

const userSchema = z.object({
    userId : z.number() ,
    userName : z.string() ,
    userEmail : z.string().email({message : "invalid email form database , check database"})
})

export async function deleteAccount({authJwt}:{authJwt:string}){

    if(!process.env.AUTH_SECRET) {
        console.log('Auth secret not set');
        return {err: 'Auth secret not set'}
    }
    await User_table_checkdb().catch(err => {
        console.log(err);
        return {err: 'Database error check logs for more details'}
    })
    let userDetail_from_jwt;
    try {
        userDetail_from_jwt = verify(authJwt , process.env.AUTH_SECRET )
    } catch (err) {
        console.log(err , 'Invalid auth jwt');
        return {err: 'Invalid auth jwt'}
    }

    const safeUser = userSchema.safeParse(userDetail_from_jwt)
    if(!safeUser.success) {
        return {err : 'invalid input(auth jwt)'}
    }
    let user = safeUser.data;
    
    const  EmailError = await varifyEmail(user.userEmail)
    if ( EmailError) {
        return {err: EmailError}
    }

    await deleteUser({userId : user.userId}).catch(err => {
        console.log(err);
        return {err: 'Database error check logs for more details'}
    })

    // send email to user
    await sendEmail(user.userEmail , `Your account has been deleted ` , "deleteAccount").catch(err => { 
        console.log(err);
        return {err: 'Database error check logs for more details'}
    })

    return {message : "User account deleted" }
}