"use client";

import { Instructor } from "@prisma/client";
import { createContext, useContext, useEffect, useState } from "react";
import { getInstructors } from "@/app/lib/actions";

type InstructorContextType = {
  instructors: Instructor[];
  loadInstructors: () => Promise<void>;
};

const InstructorContext = createContext<InstructorContextType>(
  {} as InstructorContextType,
);

export const useInstructors = () => {
  const context = useContext(InstructorContext);

  if (!context) {
    throw new Error("useInstructors must be used within an InstructorProvider");
  }

  return context;
};

export default function InstructorProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [instructors, setInstructors] = useState<Instructor[]>([]);

  const loadInstructors = async () => {
    const result = await getInstructors();

    if (result.success) {
      setInstructors(result.data);
    }
  };

  useEffect(() => {
    loadInstructors();
  }, []);

  return (
    <InstructorContext.Provider
      value={{
        instructors,
        loadInstructors,
      }}
    >
      {children}
    </InstructorContext.Provider>
  );
}
