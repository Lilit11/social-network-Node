require('dotenv').config()
const {addUser} = require("../config/db");
const {valitadeRegistration, valitadeLogin }= require("../models/user");
const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.SECRET_KEY
const handleRegistration = async (req, res) => {
   
        const result = await valitadeRegistration(req, res);
       
        if(result.error){
            return res.status(400).json({ message: result.error });
        }
        try{
            await addUser(result);
            res.status(201).json({ message: "User successfully registered" });
        } catch (err) {
            console.error("Error during registration:", err.message);
            res.status(500).json({ message: "Internal server error" });
        }

}

const handleLogin = async(req, res)=>{
    const result = await valitadeLogin(req, res);
    const token = jwt.sign(result.login, SECRET_KEY, {expiresIn:60*60})
    res.status(200).send(token)
}
module.exports= {handleRegistration, handleLogin}

