"use server";

import prisma from "@/app/lib/prisma";
import { Course, Instructor } from "@prisma/client";
import { revalidatePath } from "next/cache";

type Result<T> = { success: true; data: T } | { success: false; error: Error };

/**
 * Creates a new course in the database.
 *
 * @param currentState Current state of the form.
 * @param formData Submitted form data.
 * @returns Error message if any.
 */
export async function createCourse(
  currentState: string | undefined,
  formData: FormData,
) {
  try {
    const { name, day, time, grade, classNumber, instructor } =
      Object.fromEntries(formData.entries());

    const conflict = await checkConflicts(
      String(day),
      String(time),
      Number(classNumber),
      Number(instructor),
    );

    if (!conflict) {
      await prisma.course.create({
        data: {
          name: String(name),
          day: String(day),
          time: String(time),
          grade: String(grade),
          classNumber: Number(classNumber),
          instructor: {
            connect: {
              id: Number(instructor),
            },
          },
        },
      });

      revalidatePath("/");
    } else {
      return `There's already a course on ${String(day)} at ${String(
        time,
      )} for Instructor ${Number(instructor)}`;
    }
  } catch (error) {
    return `Error while creating course: ${error}`;
  }
}

/**
 * Checks for conflicts when creating a new course.
 *
 * @param day The day of the week for the new course.
 * @param time The time of day for the new course.
 * @param classNumber The class number for the new course.
 * @param instructorId The ID of the instructor for the new course.
 * @returns true if any conflict is found, false otherwise.
 */
async function checkConflicts(
  day: string,
  time: string,
  classNumber: number,
  instructorId: number,
): Promise<boolean> {
  // Check for time conflicts
  const timeConflict = await prisma.course.findFirst({
    where: {
      day,
      time,
    },
  });

  // Check for class number conflicts
  const classNumberConflict = await prisma.course.findFirst({
    where: {
      classNumber,
    },
  });

  // Check for instructor availability conflicts
  const instructorAvailabilityConflict = await prisma.course.findFirst({
    where: {
      instructorId,
      day,
      time,
    },
  });

  // Return true if any conflict is found
  return (
    timeConflict !== null ||
    classNumberConflict !== null ||
    instructorAvailabilityConflict !== null
  );
}

/**
 * Gets an instructor's name by ID.
 *
 * @param id
 * @returns instructor name or error
 */
export async function getInstructorName(id: number): Promise<Result<string>> {
  try {
    const instructor = await prisma.instructor.findUnique({
      where: {
        id: id,
      },
    });

    return { success: true, data: instructor?.name ?? "" };
  } catch (error) {
    return { success: false, error: error as Error };
  }
}

/**
 * Filters courses by given day.
 *
 * @param day Day to filter by.
 * @returns Filtered courses or error.
 */
export async function getCoursesByDay(day: string): Promise<Result<Course[]>> {
  try {
    const courses = await prisma.course.findMany({
      where: {
        day: day,
      },
    });

    return { success: true, data: courses };
  } catch (error) {
    return { success: false, error: error as Error };
  }
}

/**
 * Gets all instructors.
 *
 * @returns All instructors or error.
 */
export async function getInstructors(): Promise<Result<Instructor[]>> {
  try {
    const instructors = await prisma.instructor.findMany();

    return { success: true, data: instructors };
  } catch (error) {
    return { success: false, error: error as Error };
  }
}

/**
 * Creates a new instructor in the database.
 *
 * @param currentState Current state of the form.
 * @param formData Submitted form data.
 * @returns Error message if any.
 */
export async function createInstructor(
  currentState: string | undefined,
  formData: FormData,
) {
  try {
    const { name } = Object.fromEntries(formData.entries());

    await prisma.instructor.create({
      data: {
        name: String(name),
      },
    });

    revalidatePath("/");
  } catch (error) {
    return `Error while creating instructor: ${error}`;
  }
}

/**
 * Deletes an instructor in the database.
 *
 * @param currentState Current state of the form.
 * @param formData Submitted form data.
 * @returns Error message if any.
 */
export async function deleteInstructor(
  currentState: string | undefined,
  formData: FormData,
) {
  try {
    const { instructor } = Object.fromEntries(formData.entries());

    const anyCourse = await prisma.course.findFirst({
      where: {
        instructorId: Number(instructor),
      },
    });

    if (anyCourse) {
      const result = await getInstructorName(Number(instructor));

      if (result.success) {
        return `Instructor with ID ${Number(instructor)} (${
          result.data
        }) has a course.`;
      }
    } else {
      await prisma.instructor.delete({
        where: {
          id: Number(instructor),
        },
      });
    }

    revalidatePath("/");
  } catch (error) {
    return `Error while deleting an instructor: ${error}`;
  }
}
