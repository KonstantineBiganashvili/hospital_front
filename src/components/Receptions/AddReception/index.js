import React, { useState, useContext } from 'react';
import { withBody } from '../../../services/receptionsAPIService';
import DoctorsContext from '../../../context/DoctorsContext';
import { ErrorModal } from '../../Modals';
import './AddReception.css';

const AddReception = (props) => {
  const { setData } = props;
  const [newReception, setNewReception] = useState({});
  const [errors, setErrors] = useState([]);
  const { doctors } = useContext(DoctorsContext);

  const shownDoctors = doctors.map((element) => {
    return (
      <option key={element.id} value={element.id}>
        {`${element.doctor_name} (${element.specialization})`}
      </option>
    );
  });

  const createNewReception = (newReceptionValues) => {
    setNewReception((oldNewReception) => ({
      ...oldNewReception,
      ...newReceptionValues,
    }));
  };

  const addReception = async () => {
    const errorsArray = [];

    if (!newReception.patient_name) {
      errorsArray.push('Patient name is required!');
    }

    if (!newReception.doctorId || newReception.doctorId === '0') {
      errorsArray.push('You must assign a doctor to the patient');
    }

    if (!newReception.appointment_time) {
      errorsArray.push('You must assign date to the appointment!');
    }

    if (!newReception.complaints) {
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
          newReception
        );
        setData(newReceptionsInfo);
        setNewReception({});
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
            onChange={({ target }) =>
              createNewReception({ patient_name: target.value })
            }
            value={newReception.patient_name}
          />
        </div>
        <div className="addFields">
          <label htmlFor="doctorInput">Doctor</label>

          <select
            className="inputField"
            id="doctorInput"
            onChange={({ target }) =>
              createNewReception({ doctorId: target.value })
            }
            value={newReception.doctorId}
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
            onChange={({ target }) =>
              createNewReception({ appointment_time: target.value })
            }
            value={newReception.appointment_time}
          />
        </div>
        <div className="addFields">
          <label htmlFor="complaintsInput">Complaints</label>
          <input
            type="text"
            className="inputField"
            id="complaintsInput"
            onChange={({ target }) =>
              createNewReception({ complaints: target.value })
            }
            value={newReception.complaints}
          />
        </div>
        <button type="submit" id="addBtn" onClick={addReception}>
          Add
        </button>
      </div>
    </div>
  );
};

export default AddReception;
