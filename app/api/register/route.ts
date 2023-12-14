import prisma from "@/lib/prisma"
import { hash } from "bcrypt"
import { NextResponse } from "next/server"
import { z } from "zod"

const UserRegisterSchema = z.object({
  name: z.string().optional(),
  email: z.string().email(),
  username: z.string().min(6),
  password: z.string().min(6).max(64),
  confirmPassword: z.string().min(6).max(64),
  isAlsoTeacher: z.boolean().optional(),
})

export const POST = async (req: Request) => {
  const { name, email, username, password, confirmPassword, isAlsoTeacher } =
    await req.json()

  const validation = UserRegisterSchema.safeParse({
    name,
    email,
    username,
    password,
    confirmPassword,
    isAlsoTeacher,
  })

  if (!validation.success) {
    const firstIssue = validation.error.issues[0]
    return NextResponse.json(
      { error: `Problem in: ${firstIssue.path[0]} | ${firstIssue.message}` },
      { status: 400 }
    )
  }

  if (password !== confirmPassword) {
    return NextResponse.json(
      { error: "Passwords do not match" },
      { status: 400 }
    )
  }

  const isEmailAlreadyRegistered = prisma.user.findUnique({
    where: {
      email,
    },
  })
  if (!isEmailAlreadyRegistered)
    return NextResponse.json(
      { error: "User with that email exists" },
      { status: 400 }
    )

  const isUsernameAlreadyRegistered = prisma.user.findUnique({
    where: {
      username,
    },
  })
  if (!isUsernameAlreadyRegistered) {
    return NextResponse.json(
      { error: "User with that username exists" },
      { status: 400 }
    )
  }

  try {
    const user = await prisma.user.create({
      data: {
        name: name ?? "",
        email,
        username,
        password: await hash(password, 10),
        isAlsoTeacher,
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
