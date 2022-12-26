const express = require("express");
const rootRoute = express.Router();
const userRoute = require("./userRoute");
const homeRoute = require("./homeRoute");
const detailRoute = require("./detailRoute");
const imgMgmtRoute = require("./imgMgmtRoute");

rootRoute.use("/users", userRoute);
rootRoute.use("/home", homeRoute);
rootRoute.use("/details", detailRoute);
rootRoute.use("/image-management", imgMgmtRoute);

module.exports = rootRoute;
