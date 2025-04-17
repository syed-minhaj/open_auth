type functype = {
    message: string;
    credJwt: string;
} | {
    err: string | {
        UserNameError: string | undefined;
        EmailError: string | undefined;
    };
};
export declare function signUpCred({ username, email, prevUrl }: {
    username: string;
    email: string;
    prevUrl: string;
}): Promise<functype>;
export {};
