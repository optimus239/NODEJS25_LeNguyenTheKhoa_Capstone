const { failCode } = require("../config/reponse");

//POST thêm ảnh của user
const uploadImage = async (req, res) => {
  const fs = require("fs");

  if (req.file.size >= 400000) {
    fs.unlinkSync(process.cwd() + "/public/img" + req.file.filename);
    res.send("Chỉ được phép upload 4mb");
    return;
  }
  console.log(req.file.mimetype);
  if (req.file.mimetype != "image/jpeg" && req.file.mimetype != "image/jpg") {
    fs.unlinkSync(process.cwd() + "/public/img" + req.file.filename);
    res.send("Sai định dạng");
  }

  fs.readFile(
    process.cwd() + "/public/img" + req.file.filename,
    (err, data) => {
      let dataBase = `data:${req.file.mimetype};base64,${Buffer.from(
        data
      ).toString("base64")}`;

      setTimeout(() => {
        fs.unlinkSync(process.cwd() + "/public/img/" + req.file.filename);
      }, 5000);
      res.send(dataBase);
    }
  );
};

module.exports = {
  uploadImage,
};
