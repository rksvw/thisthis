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
      console.log(results)
      res.status(200).json({ data: results });
    });
  } catch (err) {
    console.log("server error: ", err.message);
  }
}

async function createComment(req, res) {
  // const {postId, userId, comment, likes}
}

module.exports = {
  getComment,
};
