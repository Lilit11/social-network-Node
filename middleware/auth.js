require("dotenv").config();
const jwt = require("jsonwebtoken");
const { getUserByLogin } = require("../config/db");
const SECRET_KEY = process.env.SECRET_KEY;

const auth  =   async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(400).json({ message: "Token Required!" });
  }
  const token = authHeader.split(" ")[1];
  const data = jwt.verify(token, SECRET_KEY, (err, data) => {
    if (err) {
      return res.status(400).json({ message: "Invalid Token!" });
    }
    return data
  });
  const found = await getUserByLogin(data.login)
  if(found){
    req.user = found
    next()
  }
};

module.exports = auth

