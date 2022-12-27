const express = require("express");
const rootRoute = express.Router();
const userRoute = require("./userRoute");
const homeRoute = require("./homeRoute");
const detailRoute = require("./detailRoute");
const imgMgmtRoute = require("./imgMgmtRoute");
const addImageRoute = require("./addImageRoute");
const userManagementRoute = require("./userMgmtRoute");

rootRoute.use("/user", userRoute);
rootRoute.use("/home", homeRoute);
rootRoute.use("/details", detailRoute);
rootRoute.use("/image-management", imgMgmtRoute);
rootRoute.use("/add-image", addImageRoute);
rootRoute.use("/user/user-management", userManagementRoute);

module.exports = rootRoute;
