import * as fs from 'fs';
const bodyParser = require("body-parser");
import express, { Request, Response } from 'express';
import connection from './connection';
import connectToDatabase from './connection';
import authRoutes from './routes/authRoutes';
import blogRoutes from './routes/blogRoutes';


const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
    // console.log(req.h)
  res.send('Hello, TypeScript with Express!');
});

// Test route to fetch data from MySQL using async/await
app.use('/auth', authRoutes);
app.use('/blogs', blogRoutes);
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