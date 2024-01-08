import { Request, Response, NextFunction } from 'express';
import jwt, { Secret, GetPublicKeyOrSecret, JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { TokenSession } from '../interfaces/CustomSession';

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const customSession = req.session as TokenSession;
    const token = customSession.token || req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized - Token not provided' });
    }

    try {
        // Verificar y decodificar el token
        const jwtSecret: Secret | GetPublicKeyOrSecret = process.env.JWT_SECRET || '';
        const decodedToken = await jwt.verify(token, jwtSecret);

        // Verificar si el token es válido
        if (!decodedToken) {
            return res.status(401).json({ error: 'Unauthorized - Invalid token'});
        }

        
        next();
    } catch (error) {
        console.error(error);

        // Manejar errores específicos
        if (error instanceof JsonWebTokenError) {
            return res.status(401).json({ error: 'Unauthorized - Invalid token' });
        } else if (error instanceof TokenExpiredError) {
            return res.status(401).json({ error: 'Unauthorized - Token expired' });
        }

        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default verifyToken;
