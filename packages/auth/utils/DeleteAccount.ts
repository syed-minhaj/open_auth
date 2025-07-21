
export async function deleteAccount({backend_url}:{backend_url:string}){

    const app_url = backend_url;

    if(!app_url) {
        throw new Error('Please set the backend url in env')
    }

    function getCookie(name : string) {
        return document.cookie.split('; ').find(row => row.startsWith(name + '='))?.split('=')[1]
    }

    const res = await fetch(app_url+'/api/auth/open_auth',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'from' : 'deleteAccount'
        },
        body: JSON.stringify({ authJwt : getCookie('open_auth_jwt')}),
    }).then(res => res.json()).catch(err => {
        console.log(err);
        throw new Error('Backend Error');
    })

    if(res.err){
        console.log(res.err);
        alert(res.err);
        return {err:res.err};
    }else{
        document.cookie = `open_auth_jwt=;expires=Tue, 01 Apr 2025 00:00:00 GMT;`;
        document.cookie = `open_auth_email=;expires=Tue, 01 Apr 2025 00:00:00 GMT;`;
        window.location.href = '/';
    }

    
}