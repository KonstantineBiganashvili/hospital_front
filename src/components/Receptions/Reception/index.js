import React, { useState } from 'react';

import { FaPen, FaTrash } from 'react-icons/fa';
import { ErrorModal } from '../../Modals';

const Reception = (props) => {
  const { name, doctor, date, complaints, id, setData } = props;

  const [errors, setErrors] = useState([]);

  return (
    <tr>
      <ErrorModal errors={errors} setErrors={setErrors} />

      <td>{name}</td>
      <td>{doctor}</td>
      <td>{date}</td>
      <td>{complaints}</td>
      <td className="icons">
        <FaPen className="icon" />
        <FaTrash className="icon" />
      </td>
    </tr>
  );
};

export default Reception;
