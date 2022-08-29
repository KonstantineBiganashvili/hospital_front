import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

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

export const EditModal = (props) => {
  const {
    showEditModal,
    setShowEditModal,
    editReception,
    name,
    doctor,
    date,
    complaints,
    setNewData,
    newData,
    shownDoctors,
  } = props;

  return (
    <>
      <Modal
        show={showEditModal}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={newData.patient_name || name}
                onInput={({ target }) => {
                  setNewData((oldData) => ({
                    ...oldData,
                    patient_name: target.value,
                  }));
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Doctor</Form.Label>
              <Form.Select
                value={newData.doctorId || doctor}
                onInput={({ target }) => {
                  setNewData((oldData) => ({
                    ...oldData,
                    doctorId: Number(target.value),
                  }));
                }}
              >
                {shownDoctors}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={newData.appointment_time || date}
                onInput={({ target }) => {
                  setNewData((oldData) => ({
                    ...oldData,
                    appointment_time: target.value,
                  }));
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Complaints</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Complaints"
                value={newData.complaints || complaints}
                onInput={({ target }) => {
                  setNewData((oldData) => ({
                    ...oldData,
                    complaints: target.value,
                  }));
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button
            size="sm !important"
            variant="secondary"
            onClick={() => setShowEditModal(false)}
          >
            Cancel
          </Button>
          <Button
            className="btn btn-primary btn-sm"
            variant="primary"
            onClick={() => editReception()}
          >
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
