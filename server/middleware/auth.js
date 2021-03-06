const jwt = require("jsonwebtoken");

//Authorization: bearer process.env.JSON_WEB_TOKEN_STRING

const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res
      .status(401)
      .json({ succes: false, message: "Access token not found!" });

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ succes: false, message: "Invalid token" });
  }
};

module.exports = verifyToken;
