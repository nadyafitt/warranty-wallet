import mysql from "mysql2/promise";

let pool;

function createPool() {
  console.log("Creating MySQL connection...");
  console.log("MYSQL_HOST:", process.env.MYSQL_HOST);
  console.log("MYSQL_PORT:", process.env.MYSQL_PORT);
  console.log("MYSQL_USER:", process.env.MYSQL_USER);
  console.log("MYSQL_DATABASE:", process.env.MYSQL_DATABASE);
  console.log(
    "MYSQL_PASSWORD:",
    process.env.MYSQL_PASSWORD ? "SET" : "MISSING"
  );

  return mysql.createPool({
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT || 3306),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,

    ssl:
      process.env.MYSQL_SSL === "true"
        ? {
            minVersion: "TLSv1.2",
            rejectUnauthorized: true,
          }
        : undefined,

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
}

export function getPool() {
  if (!pool) {
    pool = createPool();
  }

  return pool;
}