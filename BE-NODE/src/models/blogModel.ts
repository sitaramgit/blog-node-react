import { RowDataPacket } from 'mysql2/promise';
import connectToDatabase from '../connection';

export interface Blog extends RowDataPacket {
  id: number;
  title: string;
  content: string;
  authorId: number;
}

export const getAllBlogs = async (): Promise<Blog[]> => {
  const connection = await connectToDatabase();
  const [rows] = await connection.query<Blog[]>('SELECT * FROM blogs');
  return rows;
};

export const createBlog = async (title: string, content: string, authorId: number) => {
  const connection = await connectToDatabase();
  await connection.query('INSERT INTO blogs (title, content, authorId) VALUES (?, ?, ?)', [title, content, authorId]);
};
