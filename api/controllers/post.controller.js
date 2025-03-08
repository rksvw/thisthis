const { db } = require("../db/sql");

async function getPosts(req, res) {
  const query = "SELECT * FROM access_article ORDER BY postId DESC LIMIT 3 ";
  db.query(query, (err, results) => {
    if (err) {
      console.log("Error: ", err.stack);
      return;
    }

    console.log(results);
    res.status(200).send(results);
  });
}

async function createPost(req, res) {
  const { _id, title, content, category, image } = req.body;

  if (!title || !content) {
    console.log("Please provide all required fields");
    res.status(400).json({ message: "Please provide all required fields." });
    return;
  }
  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "-");

  const query =
    "INSERT INTO access_article (userId, title, content, category, slug, image, modifiedAt) VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP())";
  const values = [_id, title, content, category, slug, image];

  try {
    db.query(query, values, (err, results) => {
      if (err) {
        console.log("Query Error: ", err.stack);
        return;
      }

      res.status(200).json({
        message: "Post Created Successfully",
        postId: results.insertId,
        slug: slug,
        _id: _id,
        title: title,
        content: content,
        category: category,
        image: image,
      });
    });
  } catch (error) {
    console.log("Error creating post: ", error.message);
  }
}

async function getPost(req, res) {
  const id = req.params.id;
  const query = "SELECT * FROM access_article WHERE postId = ?";
  const values = [id];

  try {
    db.query(query, values, (err, results) => {
      if (err) {
        console.log("Query Error: ", err.stack);
        return;
      }

      res.status(200).json({
        message: "Get post Successfully",
        _id: results[0].id,
        postId: id,
        title: results[0].title,
        content: results[0].content,
        category: results[0].category,
        image: results[0].image,
        slug: results[0].slug,
      });
    });
  } catch (error) {
    console.log("Error retrieving post: ", error.message);
  }
}

async function updatePost(req, res) {
  const id = req.params.id;
  const { title, content, category, image, _id } = req.body;
  const slug = title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "-");

  const query =
    "UPDATE access_article SET title = ?, content = ?, category = ?, image = ?, slug = ? WHERE postId = ? ";
  const values = [title, content, category, image, slug, id];

  try {
    db.query(query, values, (err, results) => {
      if (err) {
        console.log("Error Query: ", err.stack);
        return;
      }

      res.status(201).json({
        message: "Post Updated Successfully",
        postId: id,
        title,
        content,
        category,
        image,
        _id,
        slug,
      });
    });
  } catch (error) {
    console.log("Error update post: ".error.message);
  }
}

async function deletePost(req, res) {
  const id = req.params.id;
  const query = "DELETE FROM access_article WHERE postId = ?";
  const values = [id];

  try {
    db.query(query, values, (err, results) => {
      if (err) {
        console.log("Query Error: ", err.stack);
        res.status(401);
        return;
      }

      res.status(204).json({
        message: "Post deleted Successfully",
      });
    });
  } catch (error) {
    console.log("Delete post Error: ", error.message);
  }
}

module.exports = {
  getPosts,
  createPost,
  getPost,
  updatePost,
  deletePost
};
