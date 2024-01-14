import { Response, Request } from "express";
import { Quiz } from "@prisma/client";
import CrudService from "../utils/crudServices";



// Create an instance of the service to manage quizzes
const QuizCrudService = new CrudService('quiz');


export const createQuizCTR = async (req: Request, res: Response) => {
    try {
        const quizData: Quiz = req.body;



        await QuizCrudService.create(quizData);

        return res.status(201).json({ message: 'Quiz created successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};


export const getAllQuizzesCTR = async (req: Request, res: Response) => {
    try {
        const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
        const pageSize = 10;
        const skip = (page - 1) * pageSize;

        const data: Quiz[] = await QuizCrudService.getAll({ skip, take: pageSize });
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};



export const getOneQuizCTR = async (req: Request, res: Response) => {
    const idQuiz: number = Number(req.params.id);

    // Check if idQuiz is a valid number
    if (isNaN(idQuiz)) {
        return res.status(400).json({ error: "Invalid id provided" })
    }

    try {
        const data = await QuizCrudService.getOne(idQuiz);
        return res.status(200).json(data);
    } catch (error) {
        console.error("Error in getOneQuiz:", error);
        return res.status(500).json({ error: "Internal server error" })
    }
};

export const updateQuizCTR = async (req: Request, res: Response) => {
    try {
        const idQuiz: number = Number(req.params.id); 
        const quizData: Quiz = req.body as Quiz;

        if (isNaN(idQuiz) || quizData === null) {
            return res.status(400).json({ error: "Invalid id or data provided" });
        }

        await QuizCrudService.update(idQuiz, quizData);

        res.status(200).json({ success: true, message: "Quiz updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};