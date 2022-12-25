const sequelize = require("../models/index");
const init_models = require("../models/init-models");
const model = init_models(sequelize);
const { sucessCode, failCode, errorCode } = require("../config/reponse");
const { parseToken } = require("../middlewares/baseToken");
const bcrypt = require("bcrypt");

//đăng ký
const signUp = async (req, res) => {
  try {
    let { email, mat_khau, ho_ten, tuoi, anh_dai_dien } = req.body;
    let matKhauHash = bcrypt.hashSync(mat_khau, 10);
    let checkEmail = await model.nguoi_dung.findOne({
      where: {
        email,
      },
    });
    if (checkEmail) {
      failCode(res, "", "Email đã tồn tại!");
    } else {
      let data = await model.nguoi_dung.create({
        email,
        mat_khau: matKhauHash,
        ho_ten,
        tuoi,
        anh_dai_dien,
      });
      sucessCode(res, data, "Đăng ký thành công!");
    }
  } catch (err) {
    errorCode(res, "Lỗi Backend");
  }
};

//đăng nhập
const logIn = async (req, res) => {
  try {
    let { email, mat_khau } = req.body;
    let checkLogin = await model.nguoi_dung.findOne({
      where: {
        email,
      },
    });
    if (checkLogin) {
      let checkPass = bcrypt.compareSync(mat_khau, checkLogin.mat_khau);
      if (checkPass) {
        sucessCode(res, parseToken(checkLogin), "Login thành công");
      } else {
        failCode(res, "", "Mật khẩu không đúng!");
      }
    } else {
      failCode(res, { email, mat_khau }, "Email không đúng !");
    }
  } catch (err) {
    errorCode(res, "Lỗi Backend");
  }
};

module.exports = {
  signUp,
  logIn,
};
