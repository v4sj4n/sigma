import { useEffect, useState } from "react"
import styles from "./Header.module.css"
import Axios from "axios"
const Header = () => {

  const [loggedInUser, setLoggedInUser] = useState(null)
  const getUser = () => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:3000/api/authentication/user",
    }).then((res) => {
      setLoggedInUser(res.data.username)
      console.log(res.data)
    })
  }

  useEffect(() => {
    getUser()
  }, [])
  return (
    <nav className={styles.navbar}>
      <a href="/">
        <strong>Σ</strong>
      </a>

      <div>
        <a href="/">Dashboard</a>
        <a href="/">Explore</a>
        {loggedInUser ? (
          <a href="/myProfile">
            {loggedInUser}
          </a>
        ) : (
          <a href="/authenticate">
            Authenticate
          </a>
        )}
      </div>

      <a href="">
        <img src="" alt="" />
        Search
      </a>
    </nav>
  )
}

export default Header
