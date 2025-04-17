export declare function createUser({ username, email }: {
    username: string;
    email: string;
}): Promise<number>;
export declare function getUser({ userEmail }: {
    userEmail: string;
}): Promise<any>;
