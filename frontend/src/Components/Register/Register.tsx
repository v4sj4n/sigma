import { Link, useNavigate } from "react-router-dom"
import styles from "./Register.module.css"
import { FormEvent, useState } from "react"
import axios from "axios"

export default function Register() {
  const [email, setEmail] = useState<string>("")
  const [password1, setPassword1] = useState<string>("")
  const [password2, setPassword2] = useState<string>("")
  const navigate = useNavigate()

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault()
    if (password1.length > 8 && password1 === password2) {
      const URL = "http://localhost:3000/api/authentication/register"
      try {
        await axios.post(URL, { email, password: password1 })
        navigate("/")
      } catch (error) {
        console.error("Registration failed:", error)
      }
    }
  }

  return (
    <div className={styles.registerDiv}>
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
