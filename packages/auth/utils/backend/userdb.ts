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
        INSERT INTO "Users" ("userId", "userName", "userEmail") VALUES ($1, $2, $3) ;
    `, [userId , username , email]);
    return userId;
}

export async function getUser({userEmail} : {userEmail : string}) {
    if(!process.env.DATABASE_URL) {
        throw new Error('Please set the database url in env')
    }
    const db = new Pool({
        connectionString: process.env.DATABASE_URL
    });
    const res = await db.query(`
        SELECT "userId", "userName", "userEmail" FROM "Users" WHERE "userEmail" = $1;
    `, [userEmail]);
    if(!res.rows[0]) {
        throw new Error('User not found')
    }
    return res.rows[0]
}

export async function deleteUser({userId} : {userId : number}) {
    if(!process.env.DATABASE_URL) {
        throw new Error('Please set the database url in env')
    }
    const db = new Pool({
        connectionString: process.env.DATABASE_URL
    });

    await db.query(`
        DELETE FROM "Users" WHERE "userId" = $1;
    `, [userId]);
}