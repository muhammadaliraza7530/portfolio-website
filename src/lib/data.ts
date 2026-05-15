import mysql from "mysql2/promise";
import path from "path";
import fs from "fs";

let db: mysql.Connection | null = null;
let connectionFailed = false;

export async function getDb() {
  if (db) return db;
  if (connectionFailed) return null;
  
  const host = process.env.MYSQL_HOST;
  if (!host || host === "" || host === "your_mysql_host_here") {
    return null;
  }

  try {
    db = await mysql.createConnection({
      host: host,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      connectTimeout: 1000, // 1 second timeout for faster fallback
    });

    await db.execute(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        subject VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    return db;
  } catch (error) {
    console.warn("MySQL connection failed, falling back to local data.", error instanceof Error ? error.message : error);
    connectionFailed = true;
    return null;
  }
}

let cachedContent: any = null;

export async function getContent() {
  if (cachedContent && process.env.NODE_ENV === "production") {
    return cachedContent;
  }

  const contentPath = path.resolve(process.cwd(), "src/content.json");
  let content;
  try {
    content = JSON.parse(fs.readFileSync(contentPath, "utf-8"));
  } catch (e) {
    console.error("Failed to read content.json", e);
    content = {};
  }
  
  const database = await getDb();
  if (database) {
    try {
      const [projects]: any = await database.execute("SELECT * FROM projects");
      const [services]: any = await database.execute("SELECT * FROM services");
      content = { ...content, projects, services };
      // Cache the result including DB data
      cachedContent = content;
    } catch (e) {
      console.error("DB query failed", e);
    }
  }
  
  cachedContent = content;
  return content;
}
