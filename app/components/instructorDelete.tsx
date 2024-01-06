"use client";

import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { deleteInstructor } from "@/app/lib/actions";
import { SubmitHandler, useForm } from "react-hook-form";
import { useInstructors } from "./instructorProvider";

export default function InstructorDelete() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [errorMessage, dispatch] = useFormState(deleteInstructor, undefined);
  const { instructors, loadInstructors } = useInstructors();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ instructor: string }>();

  useEffect(() => {
    if (errorMessage) {
      alert(errorMessage);
    }
  }, [errorMessage]);

  function closeDialog() {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  }

  function openDialog() {
    reset();

    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  }

  const onSubmit: SubmitHandler<{ instructor: string }> = (data) => {
    const formData = new FormData();

    formData.append("instructor", data.instructor);

    dispatch(formData);

    closeDialog();

    loadInstructors();
  };

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
          onSubmit={handleSubmit(onSubmit)}
          className="mb-4 rounded-md px-8 pb-8 pt-6 shadow-md"
        >
          <div className="mb-4">
            <label className="styledLabel" htmlFor="instructor">
              Instructor
            </label>
            <select
              id="instructor"
              className="textfield"
              defaultValue=""
              {...register("instructor", { required: true })}
              aria-invalid={errors.instructor ? "true" : "false"}
            >
              <option value="" disabled>
                Select an instructor
              </option>
              {instructors.map((instructor) => (
                <option key={instructor.id} value={String(instructor.id)}>
                  {instructor.name}
                </option>
              ))}
            </select>

            {errors.instructor && errors.instructor.type === "required" && (
              <span className="text-xs italic text-red-500" role="alert">
                This field is required
              </span>
            )}
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
