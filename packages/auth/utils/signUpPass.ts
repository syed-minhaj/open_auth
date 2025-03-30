

export async function signUpPassword({ password } : { password : number }) {

    const app_url = process.env.BACKEND_URL 
                 || process.env.NEXT_PUBLIC_BACKEND_URL
                 || process.env.REACT_APP_BACKEND_URL
    
    if(!app_url) {
        throw new Error('Please set the backend url in env')
    }
    const url = new URL(window.location.href)
    const email = url.searchParams.get('email')
    const username = url.searchParams.get('username')
    if(!email) {
        throw new Error('email not found in url search params')
    }
    if(!username) {
        throw new Error('username not found in url search params')
    }
    const res = await fetch( app_url + '/api/auth/open_auth' , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'from' : 'signUp-password'
        },
        body: JSON.stringify({ email , password , username}),
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
        console.log(date , "\n\nnext\n\n" , date.toUTCString() )
        document.cookie = `open_auth_jwt=${res.jwt};expires=${date.toUTCString()};`;
        history.go(-2)
    }else{
        history.back()
    }
}