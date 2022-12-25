const express = require("express");
const userRoute = express.Router();
const { signUp, logIn } = require("../controllers/userController");

userRoute.post("/signup", signUp);
userRoute.post("/login", logIn);

module.exports = userRoute;
