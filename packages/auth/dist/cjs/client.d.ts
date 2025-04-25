declare class CreateOpenAuthClient {
    protected backend_Url: string;
    constructor({ backendUrl }: {
        backendUrl: string;
    });
    signUp({ username, email }: {
        username: string;
        email: string;
    }): Promise<{
        err: any;
    } | undefined>;
    signUpPassword({ password }: {
        password: number;
    }): Promise<{
        err: any;
    } | undefined>;
    resendPass(): Promise<{
        err: any;
        message?: undefined;
    } | {
        message: any;
        err?: undefined;
    }>;
    signOut(): {
        message: string;
    };
    signIn({ email }: {
        email: string;
    }): Promise<{
        err: any;
    } | undefined>;
    signInPassword({ password }: {
        password: number;
    }): Promise<{
        err: any;
    } | undefined>;
}
export { CreateOpenAuthClient };
