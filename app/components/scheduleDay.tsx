import { getCoursesByDay } from "@/app/lib/actions";

type ScheduleDayProps = {
  day: string;
};

export default async function ScheduleDay({ day }: ScheduleDayProps) {
  const result = await getCoursesByDay(day);

  if (!result.success) {
    return (
      <tr>
        <td colSpan={6}>Error loading courses {result.error.message}</td>
      </tr>
    );
  }

  const courses = result.data;

  const grades = ["1", "2", "3", "4"];

  return (
    <>
      <tr>
        <td rowSpan={8} className="capitalize">
          {day}
        </td>
        <td>9:00 - 10:00</td>
        {grades.map((grade) =>
          courses.filter(
            (course) =>
              course.time === "9:00 - 10:00" && course.grade === grade,
          ).length > 0 ? (
            <td key={grade}>
              <ul>
                {courses
                  .filter(
                    (course) =>
                      course.time === "9:00 - 10:00" && course.grade === grade,
                  )
                  .map((course) => (
                    <li key={course.id}>{course.name}</li>
                  ))}
              </ul>
            </td>
          ) : (
            <td key={grade}></td>
          ),
        )}
      </tr>
      {[
        "10:00 - 11:00",
        "11:00 - 12:00",
        "12:00 - 13:00",
        "13:00 - 14:00",
        "14:00 - 15:00",
        "15:00 - 16:00",
        "16:00 - 17:00",
      ].map((timeSlot) => (
        <tr key={timeSlot}>
          <td>{timeSlot}</td>
          {grades.map((grade) =>
            courses.filter(
              (course) => course.time === timeSlot && course.grade === grade,
            ).length > 0 ? (
              <td key={grade}>
                <ul>
                  {courses
                    .filter(
                      (course) =>
                        course.time === timeSlot && course.grade === grade,
                    )
                    .map((course) => (
                      <li key={course.id}>{course.name}</li>
                    ))}
                </ul>
              </td>
            ) : (
              <td key={grade}></td>
            ),
          )}
        </tr>
      ))}
    </>
  );
}
