import { Link,  } from "react-router-dom"
import styles from "./Login.module.css"
import { useState } from "react"

export default function Login() {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")


  return (
    <div className={styles.loginDiv}>
      <form
  method="POST"
  action="http://localhost:3000/api/authentication/login"
>
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
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button
          type="submit" >
          Log in
        </button>
      </form>
      <p>
        Don't have an account,{" "}
        <Link to={"/authenticate/register"}>register</Link>
      </p>
    </div>
  )
}
