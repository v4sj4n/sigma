const express = require("express")
const prisma = require("../../db/prisma")

const router = express.Router()

const passport = require("passport")

router.use(passport.initialize())
router.use(passport.session())

router.get("/:username", async (req, res) => {
  const signedInUser = await req.user.username
  const { username } = req.params
  const fieldsToUse = {
    firstName: true,
    lastName: true,
    username: true,
    description: true,
  }
  if (username === signedInUser) {
    fieldsToUse.email = true
    try {
      const result = await prisma.user.findUnique({
        select: fieldsToUse,
        where: {
          username,
        },
      })
      res.json(result)
    } catch (error) {
      res.status(500).json({ error })
    }
  } else {
    try {
      const result = await prisma.user.findUnique({
        select: fieldsToUse,
        where: {
          username,
        },
      })
      res.json(result)
    } catch (error) {
      res.status(500).json({ error })
    }
  }
})

module.exports = router
