const router = require("express").Router();
const User = require("../../models/users.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// @Route POST api/users
// @Desc Register a new user
// @access Public
router.post("/", (req, res) => {
  const { name, email, password } = req.body;
  // simple validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  // Existing User or Not
  User.findOne({ email }).then(user => {
    if (user)
      return res.status(400).json({
        msg: "User already exists"
      });
    // creating new User
    const newUser = new User({
      name,
      email,
      password
    });

    // Create salt & hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;

        newUser.save().then(user => {
          jwt.sign({ id: user.id }, "MyF*cking__Sec", (err, token) => {
            if (err) throw err;

            res.json({
              token,
              user: {
                id: user.id,
                name: user.name,
                email: user.email
              }
            });
          });
        });
      });
    });
  });
});

module.exports = router;
