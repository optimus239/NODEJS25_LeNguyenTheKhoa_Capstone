const express = require("express");
const rootRoute = express.Router();
const userRoute = require("./userRoute");
const homeRoute = require("./homeRoute");

rootRoute.use("/users", userRoute);
rootRoute.use("/home", homeRoute);

module.exports = rootRoute;
