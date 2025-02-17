export class Message {
    static unauthorized = { message: "Unauthorized" };

    static dataNotFound(data: string) {
        return { message: `${data} not found` };
    }

    static sendError(error: unknown) {
        return { message: (error as Error).message }
    }
}