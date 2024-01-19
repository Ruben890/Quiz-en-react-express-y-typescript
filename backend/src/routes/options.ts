import { Router } from "express";
import { GetAllOptionsCTR } from "../controllers/options.controller";
const router = Router()
    .get('/', GetAllOptionsCTR)


export { router }