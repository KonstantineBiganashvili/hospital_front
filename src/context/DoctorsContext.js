import React, { createContext, useState, useEffect } from 'react';
import { withoutBody } from '../services/receptionsAPIService';

const DoctorsContext = createContext();

export const DoctorsProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([]);

  const token = localStorage.getItem('token') || '';

  const doctorsFunction = async () => {
    const newDoctors = await withoutBody('GET', 'doctors');
    setDoctors(newDoctors);
  };

  useEffect(() => {
    doctorsFunction();
  }, [token]);

  return (
    <DoctorsContext.Provider
      value={{
        doctors,
      }}
    >
      {children}
    </DoctorsContext.Provider>
  );
};

export default DoctorsContext;
