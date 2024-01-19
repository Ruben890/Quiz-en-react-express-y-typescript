import { Option, PrismaClient } from "@prisma/client";

class OptionServices {
    private _prisma: PrismaClient;

    public constructor() {
        this._prisma = new PrismaClient();
    }

    public async ValidateOptions(questionId: number): Promise<boolean> {
        try {
            const validateData = await this._prisma.question.findUnique({
                where: { id: questionId }
            });

            if (!validateData) {
                return false;
            }

            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    public async GetOptionsByQuestionId(questionId: number): Promise<Option[]> {
        try {
            const options = await this._prisma.option.findMany({
                where: { questionId: questionId }
            });

            return options;
        } catch (error) {
            console.error(error);
            throw new Error('Error al obtener las opciones por ID de pregunta.');
        }
    }
}

export default OptionServices;
