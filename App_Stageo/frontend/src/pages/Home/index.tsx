import React from "react"
import "./index.css"
import image from "../../Images/drone_equipments300.png"

const Home: React.FC = () => {
    return (
        <div className="home-page">
            <img src={image} alt="" />
            <h1>Bem vindo</h1>
        </div>
        
    )
}

export default Home;