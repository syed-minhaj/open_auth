export declare function signUpPass({ email, password, username }: {
    email: string;
    password: number;
    username: string;
}): Promise<{
    err: string;
    message?: undefined;
} | {
    message: string;
    err?: undefined;
}>;
