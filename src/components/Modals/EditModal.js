import React, { useContext } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import DoctorsContext from '../../context/DoctorsContext';

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
  } = props;

  const { doctors } = useContext(DoctorsContext);

  const doctorsList = doctors.map((element, index) => {
    const { doctor_name, specialization, id } = element;

    return (
      <option key={`doctor-${index}-${id}`} value={id}>
        {`${doctor_name} (${specialization})`}
      </option>
    );
  });

  const { patient_name, doctorId, appointment_time, newComplaints } = newData;

  return (
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
              value={patient_name || name}
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
              value={doctorId || doctor}
              onInput={({ target }) => {
                setNewData((oldData) => ({
                  ...oldData,
                  doctorId: Number(target.value),
                }));
              }}
            >
              {doctorsList}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              value={appointment_time || date}
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
              value={newComplaints || complaints}
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
          onClick={editReception}
        >
          Edit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
