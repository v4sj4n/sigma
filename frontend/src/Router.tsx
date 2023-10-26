import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from "./App"
import Authenticate from "./Pages/Authenticate/Authenticate"
import UserProfile from "./Pages/UserProfile/UserProfile"
import Course from "./Pages/Course/Course"
import Lesson from "./Pages/Lesson/Lesson"
import Search from "./Pages/Search/Search"

export default function Router() {
  const router = createBrowserRouter([
    { path: "/", element: <App /> },
    {
      path: "authenticate",
      element: <Authenticate />,
    },
    {
      path: "search",
      element: <Search />,
    },
    {
      path: "authenticate/register",
      element: <Authenticate />,
    },
    { path: "user/:username", element: <UserProfile /> },
    {path: "course/:title", element: <Course />},
    {path: "course/:course/lesson/:lesson", element: <Lesson />},
  ])

  return <RouterProvider router={router} />
}
