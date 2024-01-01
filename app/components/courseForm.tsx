"use client";

import { useState, useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { createCourse, getInstructors } from "@/app/lib/actions";
import { Instructor } from "@prisma/client";

export default function CourseForm() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const dayRef = useRef<HTMLSelectElement>(null);
  const timeRef = useRef<HTMLSelectElement>(null);
  const gradeRef = useRef<HTMLSelectElement>(null);
  const classRef = useRef<HTMLSelectElement>(null);
  const instructorRef = useRef<HTMLSelectElement>(null);
  const [errorMessage, dispatch] = useFormState(createCourse, undefined);
  const [instructors, setInstructors] = useState<Instructor[]>([]);

  useEffect(() => {
    const loadInstructors = async () => {
      const result = await getInstructors();

      if (result.success) {
        setInstructors(result.data);
      }
    };

    loadInstructors();
  });

  function resetForm() {
    if (nameRef.current) {
      nameRef.current.value = "";
    }
    if (dayRef.current) {
      dayRef.current.value = "";
    }
    if (timeRef.current) {
      timeRef.current.value = "";
    }
    if (gradeRef.current) {
      gradeRef.current.value = "";
    }
    if (classRef.current) {
      classRef.current.value = "";
    }
    if (instructorRef.current) {
      instructorRef.current.value = "";
    }
  }

  function closeDialog() {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  }

  function openDialog() {
    resetForm();

    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={openDialog}
        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Create
      </button>

      <dialog ref={dialogRef} className="absolute m-auto bg-transparent">
        <form
          action={dispatch}
          className="mb-4 rounded-md px-8 pb-8 pt-6 shadow-md"
        >
          <div className="mb-4">
            <label className="styledLabel" htmlFor="name">
              Name
            </label>
            <input
              ref={nameRef}
              id="name"
              className="textfield"
              name="name"
              type="text"
              placeholder="Name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="styledLabel" htmlFor="description">
              Day
            </label>
            <select
              ref={dayRef}
              id="day"
              name="day"
              className="textfield"
              defaultValue=""
              required
            >
              <option value="" disabled>
                Select a day
              </option>
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="styledLabel" htmlFor="price">
              Time
            </label>
            <select
              ref={timeRef}
              id="time"
              name="time"
              className="textfield"
              defaultValue=""
              required
            >
              <option value="" disabled>
                Select a time
              </option>
              <option value="9:00 - 10:00">9:00 - 10:00</option>
              <option value="10:00 - 11:00">10:00 - 11:00</option>
              <option value="11:00 - 12:00">11:00 - 12:00</option>
              <option value="12:00 - 13:00">12:00 - 13:00</option>
              <option value="13:00 - 14:00">13:00 - 14:00</option>
              <option value="14:00 - 15:00">14:00 - 15:00</option>
              <option value="15:00 - 16:00">15:00 - 16:00</option>
              <option value="16:00 - 17:00">16:00 - 17:00</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="styledLabel" htmlFor="grade">
              Grade
            </label>
            <select
              ref={gradeRef}
              id="grade"
              name="grade"
              className="textfield"
              defaultValue=""
              required
            >
              <option value="" disabled>
                Select a grade
              </option>
              <option value="1">1st</option>
              <option value="2">2nd</option>
              <option value="3">3rd</option>
              <option value="4">4th</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="styledLabel" htmlFor="class">
              Class
            </label>
            <select
              ref={classRef}
              id="class"
              name="classNumber"
              className="textfield"
              defaultValue=""
              required
            >
              <option value="" disabled>
                Select a class
              </option>
              <option value="1036">1036</option>
              <option value="1040">1040</option>
              <option value="1041">1041</option>
              <option value="1044">1044</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="styledLabel" htmlFor="instructor">
              Instructor
            </label>
            <select
              ref={instructorRef}
              id="instructor"
              name="instructor"
              className="textfield"
              defaultValue=""
              required
            >
              <option value="" disabled>
                Select an instructor
              </option>
              {instructors.map((instructor) => (
                <option key={instructor.id} value={instructor.id}>
                  {instructor.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold leading-6"
              onClick={closeDialog}
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={closeDialog}
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Create
            </button>
          </div>

          <div
            className="flex h-8 items-end space-x-1"
            aria-live="polite"
            aria-atomic="true"
          >
            {errorMessage && (
              <p className="text-sm text-red-500">{errorMessage}</p>
            )}
          </div>
        </form>
      </dialog>
    </>
  );
}
