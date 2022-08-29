import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { withoutBody } from '../../services/receptionsAPIService';
import Header from '../Header';
import ReceptionList from '../Receptions/ReceptionList';
import AddReception from './AddReception';
import ReceptionFilter from '../ReceptionFilter';
import { DoctorsProvider } from '../../context/DoctorsContext';
import { ErrorModal } from '../Modals';

let initialData;

const Receptions = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [sort, setSort] = useState({ order: 'ascending' });
  const [dateFilter, setDateFilter] = useState({});
  const [errors, setErrors] = useState([]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const { sortParam, order } = sort;

    const newData = [...data].sort((a, b) => {
      if (a[sortParam] > b[sortParam]) return 1;
      if (a[sortParam] < b[sortParam]) return -1;

      return 0;
    });

    if (order === 'descending') {
      setData(newData.reverse());
    } else {
      setData(newData);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort]);

  const filterByDate = () => {
    const { from, to } = dateFilter;

    const errorsArray = [];

    if (!from || !to) {
      errorsArray.push('You must filter according to both fields!');
    }

    if (from && to && to < from) {
      errorsArray.push('Starting date must not be larger than ending date');
    }

    if (errorsArray.length) {
      setErrors(errorsArray);
    } else {
      const newData = [...initialData].filter((element) => {
        const answer =
          to &&
          from &&
          element.appointment_time >= from &&
          element.appointment_time <= to;

        return answer;
      });

      setData(newData);
    }
  };

  return (
    <>
      <DoctorsProvider>
        <Header page={'Receptions'} loggedIn={true} />
        <AddReception setData={setData} data={data} />
        <ReceptionFilter
          sort={sort}
          setSort={setSort}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
          filterByDate={filterByDate}
          initialData={initialData}
          setData={setData}
        />
        <ReceptionList
          data={data}
          setData={setData}
          initialData={initialData}
        />
        <ErrorModal errors={errors} setErrors={setErrors} />
      </DoctorsProvider>
    </>
  );
};

export default Receptions;
