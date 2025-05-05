import mysql from 'mysql2/promise';

let pool;

// Crea el pool de conexiones solo una vez
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
