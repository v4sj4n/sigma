import { useEffect, useState } from "react"
import styles from "./Header.module.css"
import Axios from "axios"

const Header = () => {
  const [loggedInUser, setLoggedInUser] = useState(null)
  const getUser = async () => {
    await Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:3000/api/authentication/user",
    }).then((res) => {
      setLoggedInUser(res.data.username)
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

        <a href="/search">
          Search
        </a>
      </div>

      {loggedInUser ? (
        <a href={`/user/${loggedInUser}`}>{loggedInUser}</a>
      ) : (
        <a href="/authenticate">Authenticate</a>
      )}
    </nav>
  )
}

export default Header
