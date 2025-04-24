
export async function signIn({email , backend_url} : {email : string , backend_url : string}) {

    const app_url = backend_url
    
    if(!app_url) {
        throw new Error('Please set the backend url in env')
    }


    const res = await fetch( app_url + '/api/auth/open_auth' , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'from' : 'signIn-credential'
        },
        body: JSON.stringify({ email , prevUrl : document.referrer}),
    }).then( res => res.json()).catch(err => {
        console.log(err)
        throw new Error('Backend error')
    })
    
    

    if (res.err) {
        console.error(res.err)
        alert(res.err)
        return {err : res.err}
    }else{
        document.cookie = `open_auth_cred=${res.credJwt};`;
        window.location.href = `/signInPassword`
    }

}