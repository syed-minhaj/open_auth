import {Pool} from "pg";

export async function createUser({ username , email } : {username : string , email : string}) {
    if(!process.env.DATABASE_URL) {
        throw new Error('Please set the database url in env')
    }
    const db = new Pool({
        connectionString: process.env.DATABASE_URL
    });

    // generate long userId 
    const userId = Math.floor(100000 + Math.random() * 900000);
    
    await db.query(`
        INSERT INTO "User" ("userId", "userName", "userEmail") VALUES ($1, $2, $3) ;
    `, [userId , username , email]);
    return userId;
}