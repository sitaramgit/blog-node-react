import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { findUserByUsername, createUser } from '../models/userModel';
import { OAuth2Client } from 'google-auth-library';
import connectToDatabase from '../connection';
import { generateRandomPassword, generateToken } from '../common/commonFunctions';
import { OkPacket, RowDataPacket } from 'mysql2/promise';

const oAuth2Client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    'postmessage',
);

export const register = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await createUser(username, hashedPassword);
    res.status(201).json({ message: 'User registered' });
};

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = await findUserByUsername(username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token });
};

export const googleLogin = async (req: Request, res: Response) => {
    try {

        const { tokens }: any = await oAuth2Client.getToken(req.body.code);
        const googleToken: any = jwt.decode(tokens.id_token);

        try {
            const connection = await connectToDatabase();  // Await the database connection
            const [rows] = await connection.query<RowDataPacket[]>('SELECT * FROM users WHERE email = ?', [googleToken.email]); // Await the query result

            // Check if any rows are returned
            if (rows.length > 0) {
                try {
                    connection.query('UPDATE users SET token = ? WHERE id = ?', [tokens.id_token, rows[0].id]);
                    const userData = rows[0];
                    res.status(200).json(
                        {
                            id: userData.id,
                            firstName: userData.firstName,
                            lastName: userData.lastName,
                            socialPicture: userData.socialPicture,
                            isSocialUser: userData.isSocialUser,
                            token: generateToken(userData.id, userData.email)
                        }
                    );
                } catch (error: any) {
                    console.error('Error updating user token: ', error);
                    res.status(500).json({
                        success: false,
                        message: 'Error updating user token',
                        error: error.message
                    });
                    return;
                }

            } else {
                const payload = {
                    firstName: googleToken.given_name,
                    lastName: googleToken.family_name,
                    email: googleToken.email,
                    socialName: googleToken.name,
                    socialPicture: googleToken.picture,
                    token: tokens.id_token,
                    isSocialUser: true,
                    password: generateRandomPassword(5)
                };

                try {
                    const [result] = await connection.query<OkPacket>('INSERT INTO users SET ?', payload);
                    res.status(200).json(
                        {
                            id: result.insertId,
                            firstName: googleToken.given_name,
                            lastName: googleToken.family_name,
                            socialPicture: googleToken.socialPicture,
                            isSocialUser: 1,
                            token: generateToken(result.insertId, googleToken.email)
                        }
                    );
                } catch (insertErr: any) {
                    console.error('Error creating user: ', insertErr);
                    res.status(500).json({
                        success: false,
                        message: 'Error creating user',
                        error: insertErr.message
                    });
                    return
                }
            }
        } catch (err) {
            console.error('Error checking user: ', err);
            res.status(500).json({
                success: false,
                body: req.body,
                message: 'Error checking user',
                error: err instanceof Error ? err.message : 'db error'
            });
            return
        }

    } catch (error: any) {
        console.error('Google authentication issue: ', error);
        res.status(400).json({
            success: false,
            message: 'Google authentication issue',
            error: error.message
        });
        return
    }
};
