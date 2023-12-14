"use client"

import { signIn } from "next-auth/react"
import Link from "next/link"

import { useState } from "react"
import { Alert } from "../Alert"

export const RegisterForm = () => {
  const [name, setName] = useState<string>()
  const [email, setEmail] = useState<string>()
  const [username, setUsername] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [confirmPassword, setConfirmPassword] = useState<string>()
  const [isAlsoTeacher, setIsAlsoTeacher] = useState<boolean>()
  const [error, setError] = useState<string | null>("")
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          username,
          password,
          confirmPassword,
          isAlsoTeacher,
        }),
      })
      if (res.ok) {
        signIn()
      } else {
        setError((await res.json()).error)
      }
    } catch (err: any) {
      setError(err?.message)
    }
  }
  return (
    <div className="mx-auto md:w-[600px] sm:w-full">
      <form
        onSubmit={handleSubmit}
        className="border border-slate-200 shadow-lg flex flex-col items-center   mx-auto  px-12 pt-12 pb-8 rounded-xl"
      >
        <label className="block mb-4 w-full text-xl" htmlFor="name">
          Name
          <br />
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            className="border rounded-md w-full px-2 h-12"
            placeholder="Enter your name"
          />
        </label>
        <label className="block w-full mb-4 text-xl" htmlFor="username">
          Username
          <br />
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="username"
            className="border w-full rounded-md px-2 h-12"
            placeholder="Enter your username"
            min={6}
            required
          />
        </label>
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
        <label className="block mb-4 w-full text-xl" htmlFor="confirmPassword">
          Confirm Password
          <br />
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            id="confirmPassword"
            className="border rounded-md w-full px-2 h-12"
            placeholder="Enter your password"
            min={6}
            max={64}
            required
          />
        </label>
        <label
          className="flex items-center gap-3 mb-4 mr-auto text-xl"
          htmlFor="confirmPassword"
        >
          Are you also a teacher
          <input
            type="checkbox"
            name="alsoATeacher"
            checked={isAlsoTeacher}
            onChange={(e) => setIsAlsoTeacher(e.target.checked)}
            id="alsoATeacher"
            className="border rounded-md  px-2 h-12"
          />
        </label>
        {error && <Alert>{error}</Alert>}

        <button className="rounded-md mb-8 mt-4 bg-slate-800 text-slate-200 w-full py-2">
          Create account
        </button>
        <p className="text-center">Already have an account yet?</p>
        <Link
          className="text-center text-blue-600 hover:underline hover:text-blue-400"
          href={"/login"}
        >
          Log in to your account
        </Link>
      </form>
    </div>
  )
}
