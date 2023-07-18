import "reflect-metadata"
import * as express from "express"
import * as bodyParser from "body-parser"
import { AppDataSource } from "./data-source"
import  routes from "./routes"
import { User } from "./entity/User"


const app = express()


AppDataSource.initialize().then(() => {
    console.log("Data Source has been initialized!")
    console.log("Server is running in port 3333 || http://localhost:3333")
})
.catch((err) => {
    console.error("Error during Data Source initialization", err)
})

app.use(express.json())
app.use(routes)
app.listen(3333)