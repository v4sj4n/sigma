const express = require("express")
const Users = require("../../Users")
const router = express.Router()

router.post("/login", (req, res) => {
  console.log({name: req.body.name, password: req.body.password})
})
router.post("/register", (req, res) => {})


module.exports = router