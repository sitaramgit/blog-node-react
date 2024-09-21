import { Request, Response } from 'express';
import { getAllBlogs, createBlog } from '../models/blogModel';

export const getBlogs = async (req: Request, res: Response) => {
  const blogs = await getAllBlogs();
  res.json(blogs);
};

export const createNewBlog = async (req: Request | any, res: Response) => {
  const { title, content } = req.body;
  const authorId = req.user?.id; // Requires JWT authentication middleware
  await createBlog(title, content, authorId);
  res.status(201).json({ message: 'Blog created' });
};
