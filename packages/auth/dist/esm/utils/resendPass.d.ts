export declare function resendPass({ backend_url }: {
    backend_url: string;
}): Promise<{
    err: any;
    message?: undefined;
} | {
    message: any;
    err?: undefined;
}>;
