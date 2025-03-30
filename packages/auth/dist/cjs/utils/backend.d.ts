export declare function open_auth_backend(from: string | null, data: any): Promise<{
    message: string;
} | {
    err: string | {
        UserNameError: string | undefined;
        EmailError: string | undefined;
    };
}>;
