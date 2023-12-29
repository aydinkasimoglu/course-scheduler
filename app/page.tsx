import CourseForm from "./components/courseForm";
import Schedule from "./components/schedule";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <CourseForm />
      <Schedule />
    </main>
  );
}
