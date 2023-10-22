import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from "./App"
import Authenticate from "./Pages/Authenticate/Authenticate"
import UserProfile from "./Pages/UserProfile/UserProfile"


export default function Router() {
  const router = createBrowserRouter([
    { path: "/", element: <App /> },
    {
      path: "authenticate",
      element: <Authenticate />,
    },
    {
      path: "authenticate/register",
      element: <Authenticate />,
    },
    {path: "user/:username", element: <UserProfile />}
  ])

  return <RouterProvider router={router} />
}
