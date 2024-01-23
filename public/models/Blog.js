let mongoos = require("mongoose");

let blogSchema = mongoos.Schema({
  title: { type: String, require: true },
  body: { type: String, require: true },
  photo: { type: String },
  author: { type: mongoos.Types.ObjectId, ref: "User", require: true },
  tags: [{ type: String }],
});

let Blog = mongoos.model("Blog", blogSchema);
module.exports = Blog;
