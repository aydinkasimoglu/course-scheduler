"use client";

import { useEffect, useRef, useState } from "react";
import { deleteCourse } from "@/app/lib/actions";

export default function EditCourse({ id }: { id: number }) {
  const [hidden, setHidden] = useState(true);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setHidden(true);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

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
              className="flex w-full items-center px-4 py-3 text-left text-sm hover:bg-[rgba(0,0,0,0.05)] dark:hover:bg-[rgba(255,255,255,0.05)]"
              role="menuitem"
              tabIndex={-1}
            >
              <span className="material-symbols-outlined mr-2">edit</span>
              Edit
            </button>
            <hr className="w-5/6 self-center" />
            <button
              onClick={openDialog}
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

      <dialog ref={dialogRef} className="absolute m-auto bg-transparent">
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
