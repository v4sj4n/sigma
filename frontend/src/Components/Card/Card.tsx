import styles from "./Card.module.css"
export default function Card(props: {
  course: {
    title: string
    imageSrc: string
    identifier: string
    author: string
    authorImageSrc: string
  }
}) {
  console.log(props)
  return (
    <div className={styles.card}>
      <a href={`/course/${props.course.identifier}`}>
        <img src={props.course.imageSrc} alt="Course name" />
      </a>
      <h1>
        <a href={`/course/${props.course.identifier}`}>{props.course.title}</a>
      </h1>
      <div>
        <a href="">
          <img src={props.course.authorImageSrc} alt="Teacher name" />
        </a>
        <h4>
          <a href="">{props.course.author}</a>
        </h4>
      </div>
    </div>
  )
}
