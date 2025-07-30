import {Pool} from "pg";

export async function User_table_checkdb() {

    if(!process.env.DATABASE_URL) {
        throw new Error('Please set the database url in env')
    }
    const db = new Pool({
        connectionString: process.env.DATABASE_URL
    });

    const exists = await db.query(`
        SELECT EXISTS (
          SELECT FROM information_schema.tables
          WHERE table_name = 'Users'
        );
    `);

    if (!exists.rows[0].exists) {
        await db.query(`
            CREATE TABLE "Users" (
                "userId" SERIAL PRIMARY KEY,
                "userName" TEXT UNIQUE NOT NULL,
                "userEmail" TEXT UNIQUE NOT NULL
            );
        `);
        console.log("Users table created")
        return
    }

    const columnCheckQuery = `
        SELECT column_name FROM information_schema.columns 
        WHERE table_name = 'Users' AND column_name IN ('userId', 'userEmail', 'userName');
    `;
    const columnCheckResult = await db.query(columnCheckQuery);
    const existingColumns = columnCheckResult.rows.map(row => row.column_name);
    const requiredColumns = ['userEmail', 'userName' , 'userId'];
    const missingColumns = requiredColumns.filter(col => !existingColumns.includes(col));
    
    if (missingColumns.length === 0) {
      console.log("Users table has all required columns.");
    } else {
        console.log("Existing columns:", existingColumns);
        console.log("Missing columns:", missingColumns);
        for (const column of missingColumns) {
          let alterQuery;
          if (column === 'userId') {
            alterQuery = 'ALTER TABLE "Users" ADD COLUMN "userId" SERIAL ;';
            console.error("userId is not a serial column, please change it to serial")
          } else if (column === 'userEmail') {
            alterQuery = 'ALTER TABLE "Users" ADD COLUMN "userEmail" TEXT NOT NULL UNIQUE;';
          } else if (column === 'userName') {
            alterQuery = 'ALTER TABLE "Users" ADD COLUMN "userName" TEXT NOT NULL;';
          }else {
            throw new Error(`Unknown column: ${column}`);
          }

          try {
            await db.query(alterQuery);
            console.log(`Added missing column: ${column}`);
          } catch (error) {
            throw new Error(`Cannot add missing column: ${column}`);
          }
        }
    }

}

export async function OPT_table_checkdb() {

  if(!process.env.DATABASE_URL) {
      throw new Error('Please set the database url in env')
  }
  const db = new Pool({
      connectionString: process.env.DATABASE_URL
  });

  const exists = await db.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_name = 'OPT'
      );
  `);

  if (!exists.rows[0].exists) {
      await db.query(`
          CREATE TABLE "OPT" (
              "userEmail" TEXT  PRIMARY KEY,
              "password" SERIAL NOT NULL,
              "tries" INTEGER NOT NULL DEFAULT 0,
              "createdAt" TIMESTAMP NOT NULL 
          );
      `);
      console.log("OPT (one time password) table created")
      return
  }

  const columnCheckQuery = `
      SELECT column_name FROM information_schema.columns 
      WHERE table_name = 'OPT' AND column_name IN ( 'userEmail', 'password' , 'tries' , 'createdAt');
  `;
  const columnCheckResult = await db.query(columnCheckQuery);
  const existingColumns = columnCheckResult.rows.map(row => row.column_name);
  const requiredColumns = ['userEmail', 'password' , 'tries' , 'createdAt'];
  const missingColumns = requiredColumns.filter(col => !existingColumns.includes(col));
  
  if (missingColumns.length === 0) {
    console.log("OPT table has all required columns.");
  } else {
      console.log("Existing columns:", existingColumns);
      console.log("Missing columns:", missingColumns);
      for (const column of missingColumns) {
        let alterQuery;
        if (column === 'userEmail') {
          alterQuery = 'ALTER TABLE "OPT" ADD COLUMN "userEmail" TEXT NOT NULL ;';
          console.error("userEmail is not a unique column, please change it to unique")
        } else if (column === 'password') {
          alterQuery = 'ALTER TABLE "OPT" ADD COLUMN "password" SERIAL NOT NULL ;';
        } else if (column === 'tries') {
          alterQuery = 'ALTER TABLE "OPT" ADD COLUMN "tries" INTEGER NOT NULL DEFAULT 0;';
        } else if (column === 'createdAt') {
          alterQuery = 'ALTER TABLE "OPT" ADD COLUMN "createdAt" TIMESTAMP NOT NULL ;';
        } else {
          throw new Error(`Unknown column: ${column}`);
        }

        try {
          await db.query(alterQuery);
          console.log(`Added missing column: ${column}`);
        } catch (error) {
          throw new Error(`Cannot add missing column: ${column}`);
        }
      }
  }

}