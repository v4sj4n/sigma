import styles from "./Header.module.css"
const Header = () => {
  return (
    <nav className={styles.navbar}>
      <a href="/">
        <strong>Σ</strong>
      </a>

      <div>
        <a href="">Dashboard</a>
        <a href="">Explore</a>
        <a href="/authenticate">My Profile</a>
      </div>

      <a href="">
        <img src="" alt="" />
        Search
      </a>
    </nav>
  )
}

export default Header
