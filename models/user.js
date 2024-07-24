const bodyParser = require("body-parser");
const express = require("express");
express().use(bodyParser.json());
const bcrypt = require("bcryptjs");
const { getUserByLogin } = require("../config/db");

const valitadeRegistration = async (req, res) => {
  const { name, email, login, password } = req.body;
  if (!name || !email || !login || !password) {
    return res.status(400).json({ message: "Please provide full information" });
  }

  const emailchecker = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailchecker.test(email)) {
    return res.status(400).json({ message: "Please provide valid email" });
  }

  const found = await getUserByLogin(login);
  if (found) {
    return { error: "That login is already used, try another one!" };
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { name, email, login, hashedPassword };
    return user;
  } catch (err) {
    console.error("Error hashing password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const valitadeLogin = async (req, res) => {
  const { login, password } = req.body;
  if (!login || !password) {
    return res.status(400).json({ message: "Please provide full information" });
  }
  const found = await getUserByLogin(login)
  if(!found){
    return res.status(400).json({ message: "Invalid Login" });
  }
   const validPass = bcrypt.compareSync(password, found.hashedPassword)  
   if(!validPass){
    return res.status(400).json({ message: "Login and password doesnt match" });
   }
    return found

};

module.exports = {
  valitadeRegistration,
  valitadeLogin,
};
