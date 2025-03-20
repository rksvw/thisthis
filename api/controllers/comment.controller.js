const { db } = require("../db/sql");

async function getUserNComment(req, res) {
  // console.log(req)
  const postId = req.params.id;
  const userId = req.user?.id;
  const query =
    "SELECT c.commentId AS commentId, c.postId, c.userId, c.comment, c.likeCount, u.username AS username, u.profile_picture, CASE WHEN al.userId IS NOT NULL THEN TRUE ELSE FALSE END AS likedByUser FROM access_comment c JOIN access_user u ON c.userId = u.id LEFT JOIN access_like al ON c.commentId = al.commentId AND al.userId = ? WHERE c.postId = ? ORDER BY c.createdAt DESC";
  const value = [userId, postId];

  try {
    db.query(query, value, (err, results) => {
      if (err) {
        console.log("Comment Error: ", err.stack);
        return res.status(500).json({ message: "Database Error" });
      }
      res.status(200).json({ results });
    });
  } catch (err) {
    console.log("server error: ", err.message);
    res.status(500).json({ message: "Server Error" });
  }
}

async function getComment(req, res) {
  const postId = req.params.id;
  const query = "SELECT * FROM access_comment WHERE postId = ?";
  const values = [postId];
  try {
    db.query(query, values, (err, results) => {
      if (err) {
        console.log("Comment Error: ", err.stack);
        return res.status(404).json({ message: "Database Error" });
      }
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
    query += " comment, ";
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

  try {
    await db.query(query, queryParams, (err, result) => {
      if (err) {
        console.log("SQL error: ", err.stack);
        return res.status(404).json({ message: "SQL ERROR" });
      }

      res.status(201).json({ message: "Comment created successfully" });
    });
  } catch (error) {
    console.error("Server Error: ", error.message);
    res.status(501).json({ message: "Server Error" });
  }
}

async function UpdateLikeCount(req, res) {
  const commentId = parseInt(req.params.id);
  const userId = parseInt(req.body.userId);

  try {
    // Step 1: Check if the user already liked the comment
    const [rows] = await db.query(
      `SELECT COUNT(*) AS count FROM access_like WHERE commentId = ? AND userId = ?`,
      [commentId, userId]
    );

    console.log("Like Count Query Result:", rows); // Debugging

    if (rows.count === 0) {
      // If user hasn't liked, insert like
      await db.query(
        `INSERT INTO access_like (commentId, userId) VALUES (?, ?)`,
        [commentId, userId]
      );

      await db.query(
        `UPDATE access_comment SET likeCount = likeCount + 1 WHERE commentId = ?`,
        [commentId]
      );
    } else {
      // If user already liked, remove like
      await db.query(
        `DELETE FROM access_like WHERE commentId = ? AND userId = ?`,
        [commentId, userId]
      );

      await db.query(
        `UPDATE access_comment SET likeCount = likeCount - 1 WHERE commentId = ?`,
        [commentId]
      );
    }

    res.status(200).json({ message: "Like count updated successfully" });
  } catch (error) {
    console.error("Error processing like: ", error.message);
    res.status(500).json({ message: "Error updating like count" });
  }
}

module.exports = UpdateLikeCount;

async function updateComment(req, res) {
  const commentId = req.params.id;
  const { comment, like } = req.body;
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
  deleteComment,
  getUserNComment,
  UpdateLikeCount,
};
