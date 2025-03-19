const {
  getPosts,
  createPost,
  updatePost,
  getPost,
  deletePost,
} = require("../controllers/post.controller");
const { verifyToken } = require("../utils/verifyUser");
const router = require("express").Router();

module.exports = router.get("/getposts", getPosts);
module.exports = router.post("/create", verifyToken, createPost);
module.exports = router.put("/update/:id", verifyToken, updatePost);
module.exports = router.get("/getpost/:id", getPost);
module.exports = router.delete("/delete/:id", verifyToken, deletePost);
