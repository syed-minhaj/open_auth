export declare function uniqueEmail(email: string): Promise<"Accout with same Email already exists" | undefined>;
export declare function uniqueUserName(name: string): Promise<"Accout with same UserName already exists" | undefined>;
export declare function varifyEmail(email: string): Promise<"Email not found , signUp to create an account" | undefined>;
