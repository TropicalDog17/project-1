import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function DeleteModal({ isModalOpen, handleClose, handleDelete }) {
  return (
    <Modal show={isModalOpen} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete article</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>
          Are you sure you want to delete this article. This action can not be
          reversed!
        </p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleDelete}>
          Save changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export { DeleteModal };
