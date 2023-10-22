const express = require("express")
const router = express.Router()
const passport = require("passport")
const bcrypt = require("bcrypt")
const prisma = require("../../db/prisma")

router.use(passport.initialize())
router.use(passport.session())
require("../../passportConfig.js")(passport)

// Routes
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) throw err
    if (!user) res.send("No User Exists")
    else {
      req.logIn(user, (err) => {
        if (err) throw err
        res.send("Successfully Authenticated")
      })
    }
  })(req, res, next)
})

router.post("/register", async (req, res) => {
  const existingUser = await prisma.user.findFirst({
    where: { email: req.body.email },
  })

  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User with this email already exists" })
  }

  const hashedPsw = await bcrypt.hash(req.body.password, 10)
  await prisma.user.create({
    data: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPsw,
      username: req.body.username,
    },
  })

  res.status(201).json({ message: "User registered successfully" })
})

router.get("/user", (req, res) => {
  if (req) return res.send(req.user)
  else {
    return res.json({ msg: "Can't find logged in user" })
  }
})
router.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      console.log("Error logging out:", err)
    }
    res.send("Logged out successfully")
  })
})

module.exports = router
