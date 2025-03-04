const express = require("express");
const { db } = require("./db/sql");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const userRoutes = require("./routes/user.route");
const { updateUser } = require("./controllers/user.controller");
const app = express();

const port = 3000;
const upload = multer({
  dest: "uploads/", // Folder to store images
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
});

app.use(bodyParser.json());
app.use(express.json());
app.use("/api/user", userRoutes);
app.put("/api/user/upload/:id", upload.fields([{name: "profile_picture"}, {name: "bg_img"}]), updateUser);

app.use(cors());

app.get("/", (req, res) => {
  res.send(`<h1>Hello World!</h1>`);
});

app.get("/api/users", (req, res) => {
  db.query("SELECT * FROM access_user", (err, result) => {
    if (err) {
      console.log("Error executing query: ", err.stack);
      res.status(500).send("Error fetching users");
      return;
    }
    res.json(result);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
