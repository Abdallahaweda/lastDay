let mongoos = require("mongoose");

let userSchema = mongoos.Schema({
  username: { type: String, unique: true, require: true },
  password: { type: String, require: true },
  followers: [{ type: mongoos.Types.ObjectId, ref: "User" }],
  following: [{ type: mongoos.Types.ObjectId, ref: "User" }],
});
let User = mongoos.model("User", userSchema);
module.exports = User;
