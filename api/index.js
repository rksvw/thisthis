const express = require("express");
const { db } = require("./db/sql");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const userRoutes = require("./routes/user.route");
const postRoutes = require("./routes/post.route");
const { updateUser } = require("./controllers/user.controller");
const app = express();

const port = 3000;

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });
app.use(express.text());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api/user", userRoutes);
app.use("/api/article", postRoutes);
app.put(
  "/api/user/upload/:id",
  upload.fields([{ name: "profile_picture" }, { name: "bg_img" }]),
  updateUser
);

app.post("/api/post/upload", upload.single("image"), (req, res) => {
  try {
    console.log(req);
    if (!req.file) {
      return res.status(400).json({ error: "Please select an image" });
    }
    const filePath = `http://localhost:3000/uploads/${req.file.filename}`;
    res.status(200).json({ success: true, imageUrl: filePath });
  } catch (err) {
    console.log("Image upload error: ", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});
app.use("/uploads", express.static("uploads"));

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
