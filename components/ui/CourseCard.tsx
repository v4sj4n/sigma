"use client"

import Image from "next/image"
import Link from "next/link"

export default function CourseCard({ course }: { course: any }) {
  return (
    <div className="shadow max-w-xs rounded-md overflow-hidden ">
      <Image
        src={`/${course.thumbnail}`}
        alt={`${course.title}'s thumbnail`}
        width={400}
        height={200}
      />
      <h3 className="text-2xl font-bold mt-3 px-4">
        <Link href={`/course/${course.slug}`}>{course.title}</Link>
      </h3>
      <p className="text-sm font-light px-4">{course.description}</p>
      <span className="text-sm px-4 py-4 block">
        {course.author.name} -{" "}
        <span className="font-bold"> @{course.author.username}</span>
      </span>
    </div>
  )
}
