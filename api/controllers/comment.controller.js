const { db } = require("../db/sql");

async function getComment(req, res) {
  const { postId } = req.body;
  const query = "SELECT * FROM access_comment";
  //   const values = [postId];
  try {
    db.query(query, (err, results) => {
      if (err) {
        console.log("Comment Error: ", err.stack);
        return res.status(404).json({ message: "Database Error" });
      }
      console.log(results);
      res.status(200).json({ data: results });
    });
  } catch (err) {
    console.log("server error: ", err.message);
  }
}

async function createComment(req, res) {
  const { postId, userId, comment, likeCount, parentId } = req.body;
  let query = "INSERT INTO access_comment ( ";
  let queryParams = [];
  let count = 0;

  if (postId) {
    query += " postId, ";
    count++;
    queryParams.push(postId);
  }

  if (userId) {
    query += " userId, ";
    count++;
    queryParams.push(userId);
  }

  if (comment) {
    query += " `comment`, ";
    count++;
    queryParams.push(comment);
  }

  if (likeCount) {
    query += " likeCount, ";
    count++;
    queryParams.push(likeCount);
  }

  if (parentId) {
    query += " parentId, ";
    count++;
    queryParams.push(parentId);
  }

  query = query.slice(0, -2);

  query += " ) VALUES ( ";
  let nw = "";
  while (count != 0) {
    nw += "?";
    if (count - 1 == 0) {
      nw += " )";
      break;
    }
    nw += ", ";
    count--;
  }
  query += nw;

  console.log("Final Query: ", query);
  console.log("Final Params: ", queryParams);

  try {
    const commentPost = await db.query(query, queryParams, (err, result) => {
      if (err) {
        console.log("SQL error: ", err.stack);
        return res.status(404).json({ message: "SQL ERROR" });
      }
      console.log(result);
    });
    console.log(commentPost);
    res.status(201).json({ commentPost });
  } catch (error) {
    console.error("Server Error: ", error.message);
    res.status(501).json({ message: "Server Error" });
  }
}

async function updateComment(req, res) {
  const commentId = req.params.id;
  const { comment } = req.body;
  const query = "UPDATE access_comment SET comment = ? WHERE commentId = ?";
  const value = [comment, commentId];

  try {
    db.query(query, value, (err, results) => {
      if (err) {
        console.log("Error requesting query: ", err.stack);
        return res.status(404).json({ message: "Error requesting query" });
      }

      db.query(
        "SELECT * FROM access_comment WHERE commentId = ?",
        [commentId],
        (err, results) => {
          if (err) {
            console.log("Error Reading data: ", err.stack);
            return res.status(404).json({ message: "Error Reading data" });
          }
          res.status(200).json({ results });
        }
      );
    });
  } catch (error) {
    console.error("Server Error Updating: ", error.message);
    return res.status(501).json({ message: "Server Error Updating" });
  }
}

async function deleteComment(req, res) {
  const commentId = req.params.id;
  const query = "DELETE FROM access_comment WHERE commentId = ?";
  const value = [commentId];

  try {
    db.query(query, value, (err, results) => {
      if (err) {
        console.log("Error deleting comment: ", err.stack);
        return res.status(404).json({ message: "Error deleting comment" });
      }

      res.status(200).json({ message: "Comment deleted successfully" });
    });
  } catch (error) {
    console.error("Error Deleting: ", error.message);
    return res.status(501).json({ message: "Error deleting comment" });
  }
}

module.exports = {
  getComment,
  createComment,
  updateComment,
  deleteComment
};
