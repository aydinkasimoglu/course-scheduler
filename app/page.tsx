import CourseForm from "@/app/components/courseForm";
import InstructorForm from "@/app/components/instructorForm";
import Schedule from "@/app/components/schedule";
import InstructorDelete from "@/app/components/instructorDelete";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-between p-12">
      <div className="mb-4 flex w-full flex-col justify-end gap-3 md:flex-row">
        <CourseForm />
        <InstructorForm />
        <InstructorDelete />
      </div>
      <Schedule />
    </main>
  );
}
