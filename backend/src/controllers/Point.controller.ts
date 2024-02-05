import { Request, Response } from "express";
import { Points } from "@prisma/client";
import PointServices from "../services/Point.services";

const pointServices = new PointServices();

const assignPointCTR = async (req: Request, res: Response) => {
    try {
        const data: Points = req.body;
   
        if (!data) {
            return res.status(400).json({ error: "No data provided" });
        }

        const result = await pointServices.assignPoint(data);

        return res.status(200).json({ message: result });
    } catch (error) {
        console.error("Error assigning point:", error);
        return res.status(500).json({ error: "Failed to assign point" });
    }
};

export default assignPointCTR;
