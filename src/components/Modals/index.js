import React from 'react';
import { Modal, Button } from 'react-bootstrap';

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
    <Modal
      show={errors.length}
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
  );
};

export const DeleteModal = (props) => {
  const { showDeleteModal, setShowDeleteModal, deleteReception } = props;

  return (
    <>
      <Modal
        show={showDeleteModal}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          de Are you usre you want to delete this appointment?
        </Modal.Body>

        <Modal.Footer>
          <Button
            size="sm !important"
            variant="secondary"
            onClick={() => setShowDeleteModal(false)}
          >
            Cancel
          </Button>
          <Button
            className="btn btn-primary btn-sm"
            variant="primary"
            onClick={() => deleteReception()}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
