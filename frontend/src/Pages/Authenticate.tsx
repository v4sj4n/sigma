import Header from "../Components/Header/Header"
import { useLocation } from "react-router-dom"
import Login from "../Components/Login/Login"
import Register from "../Components/Register/Register"

export default function Authenticate() {
  const loc = useLocation()

  return (
    <>
      <Header />

      {loc.pathname === "/authenticate" ? <Login /> : <Register />}
    </>
  )
}
