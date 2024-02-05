import { PrismaClient, Point } from "@prisma/client";

class PointServices {
    private _prisma: PrismaClient;

    constructor() {
        this._prisma = new PrismaClient();
    }

    public async assignPoint(point: Point) {
        try {
            const user = await this._prisma.user.findUnique({
                where: { id: point.userId }
            });

            if (!user) {
                throw new Error("User not found");
            }

            await this._prisma.point.create({
                data: point
            });

            return "Point assigned successfully";
        } catch (error) {
            console.error("Error assigning point:", error);
            throw new Error("Failed to assign point");
        }
    }
}

export default PointServices;
