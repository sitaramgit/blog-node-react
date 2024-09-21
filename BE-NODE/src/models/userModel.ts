import { RowDataPacket } from 'mysql2/promise';
import connectToDatabase from '../connection';

export interface User extends RowDataPacket {
  id: number;
  username: string;
  password: string;
}

export const findUserByUsername = async (username: string): Promise<User | null> => {
  const connection = await connectToDatabase();
  const [rows] = await connection.query<User[]>(
    'SELECT * FROM users WHERE username = ?',
    [username]
  );
  return rows.length > 0 ? rows[0] : null;
};

export const createUser = async (username: string, password: string) => {
  const connection = await connectToDatabase();
  await connection.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);
};
