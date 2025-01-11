import bcrypt from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
    const salt = parseInt(process.env.SALT || "10", 10);
    try {
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        throw new Error("Error hashing password");
    }
}