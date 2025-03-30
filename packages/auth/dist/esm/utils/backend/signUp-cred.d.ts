type functype = {
    message: string;
} | {
    err: string | {
        UserNameError: string | undefined;
        EmailError: string | undefined;
    };
};
export declare function signUpCred({ username, email }: {
    username: string;
    email: string;
}): Promise<functype>;
export {};
