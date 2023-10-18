import styles from "./Header.module.css"
const Header = () => {
  return (
    <nav className={styles.navbar}>
      <a href="/">Sigma</a>

      <div>
        <a href="">Dashboard</a>
        <a href="">Explore</a>
        <a href="">My Profile</a>
      </div>

      <a href="">
        <img src="" alt="" />
        Search
      </a>
    </nav>
  )
}

export default Header
