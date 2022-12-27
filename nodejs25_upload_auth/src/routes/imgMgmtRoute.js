const express = require("express");
const imgMgmtRoute = express.Router();
const {
  getDetailUser,
  listSaveImageByUserId,
  listImageByUserId,
  deleteImage,
} = require("../controllers/imgMgmtController");
const { verifyToken } = require("../middlewares/baseToken");

imgMgmtRoute.get("/users", verifyToken, getDetailUser);
imgMgmtRoute.get(
  "/save-images/:nguoi_dung_id",
  verifyToken,
  listSaveImageByUserId
);
imgMgmtRoute.get("/images/:nguoi_dung_id", verifyToken, listImageByUserId);
imgMgmtRoute.delete("/images/:hinh_id", verifyToken, deleteImage);

module.exports = imgMgmtRoute;
