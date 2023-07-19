import axios from "axios"


const apiAuth = axios.create({
    baseURL: "http://localhost:3330",   
})

export default apiAuth;