import { useState } from "react"
import Header from "../../Components/Header/Header"
import styles from "./Search.module.css"
import Axios from "axios"
import Card from "../../Components/Card/Card"


type Course = {
  title: string
  imageSrc: string
  identifier: string
  author: string
  authorImageSrc: string
}

export default function Search() {
  const [search, setSearch] = useState<string>("")
  const [results, setResults] = useState<Course[] | undefined>([])
  const handleSubmit = async (e) => {
    e.preventDefault()
    setResults([])
    try {
        const response = await Axios({
          withCredentials: true,
          method: "GET",
          url: `http://localhost:3000/api/courses/search/${search}`,
        })
        setResults(response.data)
        setSearch("")
    } catch (error) {
        console.error(error)
    }
  }
  return (
    <>
      <Header />
      <div className={styles.search}>
        <h1>Search</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search for a course"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        <div className={styles.results}>
          {results ? (
            results.map((course) => (
              <Card key={course.identifier} course={course} />
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </>
  )
}
