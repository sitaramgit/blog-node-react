import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();


  const connectToDatabase = async () => {
    try {
      const database = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: 3306
      });
  
      console.log('Connected to the MySQL database!');
      return database;
    } catch (err) {
      console.error('Error connecting to the database:', err);
      throw err;
    }
  };
  
  export default connectToDatabase;