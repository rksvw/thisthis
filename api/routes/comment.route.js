const {
  getComment,
  createComment,
  updateComment,
  deleteComment,
} = require("../controllers/comment.controller");

const router = require("express").Router();

module.exports = router.get("/getcomment", getComment);
module.exports = router.post("/createcomment", createComment);
module.exports = router.put("/updatecomment/:id", updateComment);
module.exports = router.delete("/deletecomment/:id", deleteComment)
