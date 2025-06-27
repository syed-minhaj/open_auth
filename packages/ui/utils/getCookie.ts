function getCookie(name : string) {
    
    const a =  document.cookie.split('; ').find(row => row.startsWith(name + '='))?.split('=')[1]
    console.log(a)
    return a
}

export default getCookie;