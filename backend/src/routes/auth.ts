import Router from "express";
import { loginCtrl, registerCtrl, getMeUserCtrl } from "../controllers/auth.controller";
import veryficToken from "../middlewares/veryficToken";
const router = Router();
router
    .get('/me', veryficToken, getMeUserCtrl)
    .post("/register", registerCtrl)
    .post("/login", loginCtrl);

export { router };




