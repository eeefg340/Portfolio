const express = require("express");
const Router = express.Router();

const cors = require("cors");
const UniqID = require("../DB/Likes").UniqIdLike;
const Likes = require("../DB/Likes").Likes;
Router.use(cors());

function UniqPressLike() {
  return (
    Math.random().toString(16).slice(15) +
    new Date().getTime() +
    Math.random().toString(16).slice(15)
  );
}

const GetArrayLikesId = async (req, res, next) => {
  const body = req.body.LikeId;
  try {
    const Arr = await UniqID.find({ uniqIdLike: body });
    req.IdLikes = Arr;
    next();
  } catch (e) {
    console.error(e.message);
  }
};
const CheckIfUserSelectedLike = (req, res, next) => {
  const idFromDB = req.IdLikes;
  console.log(idFromDB);
  const IdFromClient = req.body.LikeId;

  try {
    idFromDB.find((check) => {
      if (check.uniqIdLike === IdFromClient)
        throw new Error("the user was selected like on project");
    });
    next();
  } catch (e) {
    console.error(e.message);
    res.status(403).json({
        err: e.message
    })
  }
};
const CheckIfUserRemoveLike = async (req, res, next) => {
  const body = req.body;
  try {
    if (body.Like == 0)
      return await UniqID.deleteOne({ Projectid: body.Projectid });

    next();
  } catch (e) {
    console.error(e.message);
  }
};

Router.use(GetArrayLikesId);
Router.use(CheckIfUserSelectedLike);

Router.post("/like", async (req, res) => {
  try {
    const body = req.body;
    console.log(body);

    console.log("Start");

    await Likes.findOneAndUpdate(
      { Projectid: body.Projectid },
      { $inc: { Likes: body.Like } },
      { new: true }
    );

    const NewUniqid = new UniqID({
      uniqIdLike: UniqPressLike(),
      Projectid: body.Projectid,
    });
    await NewUniqid.save();
    console.log("saved");

    res.status(200).json(NewUniqid);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      err: err.message,
    });
  }
});
Router.get("/GetAllLikes", async (req, res) => {
  try {
    console.log("Start");

    const GetLikeOfProjects = await Likes.find({})

    res.status(200).json(GetLikeOfProjects);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      err: err.message,
    });
  }
});

module.exports = Router;
