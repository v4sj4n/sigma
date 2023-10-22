import { useEffect, useState } from "react"
import Header from "../../Components/Header/Header"
import styles from "./UserProfile.module.css"
import Axios from "axios"
import { useNavigate, useParams } from "react-router-dom"


interface User {
  firstName: string
  lastName: string
  username: string
  email?: string
  image?: string
}

export default function UserProfile() {
  const [user, setUser] = useState<User>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    image: "",
  })
  const { username } = useParams()
  const navigate = useNavigate()


  const logoutHandler = async () => {
    await Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:3000/api/authentication/logout",
    })
      .then((res) => {
        console.log(res.data)
        navigate("/")

      })
      .catch((err) => {
        console.error(err)
      })
  }

  const getUser = () => {
    try {
      Axios({
        method: "GET",
        withCredentials: true,
        url: `http://localhost:3000/api/user/${username}`,
      }).then((res) => {
        setUser(res.data)
      })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getUser()
  }, [])
  return (
    <>
      <Header />
      <div className={styles["user-profile"]}>
        <img src={"/teacher.png"} alt={`{user.image}'s image`} />
        {user.firstName && user.lastName && (
          <h2>
            <span>{user.firstName ?? user.firstName}</span>
            {"    "}
            <span>{user.lastName ?? user.lastName}</span>
          </h2>
        )}
        <p>@{user.username}</p>
        <p>You can also enter your preferred description in here</p>

        {user.email && <button onClick={logoutHandler}>Logout</button>}
      </div>
    </>
  )
}
