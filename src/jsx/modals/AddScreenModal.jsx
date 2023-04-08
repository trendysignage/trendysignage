import { Button, Modal, Row, Col } from "react-bootstrap";
import cancelIcon from "../../img/cancel-icon.png";

const AddScreenModal = ({ showScreenModal, setShowScreenModal }) => {
  return (
    <Modal
      className="fade bd-example-modal-lg mt-4 custom-modal custom-modal-medium"
      show={showScreenModal}
      size="md"
    >
      <Modal.Header>
        <Modal.Title>Add Screen</Modal.Title>
        <Button
          variant=""
          className="close"
          onClick={() => setShowScreenModal(false)}
        >
          <img className="cancel-icon" src={cancelIcon} alt="cancel-icon" />
        </Button>
      </Modal.Header>
      <Modal.Body>
        <div className="add-screen-paragraph">
          <p>
            Want to add new screen? Please fill in some information and continue
          </p>
        </div>
        <Row>
          <Col lg={6} md={6} sm={6} xs={12}>
            <div className="form-group">
              <input
                type="text"
                className="form-control input-default form-field"
                placeholder="Screen Name"
              />
            </div>
          </Col>
          <Col lg={6} md={6} sm={6} xs={12}>
            <div className="form-group">
              <input
                type="text"
                className="form-control input-default form-field"
                placeholder="Screen Location"
              />
            </div>
          </Col>
          <Col lg={12} md={12} sm={12} xs={12}>
            <div className="form-group">
              <input
                type="text"
                className="form-control input-default form-field"
                placeholder="Google Location"
              />
            </div>
          </Col>
          <Col lg={12} md={12} sm={12} xs={12}>
            <div className="form-group">
              <input
                type="text"
                className="form-control input-default form-field"
                placeholder="Tags"
              />
            </div>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant=""
          type="button"
          className="btn btn-primary btn-block primary-btn"
          onClick={() => setShowScreenModal(false)}
        >
          Add Screen
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddScreenModal;
