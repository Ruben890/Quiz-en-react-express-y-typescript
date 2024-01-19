import { Router } from "express";
import { GetAllOptionsCTR } from "../controllers/options.controller";
import verifyToken from "../middlewares/veryficToken";
const router = Router()
    .get('/', verifyToken, GetAllOptionsCTR)


export { router }