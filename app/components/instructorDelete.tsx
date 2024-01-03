"use client";

import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import { deleteInstructor, getInstructors } from "@/app/lib/actions";
import { Instructor } from "@prisma/client";

export default function InstructorDelete() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const instructorRef = useRef<HTMLSelectElement>(null);
  const [errorMessage, dispatch] = useFormState(deleteInstructor, undefined);
  const [instructors, setInstructors] = useState<Instructor[]>([]);

  useEffect(() => {
    const loadInstructors = async () => {
      const result = await getInstructors();

      if (result.success) {
        setInstructors(result.data);
      }
    };

    loadInstructors();
  }, []);

  useEffect(() => {
    if (errorMessage) {
      alert(errorMessage);
    }
  }, [errorMessage]);

  function resetForm() {
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
        Delete Instructor
      </button>

      <dialog ref={dialogRef} className="absolute m-auto bg-transparent">
        <form
          action={dispatch}
          className="mb-4 rounded-md px-8 pb-8 pt-6 shadow-md"
        >
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
              Delete
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}
