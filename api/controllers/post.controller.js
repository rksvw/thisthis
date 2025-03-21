const { db } = require("../db/sql");
const util = require("util");

async function getPosts(req, res) {
  // Convert db.query() to return Promises
  db.query = util.promisify(db.query);
  try {
    const {
      userId,
      category,
      slug,
      postId,
      searchTerm,
      sortDirection,
      startIndex,
      limit,
    } = req.query;
    // const whereCodition = {
    //   ...(userId && { userId }),
    //   ...(category && { category }),
    //   ...(slug && { slug }),
    //   ...(postId && { postId }),
    //   ...(searchTerm && {
    //     [Op.or]: [
    //       { title: { [Op.like]: `%${searchTerm}%` } },
    //       { content: { [Op.like]: `%${searchTerm}%` } },
    //     ],
    //   }),
    // };
    let query = "SELECT * FROM access_article WHERE 1=1";
    let queryParams = [];

    // Dynamic filers
    if (userId) {
      query += " AND userId = ?";
      queryParams.push(userId);
    }

    if (category) {
      query += " AND category = ?";
      queryParams.push(category);
    }
    if (slug) {
      query += " AND slug = ?";
      queryParams.push(slug);
    }
    if (postId) {
      query += " AND postId = ?";
      queryParams.push(postId);
    }
    if (searchTerm) {
      query += " AND (title LIKE ? OR content LIKE ?)";
      queryParams.push(`%${searchTerm}%`, `%${searchTerm}%`);
    }

    // Sorting
    const sortOrder = sortDirection === "desc" ? "DESC" : "ASC";
    query += ` ORDER BY modifiedAt ${sortOrder}`;

    // Pagination
    const start = parseInt(startIndex) || 0;
    const limitValue = parseInt(limit) || 10;
    query += " LIMIT ?, ?";
    queryParams.push(start, limitValue);

    console.log("Final Query: ", query);
    console.log("Query Parameters: ", queryParams);
    // Fetch posts

    const posts = await db.query(query, queryParams);

    // Get total posts count
    const totalResult = await db.query(
      "SELECT COUNT(*) as totalPosts FROM access_article"
    );
    const totalPosts = totalResult[0].totalPosts;

    // Get last month's posts countconst oneMonthAgo = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    const formattedDate = oneMonthAgo.toISOString().split("T")[0];

    const lastMonthResult = await db.query(
      "SELECT COUNT(*) as lastMonthPosts FROM access_article WHERE createdAt >= ?",
      [formattedDate]
    );

    const lastMonthPosts = lastMonthResult[0].lastMonthPosts;
    console.log(posts);

    // Send final response once
    res.status(200).json({ posts, totalPosts, lastMonthPosts });

    // // Execute Query
    // db.query(query, queryParams, (err, posts) => {
    //   if (err) {
    //     return res.status(500).json({ error: err.message });
    //   }

    //   // Total post count
    //   db.query(
    //     "SELECT * COUNT(*) as totalPosts FROM access_article",
    //     (err, totalResult) => {
    //       if (err) {
    //         return res.status(500).json({ error: err.message });
    //       }

    //       // Posts from last month
    //       const oneMonthAgo = new Date();
    //       oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    //       const formattedDate = oneMonthAgo.toISOString().split("T")[0];

    //       db.query(
    //         "SELECT COUNT(*) as lastMonthPosts FROM access_article WHERE createdAt >= ?",
    //         [formattedDate],
    //         (err, lastMonthResult) => {
    //           if (err) {
    //             return res.status(500).json({ error: err.message });
    //           }
    //           res.status(200).json({
    //             posts,
    //             totalPosts: totalResult[0].totalPosts,
    //             lastMonthPosts: lastMonthResult[0].lastMonthPosts,
    //           });
    //         }
    //       );
    //     }
    //   );
    // });
  } catch (err) {
    console.log("Error: ", err.message);
    res.status(500).json({ error: err.message });
  }

  // const query = "SELECT * FROM access_article ORDER BY postId DESC LIMIT 3 ";
  // db.query(query, (err, results) => {
  //   if (err) {
  //     console.log("Error: ", err.stack);
  //     return;
  //   }

  //   console.log(results);
  //   res.status(200).send(results);
  // });
}

async function createPost(req, res) {
  const { userId, title, content, category, image } = req.body;

  // File has been saved by multer, get the file path
  // const filePath = `uploads/${req.files}`; // Correct file path

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
    "INSERT INTO access_article (userId, title, content, category, slug, image) VALUES ( ?, ?, ?, ?, ?, ?)";
  const values = [userId, title, content, category, slug, image];

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
        _id: userId,
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

      const image = res.status(200).json({
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
  deletePost,
};
