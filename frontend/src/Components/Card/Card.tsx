import styles from "./Card.module.css"
export default function Card() {
  return (
    <div className={styles.card}>
      <a href="">
        <img src="template.png" alt="Course name" />
      </a>
      <h1>
        <a href="">Course Title</a>
      </h1>
      <div>
          <a href="">
            <img src="teacher.png" alt="Teacher name" />
          </a>
          <h4>
            <a href="">Teacher Name</a>
          </h4>
      </div>
    </div>
  )
}
