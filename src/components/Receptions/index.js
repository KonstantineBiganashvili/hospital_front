import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { withoutBody } from '../../services/receptionsAPIService';
import Header from '../Header';
import ReceptionList from '../Receptions/ReceptionList';
import AddReception from './AddReception';
import { DoctorsProvider } from '../../context/DoctorsContext';

let initialData;

const Receptions = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  const getReceptions = async () => {
    try {
      const result = await withoutBody('GET', 'receptions');
      initialData = result;
      setData(result);
    } catch (error) {
      const { status } = error.response;

      if (status === 401) {
        navigate('/');
        localStorage.removeItem('token');
      } else console.error(error);
    }
  };

  useEffect(() => {
    getReceptions();
  }, []);

  return (
    <>
      <DoctorsProvider>
        <Header page={'Receptions'} loggedIn={true} />
        <AddReception setData={setData} data={data} />
        <ReceptionList
          data={data}
          setData={setData}
          initialData={initialData}
        />
      </DoctorsProvider>
    </>
  );
};

export default Receptions;
