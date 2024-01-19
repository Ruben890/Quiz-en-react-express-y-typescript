import { Response, Request } from "express";
import { Question } from "@prisma/client";
import QuestionService from "../services/Questions.services";


const QuestionsServices = new QuestionService();


export const GetQuestionsByQuizIdCTR = async (req: Request, res: Response): Promise<void> => {
    try {
        const QuizId = Number(req.params.id);

     
        const validationError = await QuestionsServices.ValidateQuiz(QuizId);
        if (!validationError) {
            res.status(404).json({ error: "Questions not fount" });
            return;
        }

        const data: Question[] = await QuestionsServices.GetQuestionsByQuizId(QuizId);
        res.status(200).json(data);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}
