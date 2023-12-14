  import prisma from "@/lib/prisma"
  import Link from "next/link"
  import React from "react"

  export default async function Page({
    params,
  }: {
    params: { slug: string; id: string }
  }) {
    const course = await prisma.course.findUnique({
      where: {
        slug: params.slug,
      },
    })
    const foundCourse = course?.content.find(
      (content) => content?.slug === params.id
    )

    const Controls = () => {
      if (course?.content.length - 1 > foundCourse?.id && foundCourse?.id > 0) {
        const prevCourse = course?.content.at(
          course?.content.indexOf(foundCourse) - 1
        )
        const nextCourse = course?.content.at(
          course?.content.indexOf(foundCourse) + 1
        )

        return (
          <div className="flex justify-between w-44 m-auto">
            <Link
              href={`/course/${params.slug}/${prevCourse.slug}`}
              className="hover:underline"
            >
              Previous
            </Link>
            <Link
              href={`/course/${params.slug}/${nextCourse.slug}`}
              className="hover:underline"
            >
              Next
            </Link>
          </div>
        )
      }
      if (course?.content.length - 1 > foundCourse?.id) {
        const nextCourse = course?.content.at(
          course?.content.indexOf(foundCourse) + 1
        )

        return (
          <div className="flex justify-center w-44 m-auto">
            <Link
              href={`/course/${params.slug}/${nextCourse.slug}`}
              className="hover:underline"
            >
              Next
            </Link>
          </div>
        )
      }
      if (course?.content.length - 1 === foundCourse?.id) {
        const prevCourse = course?.content.at(
          course?.content.indexOf(foundCourse) - 1
        )

        return (
          <div className="flex justify-center w-44 m-auto">
            <Link
              href={`/course/${params.slug}/${prevCourse.slug}`}
              className="hover:underline"
            >
              Previous
            </Link>
          </div>
        )
      }
    }
    return (
      <main className="w-[64.5%] ml-auto mr-auto mt-8">
        <div className="flex items-end gap-2 mb-4">
          <h2 className="text-5xl font-bold "> <Link href={`/course/${params.slug}`}> {course?.title}</Link>:</h2>
          <h3 className="text-2xl font-light">{foundCourse.title}</h3>
        </div>

        <video
          controls
          src="/courseContents/test.mp4"
          autoPlay
          loop
          className="py-4"
        />
        <Controls />
      </main>
    )
  }
