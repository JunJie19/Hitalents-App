import React from "react";
import { Button, Modal } from "react-bootstrap";

const ConfirmDeleteModal = (props) => {
    return (
        <Modal show={props.showModal} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure that you want delete this?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={props.confirmDelete}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      );
}

export default ConfirmDeleteModal;