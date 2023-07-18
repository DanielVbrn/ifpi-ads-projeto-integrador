import { Router,Request,Response } from "express";
import { saveUser } from "./controller/UserController";


const routes = Router()


routes.get("/", (request:Request, response:Response) => {
    return response.json({message:"Hello!!"})
})

routes.post("/users", saveUser)

export default routes;