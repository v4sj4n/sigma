'use client'

import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Alert } from '../Alert'

export const LoginForm = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [error, setError] = useState<string | null>('')
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
        callbackUrl,
      })
      if (!res?.error) {
        router.push(callbackUrl)
      } else {
        setError('Invalid email or password')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='mx-auto '>
      <form
        onSubmit={onSubmit}
        className='border border-slate-200 shadow-lg flex flex-col items-center  mx-auto max-w-fit px-20 pt-12 pb-8 rounded-xl'
      >
        <label className='block mb-4 text-xl' htmlFor='email'>
          Email
          <br />
          <input
            type='email'
            name='email'
            id='email'
            onChange={(e) => setEmail(e.target.value)}
            className='border rounded-md px-2 h-12'
            placeholder='Enter your email'
            required
          />
        </label>
        <label className='block mb-4 text-xl' htmlFor='password'>
          Password
          <br />
          <input
            type='password'
            name='password'
            id='password'
            onChange={(e) => setPassword(e.target.value)}
            className='border rounded-md px-2 h-12'
            placeholder='Enter your password'
            required
          />
        </label>
        {error && <Alert>{error}</Alert>}

        <button className='rounded-md mb-8 mt-4 bg-slate-800 text-slate-200 w-full py-2'>
          Log in
        </button>
        <p className='text-center'>Haven&apos;t created an account yet?</p>
        <Link
          className='text-center text-blue-600 hover:underline hover:text-blue-400'
          href={'/register'}
        >
          Create an account
        </Link>
      </form>
    </div>
  )
}
