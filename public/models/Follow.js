const mongoos = require("mongoose");

const followSchema = mongoos.Schema({
  follower: { type: mongoos.Types.ObjectId, ref: "User", required: true },
  following: { type: mongoos.Types.ObjectId, ref: "User", required: true },
});

let Follow = mongoos.model("Follow", followSchema);
