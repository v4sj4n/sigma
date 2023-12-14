import prisma from "@/lib/prisma"
import Link from "next/link"
import React from "react"

export default async function Page({ params }: { params: { slug: string } }) {
  console.log(params.slug)
  const course = await prisma.course.findUnique({
    where: {
      slug: params.slug,
    },
  })
  console.log(course)
  return (
    <main className="w-[64.5%] ml-auto mr-auto mt-8">
      <h2 className="text-5xl font-bold">{course?.title}</h2>
      <p className="py-2">{course?.description}</p>

      <p className="font-bold">Content</p>
      <div className="flex flex-col">
        {course?.content.map((content) => (
          <Link key={content?.id} className="font-light" href={`/course/${params.slug}/${content?.slug}`}>
            {content?.title}
          </Link>
        ))}
      </div>
    </main>
  )
}
