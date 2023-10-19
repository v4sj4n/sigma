const express = require("express")
const Users = require("../../Users")
const router = express.Router()

router.post("/login", (req, res) => {
  const user = { email: req.body.email, password: req.body.password }
  console.log(user)
  res.json(user)
})
router.post("/register", (req, res) => {
  const user = { email: req.body.email, password: req.body.password }
  console.log(user)
  res.json(user)
})

module.exports = router
