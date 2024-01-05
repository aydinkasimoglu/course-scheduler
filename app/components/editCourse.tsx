"use client";

import { useEffect, useRef, useState } from "react";
import { deleteCourse, getCourseById, updateCourse } from "@/app/lib/actions";
import { useFormState } from "react-dom";
import { SubmitHandler, set, useForm } from "react-hook-form";
import { useInstructors } from "@/app/components/instructorProvider";
import { Course } from "@prisma/client";

type Inputs = {
  name: string;
  classNumber: string;
  instructor: string;
};

export default function EditCourse({ id }: { id: number }) {
  const [hidden, setHidden] = useState(true);
  const [errorMessage, dispatch] = useFormState(updateCourse, undefined);
  const deleteDialogRef = useRef<HTMLDialogElement>(null);
  const editDialogRef = useRef<HTMLDialogElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [course, setCourse] = useState<Course | undefined >(undefined);
  const [name, setName] = useState(course?.name || "");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({defaultValues: {name: course?.name}});

  const {
    instructors
  } = useInstructors();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("classNumber", data.classNumber);
    formData.append("instructor", data.instructor);

    dispatch(formData);

    closeEditDialog();
  };

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setHidden(true);
      }
    }

    async function getCourse(id: number) {
      const response = await getCourseById(id);
      if (response.success) {
        const course = response.data;
        setCourse(course);
        setName(course?.name || "");
      }
    }
    getCourse(id);

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  function closeDeleteDialog() {
    if (deleteDialogRef.current) {
      deleteDialogRef.current.close();
    }
  }
  function openDeleteDialog() {
    if (deleteDialogRef.current) {
      deleteDialogRef.current.showModal();
    }
  }

  function closeEditDialog() {
    if (editDialogRef.current) {
      editDialogRef.current.close();
    }
  }

  function openEditDialog() {
    if (editDialogRef.current) {
      editDialogRef.current.showModal();
    }
  }
  return (
    <>
      <button
        className="text-gray-600 hover:text-gray-800 focus:outline-none"
        onClick={() => setHidden(!hidden)}
      >
        <span className="material-symbols-outlined">more_horiz</span>
      </button>

      {!hidden && (
        <div
          className="absolute z-10 mt-2 w-36 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800"
          ref={menuRef}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="flex flex-col items-start" role="none">
            <button
              onClick={openEditDialog}
              className="flex w-full items-center px-4 py-3 text-left text-sm hover:bg-[rgba(0,0,0,0.05)] dark:hover:bg-[rgba(255,255,255,0.05)]"
              role="menuitem"
              tabIndex={-1}
            >
              <span className="material-symbols-outlined mr-2">edit</span>
              Edit
            </button>
            <hr className="w-5/6 self-center" />
            <button
              onClick={openDeleteDialog}
              className="flex w-full items-center px-4 py-3 text-left text-sm text-red-600 hover:bg-[rgba(255,70,70,0.2)]"
              role="menuitem"
              tabIndex={-1}
            >
              <span className="material-symbols-outlined mr-2 text-lg text-inherit">
                delete
              </span>
              Delete
            </button>
          </div>
        </div>
      )}

      <dialog ref={deleteDialogRef} className="absolute m-auto bg-transparent">
        <form
          className="rounded-md px-8 pb-8 pt-6"
          onSubmit={() => deleteCourse(id)}
        >
          <h1 className="mb-2 w-min text-2xl font-bold">Warning!</h1>
          <p>Do you really want to delete this course?</p>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold leading-6"
              onClick={closeEditDialog}
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={closeEditDialog}
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Delete
            </button>
          </div>
        </form>
      </dialog>
      
      <dialog ref={editDialogRef} className="absolute m-auto bg-transparent">
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
              onChange={(e) => setName(e.target.value)}
              value={name}
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
              className="textfield capitalize"
              defaultValue=""
              disabled
            >
              <option value="" disabled>
                {course?.day}
              </option>
            </select>

          </div>

          <div className="mb-4">
            <label className="styledLabel" htmlFor="time">
              Time
            </label>
            <select
              id="time"
              className="textfield"
              defaultValue=""
              disabled
            >
              <option value="" disabled>
                {course?.time}
              </option>
            </select>
          </div>

          <div className="mb-4">
            <label className="styledLabel" htmlFor="grade">
              Grade
            </label>
            <select
              id="grade"
              className="textfield"
              defaultValue=""
              disabled
            >
              <option value="" disabled>
                {course?.grade}
              </option>
            </select>
          </div>

          <div className="mb-4">
            <label className="styledLabel" htmlFor="class">
              Class
            </label>
            <select
              id="class"
              className="textfield"
              defaultValue=""
              disabled
            >
              <option value="" disabled>
                {course?.classNumber}
              </option>
            </select>

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
              {instructors.find((instructor) => instructor.id === course?.instructorId) && (
                <option value={course?.instructorId}>
                  {instructors.find((instructor) => instructor.id === course?.instructorId)?.name}
                </option>
              )}
              
              {instructors.filter((instructor) => instructor.id !== course?.instructorId).map((instructor) => (
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
              onClick={closeEditDialog}
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
