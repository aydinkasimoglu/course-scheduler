"use client";

import { useRef } from "react";
import { useFormState } from "react-dom";
import { createInstructor } from "@/app/lib/actions";

export default function InstructorForm() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const [errorMessage, dispatch] = useFormState(createInstructor, undefined);

  function resetForm() {
    if (nameRef.current) {
      nameRef.current.value = "";
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
        className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        onClick={openDialog}
      >
        Add Instructor
      </button>
      <dialog className="absolute m-auto bg-transparent" ref={dialogRef}>
        <form
          className="mb-4 rounded-md px-8 pb-8 pt-6 shadow-md"
          action={dispatch}
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
              className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Add
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
