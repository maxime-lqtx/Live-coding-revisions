import mysql from "mysql2/promise";


const client = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "LiveC",
    database: process.env.DB_NAME || "db_ci",
    password: process.env.DB_PASSWORD || "root",
    port: Number.parseInt(process.env.DB_PORT as string),
})

client
    .getConnection()
    .then((connection) => {
        console.log(`Using databae ${process.env.DB_NAME}`);
        connection.release();
    })
    .catch((error: Error) => {
        console.warn(
            "error:" + error.message
        );
    })

export default client;

