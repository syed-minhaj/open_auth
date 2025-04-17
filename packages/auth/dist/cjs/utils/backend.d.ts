export declare function open_auth_backend(from: string | null, data: any): Promise<{
    message: string;
    err?: undefined;
} | ({
    message: string;
    credJwt: string;
} | {
    err: string | {
        UserNameError: string | undefined;
        EmailError: string | undefined;
    };
})>;
