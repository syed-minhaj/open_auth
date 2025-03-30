import {Pool} from "pg";

export async function opt_create(userEmail : string , password : number) {
    if(!process.env.DATABASE_URL) {
        throw new Error('Please set the database url in env')
    }
    const db = new Pool({
        connectionString: process.env.DATABASE_URL
    });
    // removeing all opt for this user 
    await db.query(`
        DELETE FROM "OPT" WHERE "userEmail" = $1;
    `, [userEmail]);

    const nowtime = new Date(Date.now())
    await db.query(`
        INSERT INTO "OPT" ("userEmail", "password" , "createdAt") VALUES ($1, $2, $3) ;
    `, [userEmail , password , nowtime]);
    
}

export async function opt_varify(userEmail : string , password : number) {
    if(!process.env.DATABASE_URL) {
        throw new Error('Please set the database url in env')
    }
    const db = new Pool({
        connectionString: process.env.DATABASE_URL
    });
    // get password and created at
    const res = await db.query(`
        SELECT "password" , "createdAt"
        FROM "OPT"
        WHERE "userEmail" = $1  AND "password" = $2;
    `, [userEmail , password]);
    //if opt is more than 5 min old return false
    console.log(res.rows[0].createdAt ,  new Date(Date.now() - 5*60*1000))
    if(res.rows[0] && res.rows[0].createdAt > new Date(Date.now() - 5*60*1000)) {
        return true
    }else {
        return false
    }
}

export async function opt_delete(userEmail : string) {
    if(!process.env.DATABASE_URL) {
        throw new Error('Please set the database url in env')
    }
    const db = new Pool({
        connectionString: process.env.DATABASE_URL
    });
    await db.query(`
        DELETE FROM "OPT" WHERE "userEmail" = $1;
    `, [userEmail]);
    return 
}