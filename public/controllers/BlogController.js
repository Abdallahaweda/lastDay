let Blog = require("../models/Blog");

let GetAllBlogs = async (req, res) => {
  try {
    let blogs = await Blog.find().populate("author", "username");
    res.json(blogs);
  } catch (e) {
    res
      .status(500)
      .json({ Error: "serviers Error from BlogController GetAllBlogs " });
  }
};
let GetUserBlogs = async (req, res) => {
  try {
    let blogs = await Blog.find({ author: req.params.userId }).populate(
      "author",
      "username"
    );
    res.json(blogs);
  } catch (e) {
    res
      .status(500)
      .json({ Error: "serviers Error from BlogController GetUserBlogs " });
  }
};
let CreateBlog = async (req, res) => {
  try {
    let { title, body, photo, tags } = req.body;
    let blog = await Blog.create({
      title,
      body,
      photo,
      author: req.user.id,
      tags,
    });

    res.json({ success: true, blog });
  } catch (e) {
    res
      .status(500)
      .json({ Error: "serviers Error from BlogController CreateBlog " });
  }
};
let EditBlog = async (req, res) => {
  try {
    let { blogId } = req.params;
    let { body, title, phot, tags } = req.body;
    let blog = await Blog.updateOne(
      { _id: blogId, author: req.use.id },
      { $set: { body, title, phot, tags } }
    );
    if (blog.nModified === 0) {
      res.status(404).json({ Error: "Blog Not Found from EditBlog" });
    }
    res.json({ success: true });
  } catch (e) {
    res
      .status(500)
      .json({ Error: "serviers Error from BlogController EditBlog " });
  }
};
let DeleteBlog = async (req, res) => {
  try {
    let { blogId } = req.params;
    let blog = await Blog.deleteOne({ _id: blogId, author: req.user.id });
    if (blog.deletedCount === 0) {
      res.status(404).json({ Error: "Blog Not Found from EditBlog" });
    }
    res.json({ success: true });
  } catch (e) {
    res
      .status(500)
      .json({ Error: "serviers Error from BlogController DeleteBlog " });
  }
};
module.exports = {
  GetAllBlogs,
  GetUserBlogs,
  CreateBlog,
  EditBlog,
  DeleteBlog,
};
