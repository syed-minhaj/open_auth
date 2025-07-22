
export async function signUp({ username , email , backend_url} : {username : string , email : string , backend_url : string}) {
    
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
        console.error(err)
        throw new Error('Backend error')
    })
    
    

    //document.cookie = `b=${res.message}258n;expires=${date.toUTCString()};`;
    if (res.err) {
        console.error(res.err)
        return {err : res.err}
    }else{
        // add email and username
        document.cookie = `open_auth_cred=${res.credJwt};`;
        document.cookie = `open_auth_email=${email};`;
        window.location.href = `/signUpPassword`
    }

}

