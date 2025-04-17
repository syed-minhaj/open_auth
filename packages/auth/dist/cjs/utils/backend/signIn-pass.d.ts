export declare function signInPass({ password, credJwt }: {
    password: number;
    credJwt: string;
}): Promise<{
    err: string;
    message?: undefined;
    jwt?: undefined;
    returnUrl?: undefined;
} | {
    message: string;
    jwt: string;
    returnUrl: string;
    err?: undefined;
}>;
