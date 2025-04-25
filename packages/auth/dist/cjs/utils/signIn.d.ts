export declare function signIn({ email, backend_url }: {
    email: string;
    backend_url: string;
}): Promise<{
    err: any;
} | undefined>;
