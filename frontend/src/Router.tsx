import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from "./App"
import Authenticate from "./Pages/Authenticate"

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
  ])

  return <RouterProvider router={router} />
}
