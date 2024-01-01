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
  } catch (error) {
    return `Error while creating course: ${error}`;
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

export async function getInstructors(): Promise<Result<Instructor[]>> {
  try {
    const instructors = await prisma.instructor.findMany();

    return { success: true, data: instructors };
  } catch (error) {
    return { success: false, error: error as Error };
  }
}

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
