import { Router } from "express";
import { GetAllQuestionCTR } from "../controllers/question.controller";
import verifyToken from "../middlewares/veryficToken";
const router = Router()
    .get('/',verifyToken, GetAllQuestionCTR)

    
export {router}