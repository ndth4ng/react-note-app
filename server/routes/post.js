const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");

const Post = require("../models/Post");
const moment = require("moment");

// @router GET api/posts
// @desc Get post
// @access private
router.get("/", verifyToken, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.userId }).populate("user", [
      "username",
    ]);
    res.status(200).json({ success: true, posts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// @router POST api/posts
// @desc create post
// @access private
router.post("/", verifyToken, async (req, res) => {
  const { title, description, status } = req.body;

  // Simple validation
  if (!title)
    return res.status(400).json({ success: false, message: "Thiếu tiêu đề" });

  try {
    const newPost = new Post({
      title,
      description,
      status: status || "CHƯA THỰC HIỆN",
      user: req.userId,
    });

    await newPost.save();

    res.json({
      success: true,
      message: "Thêm ghi chú thành công!",
      post: newPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// @router PUT api/posts
// @desc update post
// @access private
router.put("/:id", verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;

  // Simple validation
  if (!title)
    return res
      .status(400)
      .json({ success: false, message: "Tiêu đề của ghi chú là bắt buộc." });

  try {
    let updatedPost = {
      title: title,
      description: description || "",
      status: status || "CHƯA THỰC HIỆN",
      updatedAt: getCurrentDateTime(),
    };

    const postUpdateCondition = { _id: req.params.id, user: req.userId };

    updatedPost = await Post.findOneAndUpdate(
      postUpdateCondition,
      updatedPost,
      { new: true }
    );

    // User not authorized to update or post not found
    if (!updatedPost)
      return res.status(401).json({
        success: false,
        message: "User not authorized or post not found!",
      });

    res.json({
      success: true,
      message: "Cập nhật ghi chú thành công!",
      post: updatedPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// @router DELETE api/posts
// @desc delete post
// @access private
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const postDeleteCondition = { _id: req.params.id, user: req.userId };
    const deletedPost = await Post.findOneAndDelete(postDeleteCondition);

    // User not authorized to update or post not found
    if (!deletedPost)
      return res.status(401).json({
        success: false,
        message: "User not authorized or post not found!",
      });

    res.json({ success: true, message: "Xóa thành công.", post: deletedPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

const getCurrentDateTime = () => {
  moment.locale("vi");
  return moment().format("L, h:mm");
};

module.exports = router;
