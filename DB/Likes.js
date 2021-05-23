const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LikesSchema = new Schema({
  Projectid: {
    type: Number,
    required: true,
  },

  Likes: {
    type: Number,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});
const UniqidSchema = new Schema({
  uniqIdLike: {
    type: String,
    required: true,
  },
  Projectid: {
    type: Number,
    required: true,
  },

  // Likes: {
  //   type: Number,
  //   required: true,
  // },
  date: {
    type: Date,
    default: Date.now,
  },
});
const Likes = mongoose.model("likes", LikesSchema);
const UniqIdLike = mongoose.model("UniqidLikes", UniqidSchema);
module.exports = {
  Likes,
  UniqIdLike,
};
