import { Router,Request,Response, NextFunction } from "express";
import { UserController} from "./controller/UserController";
import { auth } from "./middleware/auth"

const routes = Router()


routes.get("/", (request:Request, response:Response) => {
    return response.json({message:"Hello!!"})
})

routes.post("/session", UserController.login)

routes.use(auth)

routes.get("/users", UserController.getUser)
routes.post("/users", UserController.saveUser)
routes.delete("/users/:id", UserController.deleteUser)

export default routes;