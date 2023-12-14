import CourseCard from "@/components/ui/CourseCard"
import prisma from "@/lib/prisma"

export default async function Page() {
  const data = await prisma.course.findMany({
    select: {
      title: true,
      description: true,
      id: true,
      thumbnailLocation: true,
      authorId: true,
      slug: true,
    },
  })
  return (
    <main className=" w-[64.5%] ml-auto mr-auto mt-4">
      <h2 className="text-2xl mb-8">Welcome to your enrolled courses</h2>
      <div className="flex gap-10">
        {data.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </main>
  )
}
