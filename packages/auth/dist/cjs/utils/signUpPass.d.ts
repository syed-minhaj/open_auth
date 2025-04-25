export declare function signUpPassword({ password, backend_url }: {
    password: number;
    backend_url: string;
}): Promise<{
    err: any;
} | undefined>;
