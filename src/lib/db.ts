import mysql from "mysql2/promise";

let pool: mysql.Pool | null = null;

export function getDb() {
  if (!pool) {
    const required = ["DB_HOST", "DB_USER", "DB_PASSWORD", "DB_NAME"];
    const missing = required.filter((key) => !process.env[key]);
    if (missing.length) throw new Error(`Missing database configuration: ${missing.join(", ")}`);
    pool = mysql.createPool({ host: process.env.DB_HOST, port: Number(process.env.DB_PORT || 3306), user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_NAME, waitForConnections: true, connectionLimit: 5, ssl: process.env.DB_SSL === "true" ? {} : undefined });
  }
  return pool;
}