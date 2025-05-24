import React, { createContext, useContext, useState, ReactNode } from "react";

interface ResumeData {
  name: string | string[];
  college_name: string | string[];
  degree: string | string[];
  graduation_year: number | string[];
  years_of_experience: number | string[];
  companies_worked_at: string | string[];
  designation: string | string[];
  skills: string | string[];
  location: string | string[];
  email_address: string | string[];
}

interface ResumeContextType {
  resumeData: ResumeData[];
  setResumeData: (data: ResumeData[]) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [resumeData, setResumeData] = useState<ResumeData[]>([]); // pakai array kosong

  return (
    <ResumeContext.Provider value={{ resumeData, setResumeData }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error("useResume must be used within a ResumeProvider");
  }
  return context;
};
