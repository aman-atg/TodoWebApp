const router = require("express").Router();
const User = require("../../models/users.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

// @Route POST api/auth
// @Desc Auth user
// @access Public
router.post("/", (req, res) => {
  const { email, password } = req.body;
  // simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  // Existing User or Not
  User.findOne({ email }).then(user => {
    if (!user)
      return res.status(400).json({
        msg: "User does not exist"
      });
    //  Validate password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

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

// @Route  GET api/auth/user
// @Desc   Get user data
// @access Private
router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then(user => res.json(user));
});

module.exports = router;
