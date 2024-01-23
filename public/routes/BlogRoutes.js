let express = require("express");
let router = express.Router();
let authorizationM = require("../middleware/Authorization");
let blogController = require("../controllers/BlogController");

//*show all blogs
router.get("/", blogController.GetAllBlogs);
//*show blogs specific user
router.get("/user/:userId", blogController.GetUserBlogs);
//*create new blog
router.post("/", authorizationM, blogController.CreateBlog);
//*Update blog
router.put("/:blogId", authorizationM, blogController.EditBlog);
//*Delete blog
router.delete("/:blogId", authorizationM, blogController.DeleteBlog);
module.exports = router;
