import { useState, useEffect } from "react"
import Card from "../Card/Card"
import styles from "./Category.module.css"
import Axios from "axios"

type Course = {
  title: string
  imageSrc: string
  identifier: string
  author: string
  authorImageSrc: string
}

const Category = () => {
  const [courses, setCourses] = useState<Course[] | undefined>()

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await Axios.get("http://localhost:3000/api/courses/")
        setCourses(response.data)
      } catch (error) {
        console.error("Error fetching data: ", error)
      }
    }
    fetchCourses()
  }, [])

  return (
    <div className={styles["category-style"]}>
      <h1>Top Courses</h1>
      <div>
        {courses ? (
          courses.map((course) => <Card key={course.identifier} course={course} />)
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  )
}

export default Category
