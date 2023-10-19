import { useState } from "react"
import Header from "../Components/Header/Header"
import { Outlet, useLocation } from "react-router-dom"
import Login from "../Components/Login/Login"

export default function Authenticate() {
  const loc = useLocation()

  console.log(loc)
  return (
    <>
      <Header />

      {loc.pathname === "/authenticate" ? <Login /> : <Outlet />}
    </>
  )
}
