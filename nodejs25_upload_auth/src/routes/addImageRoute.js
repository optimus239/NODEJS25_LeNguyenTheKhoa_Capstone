const express = require("express");
const { uploadImage } = require("../controllers/addImageController");
const { upload } = require("../middlewares/upload");
const uploadImageRoute = express.Router();
const { sucessCode, failCode } = require("../config/reponse");
const { verifyToken } = require("../middlewares/baseToken");

uploadImageRoute.post("/upload_base", upload.single("images"), uploadImage);

uploadImageRoute.post(
  "/upload",
  verifyToken,
  upload.single("images"),
  (req, res) => {
    console.log(req.file);
    sucessCode(res, req.file, "Thêm ảnh thành công");
  }
);

module.exports = uploadImageRoute;
