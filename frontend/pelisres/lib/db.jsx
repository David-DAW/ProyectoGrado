import mysql from 'mysql2/promise';

let pool;

export default async function getConnection() {
  if (!pool) {
    pool = mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: 'Skul211',
      database: 'pelisres',
      port: '3307'
    });
  }
  return pool;
}
