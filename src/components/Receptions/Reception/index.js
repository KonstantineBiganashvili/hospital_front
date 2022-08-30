import React, { useState } from 'react';
import { FaPen, FaTrash } from 'react-icons/fa';
import { DeleteModal } from '../../Modals/DeleteModal';
import { ErrorModal } from '../../Modals/ErrorModal';
import { EditModal } from '../../Modals/EditModal';
import { withoutBody, withBody } from '../../../services/receptionsAPIService';
import { validName } from '../../../helpers/validators';

const Reception = (props) => {
  const { name, doctor, date, complaints, id, doctorId, data, setData } = props;
  let { initialData } = props;

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newData, setNewData] = useState({
    patient_name: '',
    appointment_time: '',
    doctorId: '',
    complaints: '',
  });

  const [errors, setErrors] = useState([]);

  const keepFilteredData = (returnedReceptions) => {
    setData((oldReceptions) => {
      return returnedReceptions.filter((newReceptions) => {
        const exists = oldReceptions.findIndex(
          (reception) => newReceptions.id === reception.id
        );
        return exists > -1;
      });
    });
  };

  const deleteReception = async (id) => {
    if (!id || typeof id !== 'number') {
      setErrors(['ID is required and it has to be a number!']);
    } else {
      try {
        const dataAfterDelete = await withoutBody('DELETE', `receptions/${id}`);
        if (dataAfterDelete) {
          initialData = dataAfterDelete;
          keepFilteredData(dataAfterDelete);
        }
      } catch (error) {
        setErrors([error.message]);
      }
    }
  };

  const editReception = async (id) => {
    const errorsArray = [];

    if (
      !newData.patient_name &&
      !newData.doctorId &&
      !newData.appointment_time &&
      !newData.complaints
    ) {
      errorsArray.push('You must change at least one field!');
    } else {
      if (newData.patient_name && !validName(newData.patient_name))
        errorsArray.push(
          'Edited name must not be empty and must be at least 2 characters long'
        );

      if (newData.doctorId && !(newData.doctorId > 0))
        errorsArray.push('Edited doctor must not be empty!');

      if (newData.appointment_time && !newData.appointment_time.trim())
        errorsArray.push('Edited appointment_time must not be empty!');

      if (newData.complaints && !newData.complaints.trim())
        errorsArray.push('Edited complaints must not be empty!');
    }

    if (errorsArray.length) {
      setErrors(errorsArray);
    } else {
      try {
        const editedReceptions = await withBody(
          'PATCH',
          `receptions/${id}`,
          newData
        );

        initialData = editedReceptions;
        setNewData({
          patient_name: '',
          appointment_time: '',
          doctorId: '',
          complaints: '',
        });
        keepFilteredData(editedReceptions);
        setShowEditModal(false);
      } catch (error) {
        setErrors([error.response.data]);
      }
    }
  };

  return (
    <tr>
      <ErrorModal errors={errors} setErrors={setErrors} />
      <DeleteModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        deleteReception={() => deleteReception(id)}
      />
      <EditModal
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        name={name}
        doctor={doctorId}
        date={date}
        complaints={complaints}
        newData={newData}
        setNewData={setNewData}
        editReception={() => editReception(id)}
      />
      <td>{name}</td>
      <td>{doctor}</td>
      <td>{date}</td>
      <td>{complaints}</td>
      <td className="icons">
        <FaPen className="icon" onClick={() => setShowEditModal(true)} />
        <FaTrash className="icon" onClick={() => setShowDeleteModal(true)} />
      </td>
    </tr>
  );
};

export default Reception;
