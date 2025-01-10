import { AppDataSource } from "../config/db";
import { User } from "../models/postgresql/User";

export class UserService {
    private static userRepository = AppDataSource.getRepository(User);

    static async getAllUsers() {
        return this.userRepository.find();
    }

    static async getUserById(id: number) {
        return this.userRepository.findOneBy({ id });
    }

    static async createUser(userData: Partial<User>) {
        const user = this.userRepository.create(userData);
        return this.userRepository.save(user);
    }

    static async updateUser(id: number, updates: Partial<User>) {
        await this.userRepository.update(id, updates);
        return this.getUserById(id);
    }

    static async deleteUser(id: number) {
        const result = await this.userRepository.delete(id);
        return result.affected! > 0;
    }
}