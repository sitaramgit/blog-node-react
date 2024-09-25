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
            console.log(file)
            await connection.execute(
                'INSERT INTO blog_files (blog_id, file_name, file_path) VALUES (?, ?, ?)',
                [blogId, file.originalname, file.filename]
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

export const getAllPosts = async (req: Request, res: Response) => {
    try {
        // Establish a connection to the database
        const connection = await connectToDatabase();

        // Get the full server URL dynamically using the request object
        const serverURL = `${req.protocol}://${req.get('host')}/uploads/`;
        // Query to fetch all blogs, users, and associated files
        const [postsWithFiles] = await connection.query(
            `SELECT b.id AS blog_id, b.title, b.content, b.created_at, b.updated_at, 
            u.id AS user_id, u.firstName, u.lastName, u.email, 
            f.id AS file_id, f.file_name, CONCAT('${serverURL}', f.file_path) AS file_url 
            FROM blogs b INNER JOIN users u ON b.user_id = u.id 
            LEFT JOIN blog_files f ON b.id = f.blog_id 
            ORDER BY b.created_at`
        );

    

        // Return the result
        res.status(200).json({
            message: 'Posts fetched successfully',
            blogs: postsWithFiles
        });
    } catch (error) {
        console.error('Error fetching blogs:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}