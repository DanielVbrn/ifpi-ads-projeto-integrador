import { Router,Request,Response, NextFunction } from "express";
import { saveUser, getUser, login } from "./controller/UserController";
import { auth } from "./middleware/auth"

const routes = Router()


routes.get("/", (request:Request, response:Response) => {
    return response.json({message:"Hello!!"})
})

routes.post("/session", login)

routes.use(auth)

routes.get("/users", getUser)
routes.post("/users", saveUser)

export default routes;