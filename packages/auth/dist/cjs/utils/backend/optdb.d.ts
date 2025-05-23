export declare function opt_create(userEmail: string, password: number): Promise<void>;
export declare function opt_varify(userEmail: string, password: number): Promise<boolean | {
    err: string;
}>;
export declare function opt_delete(userEmail: string): Promise<void>;
