import React, { useEffect, useState } from 'react';
import { withoutBody } from '../../services/receptionsAPIService';
import Header from '../Header';
import ReceptionList from '../Receptions/ReceptionList';
import AddReception from './AddReception';
import { DoctorsProvider } from '../../context/DoctorsContext';

let initialData;

const Receptions = () => {
  const [data, setData] = useState([]);

  const getFunction = async () => {
    const result = await withoutBody('GET', 'receptions');
    initialData = result;
    setData(result);
  };

  useEffect(() => {
    getFunction();
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
