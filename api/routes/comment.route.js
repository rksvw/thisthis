const {
  getComment,
  createComment,
  updateComment,
  deleteComment,
  getUserNComment,
  UpdateLikeCount,
} = require("../controllers/comment.controller");
const { verifyToken } = require("../utils/verifyUser");

const router = require("express").Router();

module.exports = router.get("/getcomment/:id", getComment);
module.exports = router.post("/createcomment", createComment);
module.exports = router.put("/updatecomment/:id", updateComment);
module.exports = router.delete(
  "/deletecomment/:id",
  verifyToken,
  deleteComment
);
module.exports = router.get("/getuc/:id", getUserNComment);
module.exports = router.post("/update/like/:id", UpdateLikeCount);
