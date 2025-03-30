import { signUpCred } from "./backend/signUp-cred";
import { signUpPass } from "./backend/signUp-pass";

export async function open_auth_backend(from :string | null , data : any ) {
    if(!from) {
        throw new Error('bad request')
    }
    if(from === 'signUp-credential') {
        if(data.username && data.email) {
            return await signUpCred({username : data.username , email : data.email})
        }else{
            throw new Error('provide username and email')
        }
    }else if(from === 'signUp-password') {
        if(data.email && data.password) {
            return await signUpPass({email : data.email , password : data.password})
        }else{
            throw new Error('provide email and password')
        }
    }
    else {
        throw new Error('bad request')
    }
}