export declare function signUpPass({ email, password, username }: {
    email: string;
    password: number;
    username: string;
}): Promise<{
    err: string;
    message?: undefined;
    jwt?: undefined;
} | {
    message: string;
    jwt: string;
    err?: undefined;
}>;
