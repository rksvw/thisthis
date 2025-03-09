const {
  getPosts,
  createPost,
  updatePost,
  getPost,
  deletePost,
} = require("../controllers/post.controller");
const router = require("express").Router();

module.exports = router.get("/getposts", getPosts);
module.exports = router.post("/create", createPost);
module.exports = router.put("/update/:id", updatePost);
module.exports = router.get("/getpost/:id", getPost);
module.exports = router.delete("/delete/:id", deletePost);
