import { Link, useNavigate } from "react-router-dom"
import styles from "./Register.module.css"
import { FormEvent, useState } from "react"
import Axios from "axios"

export default function Register() {
  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [username, setUsername] = useState<string>("")
  const [password1, setPassword1] = useState<string>("")
  const [password2, setPassword2] = useState<string>("")
  const navigate = useNavigate()

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault()
    if (password1.length >= 8 && password1 == password2) {
      try {
        await Axios({
          method: "POST",
          withCredentials: true,
          data: {
            firstName,
            lastName,
            email,
            username,
            password: password1,
          },
          url: "http://localhost:3000/api/authentication/register",
        })
        navigate("/authenticate")
      } catch (error) {
        console.error("Registration failed:", error)
      }
    }
  }

  return (
    <div className={styles.registerDiv}>
      <form onSubmit={submitHandler}>
        <h4>Login</h4>
        <label htmlFor="firstName">
          FirstName <br />
          <input
            type="firstName"
            name="firstName"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label htmlFor="lastName">
          LastName <br />
          <input
            type="lastName"
            name="lastName"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <label htmlFor="username">
          Username <br />
          <input
            type="username"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
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
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
          />
        </label>
        <label htmlFor="passwordConfirmation">
          Confirm your password <br />
          <input
            type="password"
            name="passwordConfirmation"
            id="passwordConfirmation"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </label>
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account, <Link to={"/authenticate"}>login</Link>
      </p>
    </div>
  )
}
