const express = require("express");
const detailsRoute = express.Router();
const {
  getDetailImageById,
  getDetailCommentById,
  getSaveImageById,
  saveComment,
} = require("../controllers/detailController");
const { verifyToken } = require("../middlewares/baseToken");

detailsRoute.get("/image/:hinh_id", verifyToken, getDetailImageById);
detailsRoute.get("/comments/:hinh_id", verifyToken, getDetailCommentById);
detailsRoute.get("/image/save/:hinh_id", verifyToken, getSaveImageById);
detailsRoute.post("/image/comment", verifyToken, saveComment);

module.exports = detailsRoute;
