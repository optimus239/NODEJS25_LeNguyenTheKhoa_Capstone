const sequelize = require("../models/index");
const init_models = require("../models/init-models");
const model = init_models(sequelize);
const { sucessCode, failCode, errorCode } = require("../config/reponse");
const binh_luan = require("../models/binh_luan");

//GET thông tin ảnh và người tạo ảnh bằng id
const getDetailImageById = async (req, res) => {
  try {
    let { hinh_id } = req.params;
    let checkImage = await model.hinh_anh.findOne({
      where: { hinh_id },
    });
    if (checkImage) {
      let data = await model.hinh_anh.findAll({
        where: { hinh_id },
        include: ["nguoi_dung"],
      });
      sucessCode(res, data, "Lấy dữ liệu thành công");
    } else {
      failCode(res, "Không tìm thấy id ảnh");
    }
  } catch (err) {
    errorCode(res, "Lỗi Backend");
  }
};

//GET thông tin bình luận theo id ảnh
const getDetailCommentById = async (req, res) => {
  try {
    let { hinh_id } = req.params;
    let checkImage = await model.hinh_anh.findOne({
      where: { hinh_id },
    });
    if (checkImage) {
      let data = await model.binh_luan.findAll({
        where: { hinh_id },
      });
      sucessCode(res, data, "Lấy dữ liệu thành công");
    } else {
      failCode(res, "Không tìm thấy id ảnh");
    }
  } catch (err) {
    errorCode(res, "Lỗi Backend");
  }
};

//GET thông tin đã lưu ảnh chưa theo id ảnh
const getSaveImageById = async (req, res) => {
  try {
    let { hinh_id } = req.params;
    let checkImage = await model.hinh_anh.findOne({
      where: { hinh_id },
    });
    if (checkImage) {
      let checkSaveImage = await model.luu_anh.findOne({
        where: {
          hinh_id,
        },
      });
      if (checkSaveImage) {
        sucessCode(res, checkSaveImage, "Ảnh đã được lưu");
      } else {
        sucessCode(res, "Ảnh chưa được lưu");
      }
    } else {
      failCode(res, "Không tìm thấy id ảnh");
    }
  } catch (err) {
    errorCode(res, "Lỗi Backend");
  }
};

//POST lưu thông tin bình luận
const saveComment = async (req, res) => {
  try {
    let { nguoi_dung_id, hinh_id, ngay_binh_luan } = req.body;
    let checkComment = await model.binh_luan.findOne({
      where: {
        nguoi_dung_id,
        hinh_id,
      },
    });
    if (!checkComment) {
      let comment = await model.binh_luan.create({
        nguoi_dung_id,
        hinh_id,
        ngay_binh_luan,
      });
      sucessCode(res, comment, "Bình luận thành công");
    } else {
      let delComment = await model.binh_luan.destroy({
        where: {
          nguoi_dung_id,
          hinh_id,
        },
      });
      sucessCode(res, delComment, "Xóa bình luận");
    }
  } catch (err) {
    errorCode(res, "Lỗi Backend");
  }
};

module.exports = {
  getDetailImageById,
  getDetailCommentById,
  getSaveImageById,
  saveComment,
};
