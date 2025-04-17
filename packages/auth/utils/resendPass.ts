import { backend_url } from '../env'

export async function resendPass() {
    
    const app_url = backend_url
    
    if(!app_url) {
        throw new Error('Please set the backend url in env')
    }

    function getCookie(name : string) {
        return document.cookie.split('; ').find(row => row.startsWith(name + '='))?.split('=')[1]
    }
    
    const credJwt = getCookie('open_auth_cred')
    const res = await fetch( app_url + '/api/auth/open_auth' , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'from' : 'resendPass'
        },
        body: JSON.stringify({ credJwt }),
    }).then( res => res.json()).catch(err => {
        console.log(err)
        throw new Error('Backend error')
    })
    
    

    if (res.err) {
        console.error(res.err)
        alert(res.err)
        return {err : res.err}
    }else{
        return {message : res.message}
    }

}

