import * as fs from 'fs';
const bodyParser = require("body-parser");
import express, { Application, Request, Response } from 'express';
import  cors  from 'cors';
import multer from 'multer';
import path from 'path';
import connection from './connection';
import connectToDatabase from './connection';
import authRoutes from './routes/authRoutes';
import blogRoutes from './routes/blogRoutes';
import postsRoutes from './routes/postsRoutes';


const app: Application = express();

// Middleware to parse JSON request body
app.use(express.json()); // for parsing application/json

// Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.resolve('uploads')));

// Middleware to parse URL-encoded request body
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
  origin: ['https://localhost', 'http://localhost:3001'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));
// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });
const port = 3000;
// Configure CORS options if necessary

app.get('/', (req: Request, res: Response) => {
    // console.log(req.h)
  res.send('Hello, TypeScript with Express!');
});




// Test route to fetch data from MySQL using async/await
app.use('/auth', authRoutes);
app.use('/blogs', blogRoutes);
app.use('/posts', postsRoutes);
app.get('/users', async (req: Request, res: Response) => {
    try {
        const connection = await connectToDatabase();  // Await the database connection
        const [rows] = await connection.query('SELECT * FROM users'); // Await the query result
        res.json(rows);  // Send the query result as JSON response
      } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).send('Error fetching users');
      }
  });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});