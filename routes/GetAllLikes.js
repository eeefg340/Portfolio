const express = require("express");
const Router = express.Router();
const Likes = require("../DB/Likes").Likes;

Router.get("/GetAllLikes", async (req, res) => {
  try {
    console.log("Start");

    const GetLikeOfProjects = await Likes.find({});

    res.status(200).json(GetLikeOfProjects);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      err: err.message,
    });
  }
});

module.exports = Router;
