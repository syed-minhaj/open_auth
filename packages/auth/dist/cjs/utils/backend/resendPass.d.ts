export declare function resendPass({ credJwt }: {
    credJwt: string;
}): Promise<{
    err: string;
    message?: undefined;
} | {
    message: string;
    err?: undefined;
}>;
