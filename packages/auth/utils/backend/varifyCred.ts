import {Pool} from "pg";

async function EmailExists(email : string) {
    
    if(!process.env.DATABASE_URL) {
        throw new Error('Please set the database url in env')
    }
    const db = new Pool({
        connectionString: process.env.DATABASE_URL
    });

    const res = await db.query(`
        SELECT EXISTS (
          SELECT FROM "Users"
          WHERE "userEmail" = $1
        );
    `, [email]);

    if(res.rows[0].exists) {
        return true
    }else{
        return false
    }
}

async function UserNameExists(name : string) {
    
    if(!process.env.DATABASE_URL) {
        throw new Error('Please set the database url in env')
    }
    const db = new Pool({
        connectionString: process.env.DATABASE_URL
    });

    const res = await db.query(`
        SELECT EXISTS (
          SELECT FROM "Users"
          WHERE "userName" = $1
        );
    `, [name]);

    if(res.rows[0].exists) {
        return true
    }else{
        return false
    }
}

export async function uniqueEmail(email : string) {
    
    if(await EmailExists(email)) {
        return "Accout with same Email already exists"
    } 
}

export async function uniqueUserName(name : string) {
    
    if(await UserNameExists(name)) {
        return "Accout with same UserName already exists"
    } 
}

export async function varifyEmail(email : string) {
    
    if(await EmailExists(email) == false) {
        return "Email not found , signUp to create an account"
    } 
}