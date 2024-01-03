"use client";
import { useRef, useState } from "react";
import { useFormState } from "react-dom";
import { deleteCourse } from "../lib/actions";


export default function EditCourse({ id }: { id: number; }) {
  const [hidden, setHidden] = useState(true);

  const dialogRef = useRef<HTMLDialogElement>(null);
  function closeDialog() {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  }
  function openDialog() {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  }

  return (
    <>
      <button
        className="text-gray-600 hover:text-gray-800 focus:outline-none"
        onClick={() => {
          setHidden(!hidden);
          console.log("clicked");
        }}
      >
        <span className="material-symbols-outlined">more_horiz</span>
      </button>
      {!hidden && (
        <div
          className="absolute z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            <button
              className="text-gray-700 block px-4 py-2 text-sm"
              role="menuitem"
              tabIndex={-1}
            >
              Edit
            </button>
            <button
              onClick={openDialog}
              className="text-gray-700 block px-4 py-2 text-sm"
              role="menuitem"
              tabIndex={-1}
            >
              Delete
            </button>
          </div>
        </div>
      )}

      <dialog ref={dialogRef} className="absolute m-auto bg-transparent">
        <form className="rounded-md px-8 pb-8 pt-6" onSubmit={() => deleteCourse(id)}>
          <h1 className="w-min font-bold text-2xl mb-2" >Warning!</h1>
          <p>Do you really want to delete this course?</p>
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
