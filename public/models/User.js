let mongoos = require("mongoose");

let userSchema = mongoos.Schema({
  username: { type: String, unique: true, require: true },
  password: { type: String, require: true },
  followers: [{ type: mongoos.Types.ObjectId, ref: "Follow" }],
  following: [{ type: mongoos.Types.ObjectId, ref: "Follow" }],
});
let User = mongoos.model("User", userSchema);
module.exports = User;
