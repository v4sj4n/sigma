import { redirect } from "next/navigation"
export default function Home() {
  redirect("/dashboard")
  return (
    <main>
      <div>Main page</div>
    </main>
  )
}
