const sequelize = require("../models/index");
const init_models = require("../models/init-models");
const model = init_models(sequelize);
const { sucessCode, failCode, errorCode } = require("../config/reponse");
const { Op } = require("sequelize");

//GET danh sách ảnh
const getImages = async (req, res) => {
  try {
    let data = await model.hinh_anh.findAll();
    sucessCode(res, data, "Lấy danh sách ảnh thành công");
  } catch (err) {
    errorCode(res, "Lỗi Backend");
  }
};

//GET danh sách ảnh theo tên
const getImageByName = async (req, res) => {
  try {
    let params = [];
    let objWhere = {};
    params.keyword = req.query.keyword;

    let data = await model.hinh_anh.findAll({
      where: {
        [Op.or]: [
          {
            ten_hinh: { [Op.like]: "%" + params.keyword + "%" },
          },
        ],
      },
    });
    sucessCode(res, data, "Lấy dữ liệu ảnh thành công");
  } catch (err) {
    errorCode(res, "Lỗi Backend");
  }
};

module.exports = {
  getImages,
  getImageByName,
};
