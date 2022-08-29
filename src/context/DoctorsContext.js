import React, { createContext, useState, useEffect } from 'react';
import { withoutBody } from '../services/receptionsAPIService';

const DoctorsContext = createContext();

export const DoctorsProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([]);

  const token = localStorage.getItem('token') || '';

  const getDoctors = async () => {
    const newDoctors = await withoutBody('GET', 'doctors');
    setDoctors(newDoctors);
  };

  useEffect(() => {
    getDoctors();
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
