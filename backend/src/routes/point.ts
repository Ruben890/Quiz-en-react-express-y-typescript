import assignPointCTR from "../controllers/Point.controller";
import { Router } from "express";
import verifyToken from "../middlewares/veryficToken";

const router = Router()
    .post('/assignPoint', verifyToken, assignPointCTR)

export {router}