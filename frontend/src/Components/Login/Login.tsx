import { Link } from "react-router-dom"
import styles from "./Login.module.css"

export default function Login() {
  return (
    <div className={styles.loginDiv}>
      <form action="POST">
        <h4>Login</h4>
        <label htmlFor="email">
          Email <br />
          <input type="email" name="email" id="email" />
        </label>
        <label htmlFor="password">
          Password <br />
          <input type="password" name="password" id="password" />
        </label>
        <button type="submit">Submit</button>
      </form>
      <p>
        Don't have an account,{" "}
        <Link to={"/authenticate/register"}>register</Link>
      </p>
    </div>
  )
}
