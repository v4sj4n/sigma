const express = require("express")
const Users = require("../../Users")
const router = express.Router()
const db = require("../../db")

const login = async (email, password) => {
  try {
    const result = await db.query(
      "SELECT password FROM users WHERE email = $1",
      [email]
    )
    if (result.rows.length === 0) return false
    if (result.rows[0].password === password) {
      return true
    } else {
      return false
    }
  } catch (err) {
    console.error(err)
  }
}
const registration = async (email, password) => {
  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ])
    if (result.rows.length === 0) {
      try {
        await db.query(
          "INSERT INTO users(email, password, created_on, last_login) VALUES ($1, $2, $3, $4)",
          [email, password, "NOW()", "NOW()"]
        )
          return true
      } catch (err) {
        console.error(err)
        return false
      }
    }
  } catch (err) {
    console.error(err)
    return false
  }
}

router.post("/login", async (req, res) => {
  const user = { email: req.body.email, password: req.body.password }

  const isLoggedIn = await login(user.email, user.password)
  if (isLoggedIn) {
    console.log(`Welcome back ${user}`)
  } else {
    console.log(`No user: ${user}`)
  }
  res.json(user)
})
router.post("/register", async (req, res) => {
  const user = { email: req.body.email, password: req.body.password }

  const isRegistered = await registration(user.email, user.password)
  if(isRegistered) console.log("User registered succesfully", user)
  res.json(user)
})

module.exports = router
