import "./config/env"
import "reflect-metadata"
import * as express from "express"
import { AppDataSource } from "./data-source"
import  routes from "./routes"


const app = express()


AppDataSource.initialize().then(() => {
    console.log("Data Source has been initialized!")
    console.log("Server is running in port 3330 || http://localhost:3330")
})
.catch((err) => {
    console.error("Error during Data Source initialization", err)
})

app.use(express.json())
app.use(routes)
app.listen(3330)
