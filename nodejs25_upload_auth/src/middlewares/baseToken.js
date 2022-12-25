const jwt = require("jsonwebtoken");

const parseToken = (data) => {
  let token = jwt.sign({ data }, "khoa", {
    algorithm: "HS256",
    expiresIn: "10y",
  });
  return token;
};

const checkToken = (token) => {
  try {
    let checkTk = jwt.verify(token, "khoa");
    if (checkTk) {
      return { checkData: true, message: "" };
    } else {
      return { checkData: false, message: "Token không hợp lệ" };
    }
  } catch (error) {
    return { checkData: false, message: error.message };
  }
};

const verifyToken = (req, res, next) => {
  const { token } = req.headers;
  const verifyToken = checkToken(token);
  if (verifyToken.checkData) {
    next();
  } else {
    res.status(401).send(verifyToken.message);
  }
};

module.exports = {
  parseToken,
  checkToken,
  verifyToken,
};
