import React from 'react';
import { Modal } from 'react-bootstrap';

export const ErrorModal = (props) => {
  const { errors, setErrors } = props;

  const errorsList = () => {
    if (errors.length) {
      const list = errors.map((element) => {
        return <li key={errors.indexOf(element)}>{element}</li>;
      });
      return list;
    }
  };

  return (
    <>
      <Modal
        show={errors.length ? true : false}
        onHide={() => setErrors([])}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header>
          <Modal.Title>Error:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>{errorsList()}</ul>
        </Modal.Body>
      </Modal>
    </>
  );
};
