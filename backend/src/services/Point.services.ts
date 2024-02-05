import { PrismaClient, Points } from "@prisma/client";

class PointServices {
    private _prisma: PrismaClient;

    constructor() {
        this._prisma = new PrismaClient();
    }

    public async assignPoint(point: Points) {
        try {
            const user = await this._prisma.user.findUnique({
                where: { id: point.userId }
            });

            if (!user) {
                throw new Error("User not found");
            }

            await this._prisma.points.create({
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
