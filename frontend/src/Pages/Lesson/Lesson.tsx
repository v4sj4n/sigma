import { useEffect, useState } from "react"
import Header from "../../Components/Header/Header"
import styles from "./Lesson.module.css"
import Axios from "axios"
import { useParams } from "react-router-dom"

interface lesson {
  id: string
  location: string
  title: string
}
interface fetchedData {
  courseTitle: string
  lesson: lesson
  nextLesson?: lesson
  prevLesson?: lesson
}

export default function Lesson() {
  const { course, lesson } = useParams()
  const [fetchedData, setFetchedData] = useState<fetchedData | undefined>()
  useEffect(() => {
    const fetchData = async () => {
      await Axios({
        method: "GET",
        withCredentials: true,
        url: `http://localhost:3000/api/course/${course}/lesson/${lesson}`,
      }).then((res) => {
        setFetchedData(res.data)
      })
    }
    fetchData()
  })
  return (
    <>
      <Header />
      {fetchedData ? (
        <div className={styles.lessonPage}>
          <h1>{fetchedData.courseTitle}</h1>
          <h3>Lesson: {fetchedData.lesson.title}</h3>

          <video src={fetchedData.lesson.location} autoPlay controls></video>
          <div className={styles.lowerDiv}>
            {fetchedData.prevLesson && fetchedData.nextLesson ? (
              <>
                <a
                  href={`/course/${course}/lesson/${fetchedData.prevLesson.id}`}
                >
                  Previous Lesson
                </a>

                <a
                  className={styles.allLessonsAnchor}
                  href={`/course/${course}/`}
                >
                  All lessons
                </a>
                <a
                  href={`/course/${course}/lesson/${fetchedData.nextLesson.id}`}
                >
                  Next Lesson
                </a>
              </>
            ) : fetchedData.prevLesson && !fetchedData.nextLesson ? (
              <>
                <a
                  href={`/course/${course}/lesson/${fetchedData.prevLesson.id}`}
                >
                  Previous Lesson
                </a>

                <a
                  href={`/course/${course}/`}
                  className={styles.allLessonsAnchor}
                >
                  All lessons
                </a>
              </>
            ) : (
              <>
                <a
                  className={styles.allLessonsAnchor}
                  href={`/course/${course}/`}
                >
                  All lessons
                </a>
                <a
                  href={`/course/${course}/lesson/${fetchedData.nextLesson.id}`}
                >
                  Next Lesson
                </a>
              </>
            )}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  )
}
