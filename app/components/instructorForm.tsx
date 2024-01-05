"use client";

import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { createInstructor } from "@/app/lib/actions";
import { SubmitHandler, useForm } from "react-hook-form";
import { useInstructors } from "@/app/components/instructorProvider";

export default function InstructorForm() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [errorMessage, dispatch] = useFormState(createInstructor, undefined);
  const { loadInstructors } = useInstructors();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ name: string }>();

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

  const onSubmit: SubmitHandler<{ name: string }> = (data) => {
    const formData = new FormData();

    formData.append("name", data.name);

    dispatch(formData);

    closeDialog();

    loadInstructors();
  };

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
          onSubmit={handleSubmit(onSubmit)}
          className="mb-4 rounded-md px-8 pb-8 pt-6 shadow-md"
        >
          <div className="mb-4">
            <label className="styledLabel" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              className="textfield"
              type="text"
              placeholder="Name"
              {...register("name", { required: true })}
            />

            {errors.name && errors.name.type === "required" && (
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
              className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Add
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}
