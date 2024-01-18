import { Response, Request } from "express";
import { Option } from "@prisma/client";
import CrudService from "../utils/crudServices";

const OptionService = new CrudService('option');


export const GetAllOptionsCTR = async (req: Request, res: Response) => {
    try {
        const page = req.query.page ? parseInt(req.query.page as string, 10) : 0;
        const pageSize = 10;
        const skip = (page - 1) * pageSize;
        const data: Option[] = await OptionService.getAll({ skip, take: pageSize });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "internal servr" });
    }
}