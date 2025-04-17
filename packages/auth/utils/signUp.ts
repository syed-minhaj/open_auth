import { backend_url } from '../env'

export async function signUp({ username , email} : {username : string , email : string }) {
    
    const app_url = backend_url
    
    if(!app_url) {
        throw new Error('Please set the backend url in env')
    }

    const res = await fetch( app_url + '/api/auth/open_auth' , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'from' : 'signUp-credential'
        },
        body: JSON.stringify({ username , email , prevUrl : document.referrer}),
    }).then( res => res.json()).catch(err => {
        console.log(err)
        throw new Error('Backend error')
    })
    
    

    //document.cookie = `b=${res.message}258n;expires=${date.toUTCString()};`;
    if (res.err) {
        console.error(res.err)
        alert(res.err)
        return {err : res.err}
    }else{
        // add email and username
        document.cookie = `open_auth_cred=${res.credJwt};`;
        window.location.href = `/signUpPassword`
    }

}

