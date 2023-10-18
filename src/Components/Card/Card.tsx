import styles from "./Card.module.css"
export default function Card() {
  return (
    <div className={styles.card}>
      <img src="template.png" alt="Course name" />
        <h1>Course Title</h1>
      <div>
        <img src="teacher.png" alt="Teacher name" />
        <h4>Teacher Name</h4>
      </div>
    </div>
  )
}
