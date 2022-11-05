
export const errorHandler = (message: string, code: number): never => {
    const error: any = new Error(message);
    error.statusCode = code;
    throw error;
};