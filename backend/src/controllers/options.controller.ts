import { Response, Request } from "express";
import { Option } from "@prisma/client";
import OptionServices from "../services/Options.services";

const OptionService = new OptionServices();


export const GetOptionsByQuestionIdCTR = async (req: Request, res: Response): Promise<void> => {
    try {
        const questionId = Number(req.params.id)
        const validateQuestion = await OptionService.ValidateOptions(questionId);
        if (!validateQuestion) {
            res.status(404).json({ error: "Options not fount" });
            return;
        }

        const data: Option[] = await OptionService.GetOptionsByQuestionId(questionId);
        res.status(200).json(data);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
}