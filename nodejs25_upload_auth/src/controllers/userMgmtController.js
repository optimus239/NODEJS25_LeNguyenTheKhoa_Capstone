const sequelize = require("../models/index");
const init_models = require("../models/init-models");
const model = init_models(sequelize);
const { sucessCode, failCode, errorCode } = require("../config/reponse");

//PUT thông tin cá nhân của user
const updateUser = async (req, res) => {
  try {
    let { nguoi_dung_id } = req.params;
    let { email, mat_khau, ho_ten, tuoi } = req.body;
    let checkUser = await model.nguoi_dung.findOne({
      where: { nguoi_dung_id },
    });
    if (checkUser) {
      await model.nguoi_dung.update(
        {
          email,
          mat_khau,
          ho_ten,
          tuoi,
        },
        {
          where: {
            nguoi_dung_id,
          },
        }
      );
      sucessCode(res, checkUser, "Update thành công");
    } else {
      failCode(res, nguoi_dung_id, "User không tồn tại");
    }
  } catch (err) {
    errorCode(res, "Lỗi Backend");
  }
};

module.exports = { updateUser };
