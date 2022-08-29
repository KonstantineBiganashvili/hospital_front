import React, { useEffect, useState } from 'react';
import { withoutBody } from '../../services/receptionsAPIService';
import Header from '../Header';
import ReceptionList from '../Receptions/ReceptionList';
import { DoctorsProvider } from '../../context/DoctorsContext';

let initialData;

const Receptions = (props) => {
  const { token } = props;

  const [data, setData] = useState([]);

  const getFunction = async () => {
    const result = await withoutBody('GET', 'receptions');
    initialData = result;
    setData(result);
  };

  useEffect(() => {
    getFunction();
  }, [token]);

  return (
    <>
      <DoctorsProvider>
        <Header page={'Receptions'} loggedIn={true} />

        <ReceptionList
          data={data}
          token={token}
          setData={setData}
          initialData={initialData}
        />
      </DoctorsProvider>
    </>
  );
};

export default Receptions;
