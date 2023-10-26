import { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import styles from "./Course.module.css";
import Axios from "axios";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";

interface Course {
 title : string;
 description: string;
 courseImageLocation: string;
 author: string;
 authorImageLocation: string;
 lessons:  string[];
 price: number
}
export default function Course() {

    const { title } = useParams()
    const [course, setCourse] = useState<Course | undefined>()

    useEffect(() => {
     const fetchData = async () => {
      await Axios({
        method: "GET",
        withCredentials: true,
        url: `http://localhost:3000/api/course/${title}`,
      }).then((res) => {
        setCourse(res.data)
      })
     }
     fetchData()
    })
  return (
    <>
      <Header />
      {course ? (
        <div className={styles.courseIntro}>
          <img src={course.courseImageLocation} alt="" />
          <div>
            <h1>{course.title}</h1>
            <p>{course.description}</p>
            <div>
              <img src={course.authorImageLocation} alt="" />
              <p>{course.author}</p>
            </div>
            <p>Price: {course.price}€</p>
            <h3>Lessons</h3>
            <ul>
              {course.lessons.map((lesson) => (
                <li key={lesson.id}>
                  <a href={`/course/${title}/lesson/${lesson.id}`}>
                    {lesson.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <>
          <p>Loading...</p>
        </>
      )}
    </>
  )
}
