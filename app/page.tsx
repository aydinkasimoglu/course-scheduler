import CourseForm from "@/app/components/courseForm";
import InstructorForm from "@/app/components/instructorForm";
import Schedule from "@/app/components/schedule";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <CourseForm />
      <InstructorForm />
      <Schedule />
    </main>
  );
}
