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
      return moment().utcOffset("7").format("L, h:mm");
    },
  },
});

module.exports = mongoose.model("posts", PostSchema);
