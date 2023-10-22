import { Link, useNavigate } from "react-router-dom"
import styles from "./Login.module.css"
import { FormEvent, useState } from "react"
import Axios from "axios"

export default function Login() {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const navigate = useNavigate()

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const response = await Axios({
        method: "POST",
        url: "http://localhost:3000/api/authentication/login",
        withCredentials: true,
        data: {
          email,
          password,
        },
      })
      console.log(response)
      if (response.data !== "No User Exists") {
        navigate("/")
      }
    } catch (error) {
      console.error("Login failed:", error)
    }
  }

  return (
    <div className={styles.loginDiv}>
      <form onSubmit={submitHandler}>
        <h4>Login</h4>
        <label htmlFor="email">
          Email <br />
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="password">
          Password <br />
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Log in</button>
      </form>
      <p>
        Don't have an account,{" "}
        <Link to={"/authenticate/register"}>register</Link>
      </p>
    </div>
  )
}
