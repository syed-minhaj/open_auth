

export function signOut() {
    
    document.cookie = `open_auth_jwt=;expires=Tue, 01 Apr 2025 00:00:00 GMT;`;
    document.cookie = `open_auth_email=;expires=Tue, 01 Apr 2025 00:00:00 GMT;`;
    return {message : "signed out"}
}