import { Router } from "express";
import { GetQuestionsByQuizIdCTR } from "../controllers/question.controller";
import verifyToken from "../middlewares/veryficToken";
const router = Router()
    .get('/:id',verifyToken,GetQuestionsByQuizIdCTR )

    
export {router}