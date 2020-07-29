const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
let User = new mongoose.model("User");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../keys");
const LoginRequred = require("../middleware/LoginRequired");

router.get("/createpost", LoginRequred, (req, res) => {
  console.log(req.user);
  res.send("hello world");
});

router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !name || !password)
    return res.status(422).json({ error: "please enter all the fields" });
  User.findOne({ email: email }).then((savedUser) => {
    if (savedUser) return res.json({ error: "User already exists" });
    bcrypt.hash(password, 12).then((hp) => {
      const user = new User({
        name,
        email,
        password: hp,
      });
      user
        .save()
        .then((user) => res.json({ message: "saved sucessfully" }))
        .catch((err) => console.log(err.message));
    });
  });
});

// router.post("/signin", (req, res) => {
//   const { email, password } = req.body;
//   User.findOne({ email })
//     .then((sU) => {
//       console.log(sU);
//       if (!sU)
//         return res.status(422).json({ message: "Invalid2 Email or Password" });
//       bcrypt
//         .compare(password, sU.password)
//         .then((b) => {
//           if (b) {
//             //return res.json({ message: "signin successfull" });
//             const token = jwt.sign({ _id: sU._id }, jwt_secret, {
//               expiresIn: 36000,
//             });
//             return res.json({ token });
//           }
//           return res
//             .status(422)
//             .json({ message: "Invalid1 Email or Password" });
//         })
//         .catch((err) => console.log(err));
//     })
//     .catch((err) => console.log(err));
// });

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  //console.log(email + " " + password);
  try {
    let user = await User.findOne({ email });
    if (!user)
      return res.status(422).json({ message: "Invalid Email or Password" });
    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(422).json({ message: "Invalid Email or Password" });
    jwt.sign(
      { _id: user._id },
      jwt_secret,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Internal Sever Error");
  }
});

module.exports = router;
