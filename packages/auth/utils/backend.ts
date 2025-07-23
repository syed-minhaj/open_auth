
import { resendPass } from "./backend/resendPass";
import { signInCred } from "./backend/signIn-cred";
import { signUpCred } from "./backend/signUp-cred";
import { signUpPass } from "./backend/signUp-pass";
import { signInPass } from "./backend/signIn-pass";
import { deleteAccount } from "./backend/DeleteAccount";
import {z} from "zod";

const signUpCredSchema = z.object({
    username : z.string() ,
    email : z.string().email({message : "invalid email"}) ,
    prevUrl : z.string()
})

const signUpPassSchema = z.object({
    password : z.number() ,
    credJwt : z.string().jwt({message : "invalid jwt"})
})

const signInCredSchema = z.object({
    email : z.string().email({message : "invalid email"}) ,
    prevUrl : z.string()
})

const signInPassSchema = z.object({
    password : z.number() ,
    credJwt : z.string().jwt({message : "invalid jwt"})
})

const deleteAccountSchema = z.object({
    authJwt : z.string().jwt({message : "invalid Auth jwt"})
})
  

export class OpenAuthBackend {

    async Main(from :string | null , data : any ) {
        const {Console} = console;
        const originalLog = new Console({stdout : process.stdout});
        
        console.log = function(...args) {
            process.stdout.write("\x1b[34m" + '[OPEN_AUTH] ' + "\x1b[0m" );
            const message = args.map(arg => 
                typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
            ).join(' ');
            process.stdout.write(message);
            process.stdout.write("\n");
        };
        const res = await backend(from , data)
        
        console.log = originalLog.log;
        return res
           
    }
}


async function backend(from :string | null , data : any ) {
    if(!from) {
        return {err : "bad request"}
    }
    
    if(from === 'signUp-credential') {
        if(data.username && data.email ) {
            const d = {
                username : data.username,
                email : data.email,
                prevUrl : (data.prevUrl == "") ? "/" : data.prevUrl
            }
            const signUpCredZod = signUpCredSchema.safeParse(d)
            if(!signUpCredZod.success) {
                return {err : "invalid input"}
            }
            return await signUpCred(signUpCredZod.data)
        }else{
            return {err : "provide username and email"}
        }
    }
    
    else if(from === 'signUp-password') {
        if(data.password && data.credJwt) {
            data.password = Number(data.password)  
            const signUpPassZod = signUpPassSchema.safeParse(data)
            if(!signUpPassZod.success) {
                return {err : "invalid input"}
            }
            return await signUpPass(signUpPassZod.data)
        }else{
            return {err : "provide password and credJwt"}
        }
    }
    
    else if(from === 'resendPass') {
        if(data.credJwt) {
            return await resendPass(data)
        }else{
            return {err : "provide email and credJwt"}
        }
    }
    
    else if (from === 'signIn-credential') {
        if(data.email ) {
            const signInCredZod = signInCredSchema.safeParse(data)
            if(!signInCredZod.success) {
                return {err : "invalid input"}
            }
            return await signInCred(signInCredZod.data)
        }else{
            return {err : "provide email"}
        }
    }
    
    else if (from === 'signIn-password') {
        if(data.password && data.credJwt) {
            data.password = Number(data.password)  
            const signInPassZod = signInPassSchema.safeParse(data)
            if(!signInPassZod.success) {
                return {err : "invalid input"}
            }
            return await signInPass(signInPassZod.data)
        }else{
            return {err : "provide password and credJwt"}
        }
    }
    
    else if (from === 'deleteAccount') {
        if(data.authJwt){
            const deleteAccountZod = deleteAccountSchema.safeParse(data)
            if(!deleteAccountZod.success) {
                return {err : "invalid input"}
            }
            return await deleteAccount(deleteAccountZod.data)
        }else{
            console.log("no auth jwt recived")
            return {err : "Make sure you are signed In"}
        }
    }
    
    else {
        return {err : "bad request"}
    }

}