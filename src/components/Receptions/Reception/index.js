import React, { useState } from 'react';
import { FaPen, FaTrash } from 'react-icons/fa';
import { DeleteModal, ErrorModal } from '../../Modals';
import { withoutBody } from '../../../services/receptionsAPIService';

const Reception = (props) => {
  const { name, doctor, date, complaints, id, setData } = props;

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [errors, setErrors] = useState([]);

  const deleteConfirm = () => {
    setShowDeleteModal(true);
  };

  const deleteReception = async (id) => {
    const errorsArray = [];

    if (!id || typeof id !== 'number') {
      console.log(id);
      errorsArray.push('ID is required and it has to be a number!');
    }

    if (errorsArray.length) {
      setErrors(errorsArray);
    }

    if (!errorsArray.length) {
      try {
        const deletedData = await withoutBody('DELETE', `receptions/${id}`);

        const returnedIds = {};

        deletedData.map((element) => {
          return (returnedIds[element.id] = element.id);
        });

        console.log(returnedIds);

        setData((oldData) => {
          return oldData.filter((element) => {
            if (returnedIds.hasOwnProperty(element.id)) {
              return true;
            }
            return false;
          });
        });
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
        <FaTrash className="icon" onClick={deleteConfirm} />
      </td>
    </tr>
  );
};

export default Reception;
