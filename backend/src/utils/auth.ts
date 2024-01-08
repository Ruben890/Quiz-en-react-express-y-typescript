import { PrismaClient, User } from "@prisma/client";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

/**
 * Servicio de Autenticación.
 * Proporciona funcionalidades relacionadas con la autenticación y gestión de usuarios.
 */
class AuthService {
    private static instance: AuthService;
    private prisma: PrismaClient;

    /**
     * Constructor privado que inicializa una instancia de PrismaClient.
     * No se debe utilizar directamente, en su lugar, utiliza el método estático getInstance().
     */
    private constructor() {
        this.prisma = new PrismaClient();
    }

    /**
     * Método estático que devuelve una instancia única del AuthService utilizando el patrón Singleton.
     * @returns Instancia única del AuthService.
     */
    static getInstance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    /**
     * Genera un token JWT con la información del usuario.
     * @param userId - ID del usuario.
     * @returns Token JWT generado.
     */
    private generateToken(userId: number): string {
        const token = jwt.sign({ id: userId }, process.env.JWT_SECRET || '', { expiresIn: '1h' });
        return token;
    }


    /**
     * Autentica a un usuario verificando las credenciales proporcionadas.
     * @param email - Correo electrónico del usuario.
     * @param password - Contraseña del usuario.
     * @returns Mensaje que indica el resultado de la autenticación.
     */
    async login(email: string, password: string): Promise<{ error?: string; token?: string }> {
        if (!email || !password) {
            return { error: 'Email and password are required' };
        }

        try {
            // Busca al usuario por correo electrónico
            const user = await this.prisma.user.findUnique({
                where: { email: email },
            });

            // Si el usuario no existe, devuelve un mensaje
            if (!user) {
                return { error: 'Email not found' };
            }

            // Compara la contraseña proporcionada con la contraseña almacenada
            const isPasswordValid = await bcrypt.compare(password, user.password);

            // Si la contraseña no es válida, devuelve un mensaje
            if (!isPasswordValid) {
                return { error: 'Invalid password' };
            }

            // Si todo está bien, devuelve un mensaje de autenticación y el token JWT
            const token = this.generateToken(user.id);
            return { token };
        } catch (err) {
            console.error(err);
            return { error: 'Error during authentication' };
        }
    }


    /**
     * Registra a un nuevo usuario en la aplicación.
     * @param user - Objeto que contiene la información del nuevo usuario.
     * @returns Mensaje que indica el resultado del registro.
     */
    async register(user: User): Promise<string> {
        try {
            // Hashea la contraseña antes de almacenarla en la base de datos
            const hashedPassword = await bcrypt.hash(user.password, 10);

            // Crea un nuevo usuario en la base de datos
            await this.prisma.user.create({
                data: { ...user, password: hashedPassword },
            });

            // Devuelve un mensaje de éxito
            return 'User registered successfully'
        } catch (err) {
            console.error(err);
            return 'Error during user registration'
        }
    }

    /**
     * Obtiene la información de un usuario por su ID.
     * @param userId - ID del usuario.
     * @returns Promesa que resuelve en un objeto User o null si el usuario no existe.
     */
    async getUserById(userId: number): Promise<User | null> {
        try {
            // Busca al usuario por su ID
            const user = await this.prisma.user.findUnique({
                where: { id: userId },
            });

            // Devuelve el usuario o null si no se encuentra
            return user;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
}

// Exporta una instancia única del AuthService
export default AuthService.getInstance();
