const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["CHƯA THỰC HIỆN", "CHƯA THỰC HIỆN", "HOÀN THÀNH"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  updatedAt: {
    type: String,
    default: () => {
      moment.locale("vi");
      return moment().format("L, h:mm");
    },
  },
});

module.exports = mongoose.model("posts", PostSchema);
