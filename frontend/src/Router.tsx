import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from "./App"
import Authenticate from "./Pages/Authenticate"
import Register from "./Components/Register/Register"

export default function Router() {
  const router = createBrowserRouter([
    { path: "/", element: <App /> },
    {
      path: "authenticate",
      element: <Authenticate />,
      children: [{ path: "register", element: <Register /> }],
    },
  ])

  return <RouterProvider router={router} />
}
