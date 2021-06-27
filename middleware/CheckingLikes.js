const UniqID = require("../DB/Likes").UniqIdLike;
const Likes = require("../DB/Likes").Likes;

const GetArrayLikesId = async (req, res, next) => {
  const body = req.body.LikeId;
  try {
    const Arr = await UniqID.find({ uniqIdLike: body });
    req.IdLikes = Arr;
    return next();
  } catch (e) {
    console.error(e.message);
  }
};

const CheckIfUserRemoveLike = async (req, res, next) => {
  const body = req.body;
  const RemoveLike = 0;
  const CheckProjectIDfromDB = req.IdLikes.map((DB) => {
    return DB.Projectid;
  });
  try {
    if (Number(CheckProjectIDfromDB) === body.Projectid) {
      await Likes.updateOne(
        { Projectid: body.Projectid },
        { $set: { Likes: RemoveLike } }
      );
      await UniqID.deleteOne({ uniqIdLike: body.LikeId });
      throw new Error();
    }
    return next();
  } catch (e) {
    res.status(201).json({});
    console.log(e.message);
  }
};

const CheckIfUserSelectedLike = (req, res, next) => {
  const idFromDB = req.IdLikes;
  const IdFromClient = req.body.LikeId;
  // const SelectedProjectID = req.body.Projectid;
  try {
    idFromDB.find((check) => {
      if (check.uniqIdLike === IdFromClient)
        throw new Error("You have already liked another project");
    });
    return next();
  } catch (e) {
    console.error(e.message);
    res.status(403).json({
      err: e.message,
    });
  }
};

module.exports = {
  GetArrayLikesId,
  CheckIfUserRemoveLike,
  CheckIfUserSelectedLike,
};
