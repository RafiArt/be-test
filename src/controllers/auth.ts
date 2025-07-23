import { Request, Response } from 'express';
import { generateToken } from '../services/auth';

export const login = (req: Request, res: Response) => {
    // In a real app, you would validate credentials here
    const { userId } = req.body;
    
    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    const token = generateToken(userId);
    res.json({ token });
};