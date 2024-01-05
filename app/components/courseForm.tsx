"use client";

import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { createCourse } from "@/app/lib/actions";
import { SubmitHandler, useForm } from "react-hook-form";
import { useInstructors } from "./instructorProvider";

type Inputs = {
  name: string;
  day: string;
  time: string;
  grade: string;
  classNumber: string;
  instructor: string;
};

export default function CourseForm() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [errorMessage, dispatch] = useFormState(createCourse, undefined);
  const { instructors, loadInstructors } = useInstructors();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
    loadInstructors();
  });

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

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("day", data.day);
    formData.append("time", data.time);
    formData.append("grade", data.grade);
    formData.append("classNumber", data.classNumber);
    formData.append("instructor", data.instructor);

    dispatch(formData);

    closeDialog();
  };

  return (
    <>
      <button
        type="button"
        onClick={openDialog}
        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Create Course
      </button>

      <dialog ref={dialogRef} className="absolute m-auto bg-transparent">
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
              aria-invalid={errors.name ? "true" : "false"}
            />

            {errors.name && errors.name.type === "required" && (
              <span className="text-xs italic text-red-500" role="alert">
                This field is required
              </span>
            )}
          </div>

          <div className="mb-4">
            <label className="styledLabel" htmlFor="day">
              Day
            </label>
            <select
              id="day"
              className="textfield"
              defaultValue=""
              {...register("day", { required: true })}
              aria-invalid={errors.day ? "true" : "false"}
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

            {errors.day && errors.day.type === "required" && (
              <span className="text-xs italic text-red-500" role="alert">
                This field is required
              </span>
            )}
          </div>

          <div className="mb-4">
            <label className="styledLabel" htmlFor="time">
              Time
            </label>
            <select
              id="time"
              className="textfield"
              defaultValue=""
              {...register("time", { required: true })}
              aria-invalid={errors.time ? "true" : "false"}
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

            {errors.time && errors.time.type === "required" && (
              <span className="text-xs italic text-red-500" role="alert">
                This field is required
              </span>
            )}
          </div>

          <div className="mb-4">
            <label className="styledLabel" htmlFor="grade">
              Grade
            </label>
            <select
              id="grade"
              className="textfield"
              defaultValue=""
              {...register("grade", { required: true })}
              aria-invalid={errors.grade ? "true" : "false"}
            >
              <option value="" disabled>
                Select a grade
              </option>
              <option value="1">1st</option>
              <option value="2">2nd</option>
              <option value="3">3rd</option>
              <option value="4">4th</option>
            </select>

            {errors.grade && errors.grade.type === "required" && (
              <span className="text-xs italic text-red-500" role="alert">
                This field is required
              </span>
            )}
          </div>

          <div className="mb-4">
            <label className="styledLabel" htmlFor="class">
              Class
            </label>
            <select
              id="class"
              className="textfield"
              defaultValue=""
              {...register("classNumber", { required: true })}
              aria-invalid={errors.classNumber ? "true" : "false"}
            >
              <option value="" disabled>
                Select a class
              </option>
              <option value="1036">1036</option>
              <option value="1040">1040</option>
              <option value="1041">1041</option>
              <option value="1044">1044</option>
            </select>

            {errors.classNumber && errors.classNumber.type === "required" && (
              <span className="text-xs italic text-red-500" role="alert">
                This field is required
              </span>
            )}
          </div>

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
                <option key={instructor.id} value={instructor.id}>
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
              Create
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}
