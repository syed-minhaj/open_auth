export declare function signUp({ username, email }: {
    username: string;
    email: string;
}): Promise<{
    err: any;
} | undefined>;
