/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import './ReceptionList.css';
import Reception from '../Reception';

import { ErrorModal } from '../../Modals';

const ReceptionList = (props) => {
  const { data, setData } = props;
  let { initialData } = props;

  const [errors, setErrors] = useState([]);

  const renderData = () => {
    const showData = data.map((element, index) => {
      const {
        id,
        patient_name,
        doctor,
        doctorId,
        appointment_time,
        complaints,
      } = element;
      const { doctor_name, specialization } = doctor;

      return (
        <Reception
          key={`reception-${index}-${id}`}
          id={id}
          name={patient_name}
          doctor={`${doctor_name} (${specialization})`}
          doctorId={doctorId}
          date={appointment_time}
          complaints={complaints}
          data={data}
          setData={setData}
          initialData={initialData}
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
