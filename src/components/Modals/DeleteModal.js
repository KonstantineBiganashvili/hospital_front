import React from 'react';
import { Modal, Button } from 'react-bootstrap';

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
            onClick={deleteReception}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
