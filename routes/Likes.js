const express = require("express");
const Router = express.Router();
const UniqID = require("../DB/Likes").UniqIdLike;
const Likes = require("../DB/Likes").Likes;
const {
  GetArrayLikesId,
  CheckIfUserRemoveLike,
  CheckIfUserSelectedLike,
} = require("../middleware/CheckingLikes");

function UniqPressLike() {
  return (
    Math.random().toString(16).slice(15) +
    new Date().getTime() +
    Math.random().toString(16).slice(15)
  );
}

Router.use(GetArrayLikesId);
Router.use(CheckIfUserRemoveLike);
Router.use(CheckIfUserSelectedLike);

Router.post("/like", async (req, res) => {
  try {
    const body = req.body;
    const AddLike = 1;

    console.log("__Start___");

    await Likes.updateOne(
      { Projectid: body.Projectid },
      { $inc: { Likes: AddLike } }
    );

    const NewUniqid = new UniqID({
      uniqIdLike: UniqPressLike(),
      Projectid: body.Projectid,
    });
    await NewUniqid.save();
    console.log("_saved_");

    res.status(200).json(NewUniqid);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      err: err.message,
    });
  }
});

module.exports = Router;
