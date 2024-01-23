let bcrypt = require("bcrypt");
let User = require("../models/User");
let Follow = require("../models/Follow");
let JWT = require("jsonwebtoken");

let Register = async (req, res) => {
  //!el register hna h5leha ta5od el req,res 3shan fl route mktbhom4
  try {
    let { username, password } = req.body;
    let existUser = await User.findOne({ username });
    if (existUser) {
      return res.status(400).json({
        Error: "Username already exists from UserController Register",
      });
    }
    let hash = await bcrypt.hash(password, 10);
    let user = await User.create({ username, password: hash });

    let token = JWT.sign({ id: user.id }, "aweda-secret-key");
    res.json({ token, user: { id: user.id, username: user.username } });
  } catch (e) {
    res
      .status(500)
      .json({ Error: "serviers Error from UserController Register" });
  }
};

let Login = async (req, res) => {
  try {
    let { username, password } = req.body;
    let user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(404).json({ Error: "invalid password or username" });
    }
    let token = JWT.sign({ id: user.id }, "aweda-secret-key");
    res.json({ token, user: { id: user.id, username: user.username } });
  } catch (e) {
    res.status(500).json({ Error: "serviers Error from UserController Login" });
  }
};

//!from chatGPT

let follow = async (req, res) => {
  try {
    const { userIdToFollow } = req.params;

    const userToFollow = await User.findById(userIdToFollow);
    if (!userToFollow) {
      return res.status(404).json({ error: "User not found" });
    }

    const existingFollow = await Follow.findOne({
      follower: req.user.id,
      following: userIdToFollow,
    });

    if (existingFollow) {
      return res.status(400).json({ Error: "Already following this user" });
    }
    //!create new follower
    let newFollow = await Follow.create({
      follower: req.user.id,
      following: userIdToFollow,
    });

    res.json({ success: true, follow: newFollow });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error from userController Follow" });
  }
};

let unfollow = async (req, res) => {
  try {
    const { userIdToUnfollow } = req.params;

    const userToUnfollow = await User.findById(userIdToUnfollow);
    if (!userToUnfollow) {
      return res.status(404).json({ error: "User not found" });
    }

    const existingFollow = await Follow.findOneAndDelete({
      follower: req.user.id,
      following: userIdToUnfollow,
    });

    if (existingFollow) {
      req.user.following = req.user.following.filter(
        (follow) => follow.toString() !== existingFollow.id
      );
      await req.user.save();

      userToUnfollow.followers = userToUnfollow.followers.filter(
        (follow) => follow.toString() !== existingFollow.id
      );
      await userToUnfollow.save();
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { Register, Login, follow, unfollow };
