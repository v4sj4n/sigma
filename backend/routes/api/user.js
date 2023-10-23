const express = require("express")
const prisma = require("../../db/prisma")
const multer = require("multer")
const path = require("path")

const router = express.Router()

const passport = require("passport")

router.use(passport.initialize())
router.use(passport.session())

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, path.join(__dirname, "../../files/profileImages"))
  },
  filename: (req, file, cb) => {
    return cb(
      null,
      `${req.params.username}_image${path.extname(file.originalname)}`
    )
  },
})

const upload = multer({ storage })

router.get("/:username", async (req, res) => {
  const signedInUser = (await req.user) ? req.user.username : null

  const { username } = req.params

  const fieldsToUse = {
    firstName: true,
    lastName: true,
    username: true,
    description: true,
    profileImage: true,
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
      resultToSend = {
        ...result,
        descriptionEdit: true,
        profileImageEdit: true,
      }
      res.json(resultToSend)
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
      res.json({ ...result, descriptionEdit: false, profileImageEdit: false })
    } catch (error) {
      res.status(500).json({ error })
    }
  }
})
router.put("/:username/description", async (req, res) => {
  const signedInUser = await req.user.username
  const { username } = req.params
  if (signedInUser === username) {
    try {
      await prisma.user.update({
        where: {
          username,
        },
        data: {
          description: req.body.description,
        },
      })
      res.status(200).json({ success: true })
    } catch (error) {
      console.error(error)
      res.status(500).json({ success: false })
    }
  }
})

router.put(
  "/:username/image",
  upload.single("profileImage"),
  async (req, res) => {
    const signedInUser = await req.user.username
    const { username } = req.params
    if (signedInUser === username) {
      try {
        await prisma.user.update({
          where: {
            username,
          },
          data: {
            profileImage: `http://localhost:3000/files/profileImages/${req.file.filename}`,
          },
        })
        res.status(200).json({ success: true })
      } catch (error) {
        console.error(error)
        res.status(500).json({ success: false })
      }
    }
  }
)

module.exports = router
