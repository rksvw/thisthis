const { getComment } = require("../controllers/comment.controller");

const router = require("express").Router();

module.exports = router.get("/getcomment", getComment);
