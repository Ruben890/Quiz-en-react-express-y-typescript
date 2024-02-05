import { PrismaClient, Question } from "@prisma/client";


class QuestionService {
    private _prisma: PrismaClient;

    public constructor() {
        this._prisma = new PrismaClient();
    }


    public async ValidateQuiz(quizId: number): Promise<boolean> {
        try {
            const quiz = await this._prisma.quiz.findUnique({
                where: { id: quizId },
            });

            if (!quiz) {
                return false;
            }

            return true;
        } catch (error) {
            console.error("Error al validar el quiz:", error);
            throw new Error("Error al validar el quiz");
        } finally {
            await this._prisma.$disconnect();
        }
    }

    public async GetQuestionsByQuizId(quizId: number): Promise<Question[]> {
        try {
            const questions = await this._prisma.question.findMany({
                where: { quizId },
            });
            return questions;
        } catch (error) {
            console.error("Error al obtener las preguntas por ID de quiz:", error);
            throw new Error("Error al obtener las preguntas por ID de quiz");
        } finally {
            await this._prisma.$disconnect();
        }
    }


}

export default QuestionService;
