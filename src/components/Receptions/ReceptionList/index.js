/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import './ReceptionList.css';
import Reception from '../Reception';

import { ErrorModal } from '../../Modals';

const ReceptionList = (props) => {
  const { data, setData } = props;

  const [errors, setErrors] = useState([]);

  const renderData = () => {
    const showData = data.map((element) => {
      return (
        <Reception
          key={element.id}
          id={element.id}
          name={element.patient_name}
          doctor={`${element.doctor.doctor_name} (${element.doctor.specialization})`}
          date={element.appointment_time}
          complaints={element.complaints}
          data={data}
          setData={setData}
        />
      );
    });

    return showData;
  };

  return (
    <>
      <ErrorModal errors={errors} setErrors={setErrors} />

      <div id="receptionList">
        <table cellSpacing="0">
          <thead>
            <tr id="tableHead">
              <th>Name</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Complaints</th>
              <th className="icons-row">Actions</th>
            </tr>
          </thead>
          <tbody>{renderData()}</tbody>
        </table>
      </div>
    </>
  );
};

export default ReceptionList;
