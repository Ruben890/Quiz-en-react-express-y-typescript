import { Router } from "express";
import { getAllQuizzesCTR, createQuizCTR, getOneQuizCTR, updateQuizCTR } from "../controllers/quiz.controller";
import verifyToken from "../middlewares/veryficToken";
const router = Router();



router
    .get('/', getAllQuizzesCTR)
    .get('/:id', verifyToken, getOneQuizCTR)
    .post('/createQuiz', verifyToken, createQuizCTR)
    .put('/updateQUiz/:id', verifyToken, updateQuizCTR)
export { router };