const { db } = require("../db/sql");
const bcrypt = require("bcrypt");
const { errorHandler } = require("../utils/err");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

async function updateUser(req, res) {
  const _id = req.params.id;
  const { username, email, fullname } = req.body;
  const profilePicture = req.files["profile_picture"]
    ? `/uploads/${req.files["profile_picture"][0].filename}`
    : null;
  const bgImage = req.files["bg_img"]
    ? `/uploads/${req.files["bg_img"][0].filename}`
    : null;

  try {
    // uploading images

    // let hashPassword = password
    //   ? await bcrypt.hash(password, saltRounds)
    //   : null;
    const query =
      "UPDATE users.access_user SET username=?, fullname=?, email=?, profile_picture=?, bg_img=? WHERE id=?";
    const values = [username, fullname, email, profilePicture, bgImage, _id];

    db.query(query, values, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Database error." });
      }
      res.json({
        message: "Profile updated successfully",
        profilePicture,
        bgImage,
        username,
        _id,
        fullname,
        email,
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
      (err, results) => {
        if (err) {
          console.log("Error executing query: ", err.stack);
          res.status(400).send("Error creating user");
          return;
        }
        db.query(
          "SELECT * FROM users.access_user WHERE id = ?",
          [results.insertId],
          (err, rows) => {
            if (err) {
              return res
                .status(500)
                .json({ error: "Database retrieval failed" });
            } else {
              res.json({
                message: "User created successfully",
                _id: rows[0].id,
                fullname: rows[0].fullname,
                username: rows[0].username,
                email: rows[0].email,
                isAdmin: rows[0].isAdmin,
                timestamps: rows[0].timestamps,
                profile_picture: rows[0].profile_picture,
                bgImg: rows[0].bg_img,
              });
            }
          }
        );
      }
    );
  } catch (error) {
    console.log("A big google error: ", error.message);
  }
}

// Create a new user
async function signup(req, res) {
  const isAdmin = false;
  const password = req.body.password;
  const encryptedPassword = await bcrypt.hash(password, saltRounds);

  const { fullname, username, email } = req.body;

  const queryInsert =
    "INSERT INTO access_user (fullname, username, email, password, isAdmin) VALUES ( ?, ?, ?, ?, ?)";
  const valuesInsert = [fullname, username, email, encryptedPassword, isAdmin];
  const querySelect = "SELECT * FROM users.access_user WHERE id = ?";

  // Generate JWT token
  const token = jwt.sign(
    { id: user.id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: "7d" } // Token expires in 7 days
  );

  try {
    db.query(queryInsert, valuesInsert, (err, results) => {
      if (err) {
        res.status(400).send("Error creating user");
        return;
      }
      -(
        // After Inserting Retrive the data

        db.query(querySelect, [results.insertId], (err, rows) => {
          if (err) {
            return res.status(500).json({ error: "Database retrieval failed" });
          } else {
            res
              .cookie("access_token", token, {
                httpOnly: true, // Prevent XSS attacks
                // secure: process.env.NODE_ENV
                //  === "production", // Secure in production
                samSite: "Strict",
              })
              .json({
                message: "Data inserted successfully",
                _id: rows[0].id,
                fullname: rows[0].fullname,
                username: rows[0].username,
                email: rows[0].email,
                isAdmin: rows[0].isAdmin,
                timestamps: rows[0].timestamps,
                profile_picture: rows[0].profile_picture,
                bgImg: rows[0].bg_img,
                token,
              });
          }
        })
      );
    });
  } catch (error) {
    console.log(`Got an SignUp Error: ${error.message}`);
  }
}

async function signup(req, res) {
  try {
    const { fullname, username, email, password } = req.body;
    if (!fullname || !username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const isAdmin = false;
    const encryptedPassword = await bcrypt.hash(password, saltRounds);

    const queryInsert =
      "INSERT INTO access_user (fullname, username, email, password, isAdmin) VALUES (?, ?, ?, ?, ?)";
    const valuesInsert = [
      fullname,
      username,
      email,
      encryptedPassword,
      isAdmin,
    ];

    // Insert user into database
    db.query(queryInsert, valuesInsert, (err, results) => {
      if (err) {
        console.error("Error creating user: ", err);
        return res.status(400).json({ error: "Error creating user" });
      }

      const userId = results.insertId; // Get the inserted user ID
      const querySelect = "SELECT * FROM access_user WHERE id = ?";

      // Fetch the newly inserted user
      db.query(querySelect, [userId], (err, rows) => {
        if (err) {
          console.error("Database retrieval failed: ", err);
          return res.status(500).json({ error: "Database retrieval failed" });
        }

        console.log("After insert ", results);

        const user = rows[0];

        // Generate JWT token
        const token = jwt.sign(
          { id: user.id, isAdmin: user.isAdmin },
          process.env.JWT_SECRET,
          { expiresIn: "7d" }
        );

        console.log("After select ", user);

        // Send response with user data and JWT token
        res
          .cookie("access_token", token, {
            httpOnly: true,
            samSite: "Strict",
          })
          .json({
            message: "User created successfully",
            _id: user.id,
            fullname: user.fullname,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
            profile_picture: user.profile_picture,
            bgImg: user.bg_img,
            token,
          });
      });
    });
  } catch (error) {
    console.error(`Signup Error: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
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

async function signin(req, res, next) {
  const { email, password } = req.body;

  if (email !== "" && password !== "") {
    return res.status(400).json({ error: "All fields are required" });
  }

  db.query(
    "SELECT * FORM access_user WHERE email = ?",
    [email],
    async (error, results) => {
      if (error) {
        return next(errorHandler(500, "Database error"));
      }

      if (results.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      const user = results[0];

      // Compare hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET,
        { expiresIn: "7d" } // Token expires in 7 days
      );

      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true, // Prevent XSS attacks
          // secure: process.env.NODE_ENV
          //  === "production", // Secure in production
          samSite: "Strict",
        })
        .json({
          message: "Login successful",
          user: {
            _id: user.id,
            fullname: user.fullname,
            username: user.username,
            email: user.email,
            profile_picture: user.profile_picture,
            timestamps: user.timestamps,
            bgImg: user.bg_img,
            isAdmin: user.isAdmin,
          },
          token,
        });
    }
  );

  // db.query(
  //   "SELECT * FROM access_user WHERE email = ?",
  //   [email],
  //   async function (error, results, fields) {
  //     if (error) {
  //       next(errorHandler(400, "All fieds are required"));
  //     } else {
  //       if (results.length > 0) {
  //         const comparison = await bcrypt.compare(
  //           password,
  //           results[0].password
  //         );

  //         const token = jwt.sign(
  //           { id: validUser._id, isAdmin: validUser.isAdmin },
  //           process.env.JWT_SECRET
  //         );

  //         if (comparison) {
  //           res
  //             .status(200)
  //             .cookie("access_token", token, {
  //               httpOnly: true,
  //             })
  //             .json({
  //               code: 200,
  //               success: "login successful",
  //               _id: results[0].id,
  //               fullname: results[0].fullname,
  //               username: results[0].username,
  //               email: results[0].email,
  //               profile_picture: results[0].profile_picture,
  //               timeStamp: results[0].timestamps,
  //               bgImg: results[0].bg_img,
  //               isAdmin: results[0].isAdmin,
  //             });
  //         } else {
  //           res.send({
  //             code: 204,
  //             error: "Email and password does not match",
  //           });
  //         }
  //       } else {
  //         res.send({
  //           code: 206,
  //           error: "Email does not exist",
  //         });
  //       }
  //     }
  //   }
  // );
  // } else {
  //   console.log("Error 204");
  //   res.status(204).send("Error Occurred");
  // }
}
async function loginout(req, res) {
  res
    .staus(200)
    .clearCookie("access_token")
    .json({ message: "Logout Successfully" });
}

module.exports = {
  signup,
  signin,
  google,
  forgotPass,
  login,
  updateUser,
  loginout,
};
