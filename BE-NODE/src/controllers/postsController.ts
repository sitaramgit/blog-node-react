import express, { Request, Response } from 'express';
import connectToDatabase from '../connection';
import jwt from 'jsonwebtoken';



export const createPost = async (req: Request, res: Response) => {
    const { title, content } = req.body;

    // Validate the inputs
    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
    }

      // Get the uploaded file
      const file = req.file;

      try {
          // Establish a connection to the database
          const connection = await connectToDatabase();
          const token: any = req.headers.authorization?.split(' ')[1];
          const decoded: any = jwt.decode(token);
          // Insert blog post into the database
          const [result] = await connection.execute(
              'INSERT INTO blogs (title, content, user_id) VALUES (?, ?, ?)', 
              [title, content, decoded.id]
          );
  
          const blogId = (result as any).insertId; // Get the blog ID from the insert result
  
          // Insert file information into the database
          if (file) {
              await connection.execute(
                  'INSERT INTO blog_files (blog_id, file_name, file_path) VALUES (?, ?, ?)',
                  [blogId, file.originalname, file.path]
              );
          }
  
          // Return a success response
          res.status(201).json({
              message: 'Blog post created successfully!',
              blogId,
              fileUploaded: file ? file.originalname : null
          });
      } catch (error) {
          console.error('Error saving blog post:', error);
          res.status(500).json({ error: 'Internal server error' });
      }
}