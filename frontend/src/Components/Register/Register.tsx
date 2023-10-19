import { Link, redirect } from "react-router-dom"
import styles from "./Register.module.css"
import { useState } from "react"
import axios from "axios"

export default function Register() {
  const [email, setEmail] = useState<string>("")
  const [password1, setPassword1] = useState<string>("")
  const [password2, setPassword2] = useState<string>("")

  const submitHandler = async () => {
    if (password1.length > 8) {
      if (password1 === password2) {
        const URL = "http://localhost:3000/api/authentication/register"
        await axios.post(URL, {email: email, password: password1})
        
      }
    }
    redirect("/")
    // When the database connection is made I will check the db first for a user with this email
  }
  return (
    <div className={styles.registerDiv}>
      <form>
        <h4>Login</h4>
        <label htmlFor="email">
          Email <br />
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="password">
          Password <br />
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword1(e.target.value)}
          />
        </label>
        <label htmlFor="passwordConfirmation">
          Confirm your password <br />
          <input
            type="password"
            name="passwordConfirmation"
            id="passwordConfirmation"
            onChange={(e) => setPassword2(e.target.value)}
          />
        </label>
        <button type="submit" onSubmit={async (e) => {
          e.preventDefault()
          await submitHandler()
        }}>
          Register
        </button>
      </form>
      <p>
        Already have an account, <Link to={"/authenticate"}>login</Link>
      </p>
    </div>
  )
}
