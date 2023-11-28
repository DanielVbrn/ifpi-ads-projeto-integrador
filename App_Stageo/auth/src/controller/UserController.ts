import { AppDataSource } from '../data-source'
import { Request, Response } from "express"
import { User } from "../entity/User"
import * as bcrypt from "bcrypt"

export class UserController {
    static login = async (request: Request, response: Response) => {
        const { email, password } = request.body;
        const user = await AppDataSource.getRepository(User).find({
            where: {
                email
            }
        });

        if (user.length === 1) {
            if (await bcrypt.compare(password, user[0].password)) {
                const data = {
                    id: user[0].id,
                    name: user[0].name,
                    email: user[0].email
                };

                return response.json(data);
            } else {
                return response.status(404).json({ message: "Usuário não encontrado." });
            }
        } else {
            return response.status(404).json({ message: "Usuário não encontrado." });
        }
    }

    static getUser = async (request: Request, response: Response) => {
        const user = await AppDataSource.getRepository(User).find();
        return response.json(user);
    }

    static saveUser = async (request: Request, response: Response) => {
        const { name, email, password } = request.body;
        const passwordUser = String(password);
        const passwordHash = await bcrypt.hash(passwordUser, 8);

        const user = await AppDataSource.getRepository(User).save({
            name,
            email,
            password: passwordHash
        });

        return response.json(user);
    }

    static deleteUser = async (request: Request, response: Response) => {
        const { id } = request.params;
        const idUser = Number(id);

        const removeUser = await AppDataSource.getRepository(User).delete(idUser);
        return response.json(removeUser).status(200);
    }
}
