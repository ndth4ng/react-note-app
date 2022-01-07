const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/auth");

const User = require("../models/User");

// @route GET api/auth
// @desc Check if user is logged in
// @access Public
router.get("/", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// @route POST api/auth/register
// @desc Register user
// @access Public
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  //Simple validation
  if (!username || !password)
    return res
      .status(400)
      .json({ success: false, message: "Vui lòng nhập đầy đủ thông tin." });

  try {
    // Check for existing user
    const user = await User.findOne({ username: username });

    if (user)
      return res.status(400).json({
        success: false,
        message: "Tài khoản đã tồn tại, vui lòng chọn tài khoản khác.",
      });

    // All good
    const hashedPassword = await argon2.hash(password);

    const newUser = new User({
      username: username,
      password: hashedPassword,
    });
    await newUser.save();

    // Return token
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET
    );

    res.json({
      success: true,
      message: "Tạo tài khoản thành công.",
      accessToken: accessToken,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// @route POST api/auth/login
// @desc Login user
// @access Public

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  //Simple validation
  if (!username || !password)
    return res
      .status(400)
      .json({ success: false, message: "Vui lòng nhập đầy đủ thông tin." });

  try {
    // Check for existing user
    const user = await User.findOne({ username: username });
    if (!user)
      return res.status(400).json({
        success: false,
        message: "Tài khoản hoặc mật khẩu không chính xác.",
      });

    // Username found
    const passwordValid = await argon2.verify(user.password, password);
    if (!passwordValid) {
      return res.status(400).json({
        success: false,
        message: "Tài khoản hoặc mật khẩu không chính xác.",
      });
    } else {
      // All good
      // Return token
      const accessToken = jwt.sign(
        { userId: user._id },
        process.env.ACCESS_TOKEN_SECRET
      );

      res.json({
        success: true,
        message: "Đăng nhập thành công.",
        accessToken: accessToken,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
