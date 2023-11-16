import prisma from '@/lib/prisma'
import { hash } from 'bcrypt'
import { NextResponse } from 'next/server'

export const POST = async (req: Request) => {
  try {
    const { name, email, username, password, confirmPassword } =
      await req.json()

    const isEmailAlreadyRegistered = prisma.user.findUnique({
      where: {
        email,
      },
    })
    if (!isEmailAlreadyRegistered)
      return NextResponse.json(
        { message: 'User with that email exists' },
        { status: 400 }
      )

    const isUsernameAlreadyRegistered = prisma.user.findUnique({
      where: {
        username,
      },
    })
    if (!isUsernameAlreadyRegistered) {
      return NextResponse.json(
        { message: 'User with that username exists' },
        { status: 400 }
      )
    }
    if (password.length < 6) {
      return NextResponse.json(
        { message: 'Password is too short, must be more than 6 characters' },
        { status: 400 }
      )
    }
    if (password !== confirmPassword) {
      return NextResponse.json(
        { message: 'Passwords do not match' },
        { status: 400 }
      )
    }
    const user = await prisma.user.create({
      data: {
        name: name ?? '',
        email,
        username,
        password: await hash(password, 10),
      },
    })

    return NextResponse.json(
      {
        user: {
          name: user.name,
          email: user.email,
          username: user.username,
        },
      },
      { status: 201 }
    )
  } catch (err: any) {
    return NextResponse.json({ error: err?.message }, { status: 500 })
  }
}
