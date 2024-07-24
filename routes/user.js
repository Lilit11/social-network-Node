const express = require("express");
const auth = require("../middleware/auth");
const { handleRegistration, handleLogin } = require("../controllers/user");
const {
  getUserById,
  getAllUsers,
  deleteUser,
  updateUser,
} = require("../config/db");

const registerRouter = express.Router();
const loginRouter = express.Router();
const profileRouter = express.Router();
const userRouter = express.Router();

registerRouter.get("/", (req, res) => {
  handleRegistration(req, res);
});

loginRouter.post("/", (req, res) => {
  handleLogin(req, res);
});

profileRouter.get("/", auth, (req, res) => {
  res
    .status(200)
    .send(`Welcome to your personal account dear ${req.user.name}`);
});

userRouter.get("/", async (req, res) => {
  const users = await getAllUsers();
  res.status(200).send(users);
});

userRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const user = await getUserById(id);
  if (!user) {
    return res.status(400).json({ message: "Invalid ID" });
  }
  res.status(200).send(user);
});

userRouter.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { name, email } = req.body;

  const user = await getUserById(id);
  if (!user) {
    return res.status(400).json({ message: "Invalid ID" });
  }
  updateUser(id, name, email);
  res.status(200).json({ message: "User's info is updated" });
});

userRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const user = await getUserById(id);
  if (!user) {
    return res.status(400).json({ message: "Invalid ID" });
  }
  deleteUser(id);
  res.status(200).json({ message: "User successfully deleted" });
});

module.exports = {
  registerRouter,
  loginRouter,
  profileRouter,
  userRouter,
};
