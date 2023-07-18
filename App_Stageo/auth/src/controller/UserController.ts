import { AppDataSource } from '../data-source'
import { Request, Response } from "express"
import { User } from "../entity/User"
import * as bcrypt from "bcrypt"


export const saveUser = async (request:Request, response:Response) => {
    const { name, email, password } = request.body
    const passwordUser = String(password)
    const passwordHash = await bcrypt.hash(passwordUser, 8)

    const user = await AppDataSource.getRepository(User).save({
        name,
        email,
        password:passwordHash
    })

    return response.json(user)
}