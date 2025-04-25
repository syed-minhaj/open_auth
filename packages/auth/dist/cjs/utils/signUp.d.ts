export declare function signUp({ username, email, backend_url }: {
    username: string;
    email: string;
    backend_url: string;
}): Promise<{
    err: any;
} | undefined>;
