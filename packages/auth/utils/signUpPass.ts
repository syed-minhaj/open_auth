import { backend_url } from '../env'

export async function signUpPassword({ password } : { password : number }) {

    const app_url = backend_url
    
    if(!app_url) {
        throw new Error('Please set the backend url in env')
    }

    function getCookie(name : string) {
        return document.cookie.split('; ').find(row => row.startsWith(name + '='))?.split('=')[1]
    }
    
   

    const res = await fetch( app_url + '/api/auth/open_auth' , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'from' : 'signUp-password'
        },
        body: JSON.stringify({ password , credJwt : getCookie('open_auth_cred')}),
    }).then( res => res.json()).catch(err => {
        console.log(err)
        throw new Error('Backend error')
    })
    
    
    if (res.err) {
        console.error(res.err)
        return {err : res.err}
    }else if(res.jwt){
        let date = new Date();
        date.setTime(date.getTime() + (3 * 24*60*60*1000));
        document.cookie = `open_auth_jwt=${res.jwt};expires=${date.toUTCString()};`;
        document.cookie = `open_auth_cred=;expires=Tue, 01 Apr 2025 00:00:00 GMT;`;
        window.location.href = res.returnUrl
    }else{
        history.back()
    }
}