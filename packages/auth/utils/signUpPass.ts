

export async function signUpPassword({ password } : { password : number }) {

    const app_url = process.env.BACKEND_URL 
                 || process.env.NEXT_PUBLIC_BACKEND_URL
                 || process.env.REACT_APP_BACKEND_URL
    
    if(!app_url) {
        throw new Error('Please set the backend url in env')
    }
    const url = new URL(window.location.href)
    const email = url.searchParams.get('email')
    if(!email) {
        throw new Error('email not found in url search params')
    }
    const res = await fetch( app_url + '/api/auth/open_auth' , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'from' : 'signUp-password'
        },
        body: JSON.stringify({ email , password }),
    }).then( res => res.json()).catch(err => {
        console.log(err)
        throw new Error('Backend error')
    })
    
    
    let date = new Date();
    date.setTime(date.getTime() + (3 * 24*60*60*1000));
    console.log(date , "\n\nnext\n\n" , date.toUTCString() )

    //document.cookie = `b=${res.message}258n;expires=${date.toUTCString()};`;
    if (res.err) {
        console.error(res.err)
        return {err : res.err}
    }else{
        history.go(-2)
    }
}