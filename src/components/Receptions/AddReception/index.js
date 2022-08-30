import React, { useState, useContext } from 'react';
import { withBody } from '../../../services/receptionsAPIService';
import DoctorsContext from '../../../context/DoctorsContext';
import { ErrorModal } from '../../Modals/ErrorModal';
import { validName } from '../../../helpers/validators';
import './addReception.css';

const AddReception = (props) => {
  const { setData } = props;

  const [newReception, setNewReception] = useState({
    patient_name: '',
    doctorId: '',
    appointment_time: '',
    complaints: '',
  });
  const [errors, setErrors] = useState([]);
  const { doctors } = useContext(DoctorsContext);

  const shownDoctors = doctors.map((element, index) => {
    const { id, doctor_name, specialization } = element;

    return (
      <option key={`doctor-${index}-${id}`} value={element.id}>
        {`${doctor_name} (${specialization})`}
      </option>
    );
  });

  const createNewReception = (newReceptionValues) => {
    setNewReception((oldNewReception) => ({
      ...oldNewReception,
      ...newReceptionValues,
    }));
  };

  const { patient_name, doctorId, appointment_time, complaints } = newReception;

  const addReception = async () => {
    const errorsArray = [];

    if (!validName(patient_name)) {
      errorsArray.push('Patient name must be at least 2 characters long');
    }

    if (!doctorId || doctorId === '0') {
      errorsArray.push('You must assign a doctor to the patient');
    }

    if (!appointment_time) {
      errorsArray.push('You must assign date to the appointment!');
    }

    if (!complaints) {
      errorsArray.push('Complaints field is required!');
    }

    if (errorsArray.length) {
      setErrors(errorsArray);
    } else {
      try {
        const newReceptionsInfo = await withBody(
          'POST',
          'receptions',
          newReception
        );

        setData(newReceptionsInfo);
        setNewReception({
          patient_name: '',
          doctorId: '',
          appointment_time: '',
          complaints: '',
        });
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
            value={patient_name}
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
            value={doctorId}
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
            value={appointment_time}
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
            value={complaints}
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
