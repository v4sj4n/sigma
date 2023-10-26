const express = require("express")
const prisma = require("../../db/prisma")

const router = express.Router()

router.get("/courses/search/:query", async (req, res) => {
  const query = req.params.query
  if (!query) {
    return res.status(400).json({ error: "No query provided" })
  }
  try {
    const objToSend = []
    const results = await prisma.course.findMany({
      where: {
        title: {
          mode: "insensitive",
          contains: query,
        },
      },
    })

    for (const result of results) {
      const author = await prisma.user.findUnique({
        where: {
          id: result.authorId,
        },
      })

      const tempObj = {
        title: result.title,
        imageSrc: result.image,
        identifier: result.courseIdentifier,
        author: `${author.firstName} ${author.lastName}`,
        authorImageSrc: author.profileImage,
      }

      objToSend.push(tempObj)
    }
    res.send(objToSend)
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" })
  }
})

router.get("/courses", async (req, res) => {
  try {
    const courses = await prisma.course.findMany()
    const objToSend = []

    for (const course of courses) {
      const author = await prisma.user.findUnique({
        where: {
          id: course.authorId,
        },
      })

      const tempObj = {
        title: course.title,
        imageSrc: course.image,
        identifier: course.courseIdentifier,
        author: `${author.firstName} ${author.lastName}`,
        authorImageSrc: author.profileImage,
      }

      objToSend.push(tempObj)
    }

    res.json(objToSend)
  } catch (error) {
    console.error("Error:", error)
    res.status(500).json({ error: "Internal Server Error" })
  }
})


router.get("/course/:courseIdentifier", async (req, res) => {
  try {
    const course = await prisma.course.findUnique({
      where: {
        courseIdentifier: req.params.courseIdentifier,
      },
    })
    const author = await prisma.user.findUnique({
      where: {
        id: course.authorId,
      },
    })

    const objToSend = {
      title: course.title,
      description: course.description,
      courseImageLocation: course.image,
      price: course.price,
      author: `${author.firstName} ${author.lastName}`,
      authorImageLocation: author.profileImage,
      lessons: course.lessons,
    }
    res.json(objToSend)
  } catch (error) {
    console.error(error)
  }
})

router.get("/course/:courseIdentifier/lesson/:lessonID", async (req, res) => {
  try {
    const course = await prisma.course.findUnique({
      where: {
        courseIdentifier: req.params.courseIdentifier,
      },
    })
    const lesId = req.params.lessonID
    const lessonsArr = course.lessons
    const lessIdx = lessonsArr.findIndex((lesson) => lesson.id === lesId)

    const objToSend = {
      courseTitle: course.title,
      lesson: lessonsArr[lessIdx],
      prevLesson: lessIdx > 0 ? lessonsArr[lessIdx - 1] : null,
      nextLesson:
        lessIdx < lessonsArr.length - 1 ? lessonsArr[lessIdx + 1] : null,
    }

    res.json(objToSend)
  } catch (error) {
    console.error(error)
  }
})

module.exports = router
