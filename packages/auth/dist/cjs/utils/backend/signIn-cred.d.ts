export declare function signInCred({ email, prevUrl }: {
    email: string;
    prevUrl: string;
}): Promise<{
    err: string;
    message?: undefined;
    credJwt?: undefined;
} | {
    message: string;
    credJwt: string;
    err?: undefined;
}>;
