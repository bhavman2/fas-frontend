import React from 'react';
import { Modal } from 'react-bootstrap';

const SuccessModal = (props) => {
  return (
    <Modal show={props.showSuccess} onHide={props.closeSuccess}>
      <Modal.Body>
        {props.message}
      </Modal.Body>
    </Modal>
  );

}
export default SuccessModal;