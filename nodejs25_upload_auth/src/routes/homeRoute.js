const express = require("express");
const homeRoute = express.Router();
const { getImages, getImageByName } = require("../controllers/homeController");
const { verifyToken } = require("../middlewares/baseToken");

homeRoute.get("/images", verifyToken, getImages);
homeRoute.get("/images/search", verifyToken, getImageByName);

module.exports = homeRoute;
