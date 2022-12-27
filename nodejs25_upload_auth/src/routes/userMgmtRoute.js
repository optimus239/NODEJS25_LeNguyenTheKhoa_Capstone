const express = require("express");
const { updateUser } = require("../controllers/userMgmtController");
const { verifyToken } = require("../middlewares/baseToken");
const userManagementRoute = express.Router();

userManagementRoute.put("/update-user/:nguoi_dung_id", verifyToken, updateUser);

module.exports = userManagementRoute;
