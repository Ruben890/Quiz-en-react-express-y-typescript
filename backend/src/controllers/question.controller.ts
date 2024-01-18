import { Response, Request } from "express";
import { Question } from "@prisma/client";
import CrudService from "../utils/crudServices";


const QuestionCrud = new CrudService('question');

export const GetAllQuestionCTR = async (req: Request, res: Response) => {
    try {
        const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
        const pageSize = 10;
        const skip = (page - 1) * pageSize;

        const data: Question[] = await QuestionCrud.getAll({ skip, take: pageSize });
        return res.status(200).json(data);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }

}


