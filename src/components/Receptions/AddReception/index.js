import React, { useState, useContext } from 'react';
import { withBody } from '../../../services/receptionsAPIService';
import DoctorsContext from '../../../context/DoctorsContext';
import { ErrorModal } from '../../Modals';
import './AddReception.css';

const AddReception = (props) => {
  const { setData } = props;
  const [addReception, setAddReception] = useState({});
  const [errors, setErrors] = useState([]);
  const { doctors } = useContext(DoctorsContext);

  const shownDoctors = doctors.map((element) => {
    return (
      <option key={element.id} value={element.id}>
        {`${element.doctor_name} (${element.specialization})`}
      </option>
    );
  });

  const setAddReceptionFunction = (e, string) => {
    setAddReception((oldAddReception) => ({
      ...oldAddReception,
      [string]: e.target.value,
    }));
  };

  const addReceptionFunction = async () => {
    const errorsArray = [];

    if (!addReception.patient_name) {
      errorsArray.push('Patient name is required!');
    }

    if (!addReception.doctorId || addReception.doctorId === '0') {
      errorsArray.push('You must assign a doctor to the patient');
    }

    if (!addReception.appointment_time) {
      errorsArray.push('You must assign date to the appointment!');
    }

    if (!addReception.complaints) {
      errorsArray.push('Complaints field is required!');
    }

    if (errorsArray.length) {
      setErrors(errorsArray);
    }

    if (!errorsArray.length) {
      try {
        const newReceptionsInfo = await withBody(
          'POST',
          'receptions',
          addReception
        );
        setData(newReceptionsInfo);
        setAddReception({});
      } catch (error) {
        setErrors((oldErrors) => [...oldErrors, error.message]);
      }
    }
  };

  return (
    <div id="receptions">
      <ErrorModal errors={errors} setErrors={setErrors} />
      <div id="addPatient">
        <div className="addFields">
          <label htmlFor="nameInput">Name</label>
          <input
            type="text"
            className="inputField"
            id="nameInput"
            onChange={(e) => setAddReceptionFunction(e, 'patient_name')}
            value={addReception.patient_name || ''}
          />
        </div>
        <div className="addFields">
          <label htmlFor="doctorInput">Doctor</label>

          <select
            className="inputField"
            id="doctorInput"
            onChange={(e) => setAddReceptionFunction(e, 'doctorId')}
            value={addReception.doctorId}
          >
            <option value="0" hidden>
              Doctors
            </option>
            {shownDoctors}
          </select>
        </div>
        <div className="addFields">
          <label htmlFor="nameInput">Date</label>
          <input
            type="date"
            className="inputField"
            id="dateInput"
            onChange={(e) => setAddReceptionFunction(e, 'appointment_time')}
            value={addReception.appointment_time || ''}
          />
        </div>
        <div className="addFields">
          <label htmlFor="complaintsInput">Complaints</label>
          <input
            type="text"
            className="inputField"
            id="complaintsInput"
            onChange={(e) => setAddReceptionFunction(e, 'complaints')}
            value={addReception.complaints || ''}
          />
        </div>
        <button type="submit" id="addBtn" onClick={addReceptionFunction}>
          Add
        </button>
      </div>
    </div>
  );
};

export default AddReception;
