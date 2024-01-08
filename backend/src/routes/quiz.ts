import { Router } from "express";
import { getAllQuizzesCTR, createQuizCTR, getOneQuizCTR } from "../controllers/quiz.controller";
import verifyToken from "../middlewares/veryficToken";
const router = Router();

router
    .get('/', getAllQuizzesCTR)
    .get('/:id', verifyToken, getOneQuizCTR)
    .post('/createQuiz', verifyToken, createQuizCTR)
export { router };