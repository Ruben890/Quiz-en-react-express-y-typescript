import { Request, Response } from "express";
import auth from "../utils/auth";
import { User } from "@prisma/client";
import jwt, { Secret, GetPublicKeyOrSecret, JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { TokenSession } from "../interfaces/CustomSession";
import { use } from "passport";


interface AuthUser {
    email: string;
    password: string;
}


export const loginCtrl = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    const { email, password }: AuthUser = req.body;

    try {
        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        const authResult = await auth.login(email, password);

        if (authResult.token) {
            // Utiliza tu interfaz personalizada CustomSession para agregar la propiedad 'token'
            const customSession = req.session as TokenSession;
            customSession.token = authResult.token;
            return res.status(200).json({ message: 'User authenticated successfully', token: customSession.token });
        }

        if (authResult.error) {
            return res.status(401).json({ error: authResult.error });
        }

        return res.status(500).json({ error: 'Unexpected error during authentication' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const registerCtrl = async (req: Request, res: Response) => {
    const data: User = req.body

    if (!data) {
        res.status(400).json({ error: 'User data is required' });
        return;
    }

    try {
        // Registrar a un nuevo usuario utilizando el servicio de autenticación
        const result = await auth.register(data);
        // Si el registro es exitoso, devuelve un mensaje de éxito
        res.status(200).json({ message: result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const getMeUserCtrl = async (req: Request, res: Response) => {
    const customSession = req.session as TokenSession;
    const token = customSession.token || req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized - Token not provided' });
    }

    try {
        // Verificar y decodificar el token
        const jwtSecret: Secret | GetPublicKeyOrSecret = process.env.JWT_SECRET || '';
        const decodedToken = await jwt.verify(token, jwtSecret) as { id: number };

        // Verificar si el token es válido
        if (!decodedToken) {
            return res.status(401).json({ error: 'Unauthorized - Invalid token' });
        }

        const user = await auth.getUserById(decodedToken.id);

        if (user) {
            return res.status(200).json({ isLogin: true, user });
        }
    } catch (error) {
        console.log(error)
        // Manejar errores específicos
        if (error instanceof JsonWebTokenError) {
            return res.status(401).json({ error: 'Unauthorized - Invalid token', });
        } else if (error instanceof TokenExpiredError) {
            return res.status(401).json({ error: 'Unauthorized - Token expired' });
        }

        res.status(500).json({ error: 'Internal Server Error' });
    }
};
