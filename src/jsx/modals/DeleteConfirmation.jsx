import { Button, Modal} from "react-bootstrap";


const DeleteConfirmation = ({ setDeleteModal, callbackFunction, text, yes }) => {
  return (
    <Modal className="fade" show={true}>
    <Modal.Header>
       <Modal.Title>Confirmation</Modal.Title>
       <Button
          variant=""
          className="close"
          onClick={() => setDeleteModal(false)}
       >
          <span>&times;</span>
       </Button>
    </Modal.Header>
    <Modal.Body>{text}</Modal.Body>
    <Modal.Footer>
       <Button
          onClick={() => setDeleteModal(false)}
          variant="light"
       >
          Close
       </Button>
       <Button variant="danger" onClick={callbackFunction}>{yes}</Button>
    </Modal.Footer>
 </Modal>
  );
};

export default DeleteConfirmation;
