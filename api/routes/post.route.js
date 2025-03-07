const { getPosts } = require("../controllers/post.controller");

const router = require("express").Router();

module.exports = router.get("/get_all", getPosts);