import { useEffect, useState } from "react"
import Header from "../../Components/Header/Header"
import styles from "./UserProfile.module.css"
import Axios from "axios"
import { useNavigate, useParams } from "react-router-dom"

import Edit from "../../assets/pencil.svg"
import Cancel from "../../assets/window-close.svg"
import Done from "../../assets/check.svg"

interface User {
  firstName: string
  lastName: string
  username: string
  email?: string
  image?: string
  description?: string
  descriptionEdit?: boolean | undefined
  profileImage: string
}

export default function UserProfile() {
  const [user, setUser] = useState<User>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    image: "",
    description: undefined,
    profileImage: "",
  })
  const [toEdit, setToEdit] = useState<boolean>(false)
  const [description, setDescription] = useState<string | null>(null)
  const { username } = useParams()
  const navigate = useNavigate()

  const logoutHandler = async () => {
    await Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:3000/api/authentication/logout",
    })
      .then(() => {
        navigate("/")
      })
      .catch((err) => {
        console.error(err)
      })
  }
  const refresh = () => {
    window.location.reload()
  }
  const saveDescription = async () => {
    if (description) {
      await Axios({
        method: "PUT",
        withCredentials: true,
        url: `http://localhost:3000/api/user/${username}/description`,
        data: {
          description,
        },
      })
        .then((res) => {
          if (res.data.success) {
            refresh()
          }
        })
        .catch((error) => {
          console.error("Error updating description:", error)
        })
    }
  }

  const getUser = () => {
    try {
      Axios({
        method: "GET",
        withCredentials: true,
        url: `http://localhost:3000/api/user/${username}`,
      }).then((res) => {
        console.log(res.data)
        setUser(res.data)
        setDescription(res.data.description)
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
        <img src={user.profileImage} alt={`${user.firstName}'s image`} />
        <input type="file" placeholder="Change picture" />
        {user.firstName && user.lastName && (
          <h2>
            <span>{user.firstName ?? user.firstName}</span>
            {"    "}
            <span>{user.lastName ?? user.lastName}</span>
          </h2>
        )}
        <p>@{user.username}</p>
        {!toEdit ? (
          <div>
            <p>{user.description ? user.description : "No description"}</p>
            {user.descriptionEdit ? (
              <img
                src={Edit}
                alt="edit icon"
                onClick={() => {
                  setToEdit(!toEdit)
                }}
              />
            ) : (
              ""
            )}
          </div>
        ) : (
          <div>
            <input
              type="text"
              placeholder={description ? description : "Enter your description"}
              onChange={(e) => setDescription(e.target.value)}
            />
            <img
              src={Cancel}
              alt="cancel icon"
              onClick={() => {
                setToEdit(!toEdit)
              }}
            />

            <img src={Done} alt="done icon" onClick={saveDescription} />
          </div>
        )}

        {user.email && <button onClick={logoutHandler}>Logout</button>}
      </div>
    </>
  )
}
