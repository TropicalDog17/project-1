import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ErrorModal({ isModalOpen, handleClose }) {
  return (
    <Modal show={isModalOpen} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Error</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>An Error Occurred</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export { ErrorModal };
