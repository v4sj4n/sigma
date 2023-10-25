const express = require('express');
const prisma = require("../../db/prisma");

const router = express.Router();


router.get("/courses", async (req, res) => {
    const courses = await prisma.course.findMany()
    res.json(courses)
})


router.get("/course/:id", async (req, res) => {
    try {
        const course = await prisma.course.findUnique({
          where: {
            id: parseInt(req.params.id),
          },
        })
        const author = await prisma.user.findUnique({
            where: {
                id: course.authorId
            }
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

router.get("/course/:courseID/lesson/:lessonID", async (req, res) => {
  try {
    const course = await prisma.course.findUnique({
      where: {
        id: parseInt(req.params.courseID),
      },
    })
    const lesId = req.params.lessonID
    const lessonsArr = course.lessons
    const lessIdx = lessonsArr.findIndex(lesson => lesson.id === lesId)
    console.log(lessonsArr)

    console.log(lessIdx)


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