import {signUp} from "./utils/signUp";
import {signUpPassword} from "./utils/signUpPass";
import {signOut} from "./utils/signOut";
import {resendPass} from "./utils/resendPass";
import { signIn } from "./utils/signIn";
import {signInPassword} from "./utils/signInPass";


class CreateOpenAuthClient {
    protected backend_Url:string;
    constructor({backendUrl}:{backendUrl:string}){
        this.backend_Url = backendUrl;
    }
    public signUp({username , email}:{username:string,email:string}){
        return signUp({username , email , backend_url : this.backend_Url});
    }
    public signUpPassword({password}:{password:number}){
        return signUpPassword({password , backend_url : this.backend_Url});
    }
    public resendPass(){
        return resendPass({backend_url : this.backend_Url});
    }
    public signOut(){
        return signOut();
    }
    public signIn({email} : {email:string}){
        return signIn({email , backend_url : this.backend_Url});
    }
    public signInPassword({password} : {password:number}){
        return signInPassword({password , backend_url : this.backend_Url});
    }
}


export { CreateOpenAuthClient }