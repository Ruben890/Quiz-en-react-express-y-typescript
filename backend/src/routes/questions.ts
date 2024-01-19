import { Router } from "express";
import { GetAllQuestionCTR } from "../controllers/question.controller";

const router = Router()
    .get('/', GetAllQuestionCTR)

    
export {router}