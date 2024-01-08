import { PrismaClient, Prisma,  } from "@prisma/client";

class CrudService {
    private model: keyof PrismaClient;
    private prisma: PrismaClient;

    constructor(modelName: keyof PrismaClient) {
        this.model = modelName;
        this.prisma = new PrismaClient();
    }

    async getAll(paginationOptions?: { skip: number; take: number }): Promise<any[]> {
        try {
            const data = await (this.prisma[this.model] as any).findMany({
                ...paginationOptions,
            });
            return data;
        } catch (error) {
            console.error(error);
            throw new Error("Internal Server Error");
        }
    }

    async getOne(id: number): Promise<any | null> {
        try {
            const data = await (this.prisma[this.model] as any).findUnique({
                where: { id: id },
            });
            return data;
        } catch (error) {
            console.error(error);
            throw new Error("Internal Server Error");
        }
    }

    async create(newData: any): Promise<any> {
        try {
            const createdData = await (this.prisma[this.model] as any).create({
                data: newData,
            });
            return createdData;
        } catch (error) {
            console.error(error);
            throw new Error("Internal Server Error");
        }
    }

    async update(id: number, updatedData: any): Promise<any | null> {
        try {
            const data = await (this.prisma[this.model] as any ).update({
                where: { id: id },
                data: updatedData,
            });
            return data;
        } catch (error) {
            console.error(error);
            throw new Error("Internal Server Error");
        }
    }

    async delete(id: number): Promise<void> {
        try {
            await (this.prisma[this.model] as any).delete({
                where: { id: id },
            });
        } catch (error) {
            console.error(error);
            throw new Error("Internal Server Error");
        }
    }
}

export default CrudService;
