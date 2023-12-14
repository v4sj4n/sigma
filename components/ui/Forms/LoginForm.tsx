"use client"

import { signIn } from "next-auth/react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Alert } from "../Alert"
import { z } from "zod"

const LoginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(64),
})

export const LoginForm = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/"
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<string | null>("")
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const validation = LoginFormSchema.safeParse({ email, password })
      if (!validation.success) {
        const firstIssue = validation.error.issues[0]
        setError(`Problem in: ${firstIssue.path[0]} | ${firstIssue.message}`)
      } else {
        const res = await signIn("credentials", {
          redirect: false,
          email,
          password,
          callbackUrl,
        })
        if (!res?.error) {
          const routeToPush = callbackUrl.endsWith("register")
            ? "/"
            : callbackUrl
          router.push(routeToPush)
        } else {
          setError("Invalid email or password")
        }
      }
    } catch (error) {}
  }
  return (
    <div className="mx-auto md:w-[600px] sm:w-full">
      <form
        onSubmit={handleSubmit}
        className="border border-slate-200 shadow-lg flex flex-col items-center   mx-auto  px-12 pt-12 pb-8 rounded-xl"
      >
        <label className="block mb-4 w-full text-xl" htmlFor="email">
          Email
          <br />
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            className="border w-full rounded-md px-2 h-12"
            placeholder="Enter your email"
            required
          />
        </label>
        <label className="block mb-4 w-full text-xl" htmlFor="password">
          Password
          <br />
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            className="border rounded-md w-full px-2 h-12"
            placeholder="Enter your password"
            min={6}
            max={64}
            required
          />
        </label>

        {error && <Alert>{error}</Alert>}

        <button className="rounded-md mb-8 mt-4 bg-slate-800 text-slate-200 w-full py-2">
          Log in
        </button>
        <p className="text-center">Haven&apos;t created an account yet?</p>
        <Link
          className="text-center text-blue-600 hover:underline hover:text-blue-400"
          href={"/register"}
        >
          Create your account
        </Link>
      </form>
    </div>
  )
}
