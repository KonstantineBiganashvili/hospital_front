import React, { useState } from 'react';
import { FaPen, FaTrash } from 'react-icons/fa';
import { DeleteModal, ErrorModal } from '../../Modals';
import { withoutBody } from '../../../services/receptionsAPIService';

const Reception = (props) => {
  const { name, doctor, date, complaints, id, setData } = props;

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [errors, setErrors] = useState([]);

  const deleteReception = async (id) => {
    const errorsArray = [];

    if (!id || typeof id !== 'number') {
      errorsArray.push('ID is required and it has to be a number!');
    }

    if (errorsArray.length) {
      setErrors(errorsArray);
    } else {
      try {
        const deletedData = await withoutBody('DELETE', `receptions/${id}`);

        setData(deletedData);
      } catch (error) {
        setErrors([error.message]);
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
      <td>{name}</td>
      <td>{doctor}</td>
      <td>{date}</td>
      <td>{complaints}</td>
      <td className="icons">
        <FaPen className="icon" />
        <FaTrash className="icon" onClick={() => setShowDeleteModal(true)} />
      </td>
    </tr>
  );
};

export default Reception;
