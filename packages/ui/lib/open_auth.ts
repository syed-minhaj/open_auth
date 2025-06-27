import { CreateOpenAuthClient } from "@open_auth/auth/client";

const openAuth = new CreateOpenAuthClient({
    backendUrl : "http://localhost:3000"
});

export default openAuth ;