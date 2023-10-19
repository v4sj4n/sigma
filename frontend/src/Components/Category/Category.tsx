import Card from "../Card/Card"
import styles from "./Category.module.css"

const Category = () => {
  return (
    <div className={styles["category-style"]}>
      <h1>Category Title</h1>
      <div>
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  )
}
export default Category
