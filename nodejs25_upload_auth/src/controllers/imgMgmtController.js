const sequelize = require("../models/index");
const init_models = require("../models/init-models");
const model = init_models(sequelize);
const { sucessCode, failCode, errorCode } = require("../config/reponse");

//GET thông tin user
const getDetailUser = async (req, res) => {
  try {
    let data = await model.nguoi_dung.findAll();
    sucessCode(res, data, "Thông tin người dùng");
  } catch (err) {
    errorCode(res, "Lỗi Backend");
  }
};

//GET danh sách ảnh đã lưu theo userid
const listSaveImageByUserId = async (req, res) => {
  try {
    let { nguoi_dung_id } = req.params;
    let checkUser = await model.nguoi_dung.findOne({
      where: { nguoi_dung_id },
    });
    if (checkUser) {
      let data = await model.luu_anh.findAll({
        where: {
          nguoi_dung_id,
        },
      });
      sucessCode(res, data, "Lấy dữ liệu thành công");
    } else {
      failCode(res, "Không tìm thấy id user");
    }
  } catch (err) {
    errorCode(res, "Lỗi Backend");
  }
};

//GET danh sách ảnh đã tạo theo userid
const listImageByUserId = async (req, res) => {
  try {
    let { nguoi_dung_id } = req.params;
    let checkUser = await model.nguoi_dung.findOne({
      where: { nguoi_dung_id },
    });
    if (checkUser) {
      let data = await model.hinh_anh.findAll({
        where: {
          nguoi_dung_id,
        },
      });
      sucessCode(res, data, "Lấy dữ liệu thành công");
    } else {
      failCode(res, "Không tìm thấy id user");
    }
  } catch (err) {
    errorCode(res, "Lỗi Backend");
  }
};

//DELETE ảnh đã tạo theo id ảnh
const deleteImage = async (req, res) => {
  try {
    let { hinh_id } = req.params;
    let checkImage = await model.hinh_anh.findOne({
      where: {
        hinh_id,
      },
    });
    if (checkImage) {
      let checkImgComment = await model.binh_luan.findOne({
        where: { hinh_id },
      });
      if (checkImgComment) {
        let delImgComment = await model.binh_luan.destroy({
          where: {
            hinh_id,
          },
        });
      }
      let checkSaveImg = await model.luu_anh.findOne({
        where: {
          hinh_id,
        },
      });
      if (checkSaveImg) {
        let delSaveImg = await model.luu_anh.destroy({
          where: {
            hinh_id,
          },
        });
      }
      let delImage = await model.hinh_anh.destroy({
        where: { hinh_id },
      });
      sucessCode(res, delImage, "Đã xóa ảnh");
    } else {
      failCode(res, "Ảnh không tồn tại");
    }
  } catch (err) {
    errorCode(res, "Lỗi Backend");
  }
};

module.exports = {
  getDetailUser,
  listSaveImageByUserId,
  listImageByUserId,
  deleteImage,
};
