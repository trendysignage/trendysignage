import { Button, Modal, Row, Col, Badge, Dropdown } from "react-bootstrap";
import cancelIcon from "../../img/cancel-icon.png";

import chrisImg from "../../img/chris-img.png";

const WindowsModal = ({ showWindowsModal, setWindowsModal }) => {
  return (
    <Modal
      className="fade bd-example-modal-lg mt-4 custom-modal windows-modal custom-modal-medium"
      show={showWindowsModal}
      size="md"
    >
      <Modal.Header>
        <Modal.Title className="mr-auto">
        Christan’s Window’s
        </Modal.Title>
        <Button
          variant=""
          className="close"
          onClick={() => setWindowsModal(false)}
        >
          <img className="cancel-icon" src={cancelIcon} alt="cancel-icon" />
        </Button>
      </Modal.Header>
      <Modal.Body>
<div className="chris-imgbox">
<img className="chris-img img-fluid" src={chrisImg} alt="chris-icon" />

</div>
      </Modal.Body>
    </Modal>
  );
};

export default WindowsModal;
