import "dotenv/config";
import express from "express";
import cors from "cors";
import { router } from "./routes";
import helmet from "helmet";
import morgan from "morgan";
import session from "express-session";



const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors({
    origin: ['http://localhost:5173', '*'], // Allowing requests from this origin
    optionsSuccessStatus: 200
}));

app.use(session({
    name: 'Quiz', // Setting the session name
    secret: process.env.SESSION_SECRET || '',// Setting the session secret from environment variables
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Disabling secure cookies for now
        httpOnly: true,
        // domain: 'example.com',
        // path: 'foo/bar',
        maxAge: 1000 * 60 * 15 // Setting the session max age to 15 minutes
    }
}))



app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan('dev'))
app.use(express.json());
app.use(router);
app.listen(PORT, () => console.log(`Listo por el puerto ${PORT}`));