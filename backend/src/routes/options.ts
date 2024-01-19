import { Router } from "express";
import { GetOptionsByQuestionIdCTR } from "../controllers/options.controller";
import verifyToken from "../middlewares/veryficToken";
const router = Router()
    .get('/:id',verifyToken, GetOptionsByQuestionIdCTR)


export { router }