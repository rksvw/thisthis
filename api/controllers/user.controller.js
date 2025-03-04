const { db } = require("../db/sql");
const bcrypt = require("bcrypt");
const saltRounds = 10;

async function updateUser(req, res) {
  const { username, email, fullname } = req.body;
  const profilePicture = req.files["profile_picture"]
    ? `/uploads/${req.files["profile_picture"][0].filename}`
    : null;
  const bgImage = req.files["bg_img"]
    ? `/uploads/${req.files["bg_img"][0].filename}`
    : null;

  let imageUrl = null;
  try {
    // uploading images

    if (req.body.profile_picture) {
      imageUrl = `/uploads/${req.body.profile_picture}`;
    }

    // let hashPassword = password
    //   ? await bcrypt.hash(password, saltRounds)
    //   : null;
    const query =
      "UPDATE users.access_user SET username=?, fullname=?, email=?, profile_picture=?, bg_img=? WHERE id=?";
    const values = [
      username,
      fullname,
      email,
      profilePicture,
      bgImage,
      req.params.id,
    ];

    db.query(query, values, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Database error." });
      }
      res.json({
        message: "Profile updated successfully",
        profilePicture,
        bgImage,
      });
    });
  } catch (err) {
    console.error("Error updating user profile:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    res.status(400).send("All fields are required");
    return;
  }
  try {
    const validUser = db.query(
      "SELECT * FROM access_user WHERE email = ?",
      [email],
      async (err, results, fields) => {
        if (err) {
          console.log("Error executin query: ", err.stack);
          res.status(400).send("Invalid User");
          return;
        }
        console.log(results);
      }
    );

    if (!validUser) {
      res.status(400, "User not found");
      return;
    }

    const validPassword = bcrypt.compareSync(password, validUser.password);
  } catch (err) {
    console.log("A very big error here I got!");
  }
}

async function google(req, res) {
  const { fullname, email, googlePhotoUrl } = req.body;
  const isAdmin = false;
  const generatePassword =
    Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
  const hashPassword = await bcrypt.hash(generatePassword, saltRounds);
  const username =
    fullname.split(" ")[0] + Math.floor(Math.random() * (999 - 100 + 1) + 100);
  try {
    db.query(
      "INSERT INTO access_user ( fullname, username, email, password, isAdmin, profile_picture) VALUE (?, ?, ?, ?, ?, ? )",
      [fullname, username, email, hashPassword, isAdmin, googlePhotoUrl],
      (err, result) => {
        if (err) {
          console.log("Error executing query: ", err.stack);
          res.status(400).send("Error creating user");
          return;
        }
        res.status(201).send("User created successfully");
      }
    );
  } catch (error) {
    console.log("A big google error: ", error.message);
  }
}

// Create a new user
async function signup(req, res) {
  const profile_picture =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  const isAdmin = false;
  const password = req.body.password;
  const encryptedPassword = await bcrypt.hash(password, saltRounds);

  const { fullname, username, email } = req.body;
  db.query(
    "INSERT INTO access_user (fullname, username, email, password, isAdmin, profile_picture) VALUE ( ?, ?, ?, ?, ?, ?)",
    [fullname, username, email, encryptedPassword, isAdmin, profile_picture],
    (err, result) => {
      if (err) {
        console.log("Error executing query: ", err.stack);
        res.status(400).send("Error creating user");
        return;
      }
      res.status(201).send("User created successfully");
    }
  );
}

async function forgotPass(req, res) {
  const { newPassword, email } = req.body;
  const hashPassword = await bcrypt.hash(newPassword, saltRounds);
  try {
    db.query(
      "UPDATE access_user SET password = ? WHERE email = ?",
      [hashPassword, email],
      function (err, results) {
        if (err) {
          res.send({
            code: 400,
            failed: "error occured",
            err: err,
          });
        } else {
          res.status(201).send("User password updated successfully");
        }
      }
    );
  } catch (error) {
    console.log("A big forgotPass error: ", error.message);
  }
}

async function signin(req, res) {
  const { email, password } = req.body;
  if (email !== "" && password !== "") {
    db.query(
      "SELECT * FROM access_user WHERE email = ?",
      [email],
      async function (error, results, fields) {
        if (error) {
          res.send({
            code: 400,
            failed: "error occurred",
            error: error,
          });
        } else {
          if (results.length > 0) {
            const comparison = await bcrypt.compare(
              password,
              results[0].password
            );
            if (comparison) {
              res.send({
                code: 200,
                success: "login successful",
                id: results[0].id,
                fullname: results[0].fullname,
                username: results[0].username,
                email: results[0].email,
                profile_picture: results[0].profile_picture,
                timeStamp: results[0].timestamps,
                bgImg: results[0].bg_img,
                isAdmin: results[0].isAdmin,
              });
            } else {
              res.send({
                code: 204,
                error: "Email and password does not match",
              });
            }
          } else {
            res.send({
              code: 206,
              error: "Email does not exist",
            });
          }
        }
      }
    );
  } else {
    console.log("Error 204");
    res.status(204).send("Error Occurred");
  }
}

module.exports = {
  signup,
  signin,
  google,
  forgotPass,
  login,
  updateUser,
};
