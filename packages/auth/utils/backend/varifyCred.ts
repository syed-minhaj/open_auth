import {Pool} from "pg";
export async function varifyEmail(email : string) {
    
    if(!process.env.DATABASE_URL) {
        throw new Error('Please set the database url in env')
    }
    const db = new Pool({
        connectionString: process.env.DATABASE_URL
    });

    const res = await db.query(`
        SELECT EXISTS (
          SELECT FROM "User"
          WHERE "userEmail" = $1
        );
    `, [email]);

    if(res.rows[0].exists) {
        return "Accout with same Email already exists"
    } 
}

export async function varifyUserName(name : string) {
    
    if(!process.env.DATABASE_URL) {
        throw new Error('Please set the database url in env')
    }
    const db = new Pool({
        connectionString: process.env.DATABASE_URL
    });

    const res = await db.query(`
        SELECT EXISTS (
          SELECT FROM "User"
          WHERE "userName" = $1
        );
    `, [name]);

    if(res.rows[0].exists) {
        return "Accout with same UserName already exists"
    } 
}