import { getCoursesByDay } from "@/app/lib/actions";
import { getInstructorName } from "@/app/lib/actions";
import courseScheduler from "@/app/lib/courseScheduler";
import EditCourse from "@/app/components/editCourse";

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

  async function getInstructor(id: number) {
    const instructorName = await getInstructorName(id);
    if (instructorName.success) {
      return instructorName.data;
    }
    return "Error loading instructor name";
  }

  const instructorMap: Map<number, string> = new Map();

  for (const course of courses) {
    if (!instructorMap.has(course.instructorId)) {
      const instructorName = await getInstructor(course.instructorId);
      instructorMap.set(course.instructorId, instructorName);
    }

    courseScheduler.graph.addNode(course.id);
  }

  for (const course of courses) {
    const sameTimeCourses = courses.filter(
      (c) =>
        c.time === course.time &&
        c.grade === course.grade &&
        c.id !== course.id,
    );

    for (const sameTimeCourse of sameTimeCourses) {
      if (sameTimeCourse.id !== course.id) {
        courseScheduler.graph.addEdge(course.id, sameTimeCourse.id);
      }
    }
  }

  const colorAssignment = courseScheduler.scheduleCourses();

  function generateColors(setSize: number): string[] {
    const colors: string[] = [];

    for (let i = 0; i < setSize; i++) {
      const hue = (i * 360) / setSize;
      const saturation = 80;
      const lightness = 50;

      colors.push(`hsl(${hue},${saturation}%,${lightness}%)`);
    }

    return colors;
  }

  // Get the number of colors needed
  const numColors = new Set(Array.from(colorAssignment.values())).size;

  // Generate the colors
  const colors = generateColors(numColors);

  // Map each course to a color
  const courseColorMap: Map<number, string> = new Map();

  for (const course of courses) {
    const ca = colorAssignment.get(course.id);

    if (ca === undefined) {
      throw new Error("Color assignment is undefined");
    }

    const color = colors[ca - 1];

    courseColorMap.set(course.id, color);
  }

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
              <ul className="flex flex-col items-center">
                {courses
                  .filter(
                    (course) =>
                      course.time === "9:00 - 10:00" && course.grade === grade,
                  )
                  .map((course) => (
                    <li
                      key={course.id}
                      style={{ backgroundColor: courseColorMap.get(course.id) }}
                      className="flex items-center justify-center rounded-md px-5"
                    >
                      <div id="about">
                        <p className="text-base">
                          {course.name}{" "}
                          <span className="text-xs">
                            ({course.classNumber})
                          </span>
                        </p>
                        <p className="text-xs font-light">
                          {instructorMap.get(course.instructorId)}
                        </p>
                      </div>
                      <div id="dropdown-menu" className="ml-3">
                        <EditCourse id={course.id} />
                      </div>
                    </li>
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
                <ul className="flex flex-col items-center">
                  {courses
                    .filter(
                      (course) =>
                        course.time === timeSlot && course.grade === grade,
                    )
                    .map((course) => (
                      <li
                        key={course.id}
                        style={{
                          backgroundColor: courseColorMap.get(course.id),
                        }}
                        className=" flex items-center justify-center rounded-md px-5"
                      >
                        <div id="about">
                          <p className="text-base">
                            {course.name}{" "}
                            <span className="text-xs">
                              ({course.classNumber})
                            </span>
                          </p>
                          <p className="text-xs font-light">
                            {instructorMap.get(course.instructorId)}
                          </p>
                        </div>
                        <div id="dropdown-menu" className="ml-3">
                          <EditCourse id={course.id} />
                        </div>
                      </li>
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
