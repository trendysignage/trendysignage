import { Button, Modal, Row, Col, Badge } from "react-bootstrap";
import cancelIcon from "../../img/cancel-icon.png";
import tagCloseIcon from "../../img/tag-close-icon.png";

const AddNewTagModal = ({ showNewTagModal, setNewTagModal }) => {
  return (
    <Modal
      className="fade bd-example-modal-lg mt-4 custom-modal custom-modal-medium"
      show={showNewTagModal}
      size="md"
    >
      <Modal.Header>
        <Modal.Title>Add New Tag</Modal.Title>
        <Button
          variant=""
          className="close"
          onClick={() => setNewTagModal(false)}
        >
          <img className="cancel-icon" src={cancelIcon} alt="cancel-icon" />
        </Button>
      </Modal.Header>
      <Modal.Body>
        <div className="add-screen-paragraph">
          <p>Type in new name to create your tag</p>
        </div>
        <div className="tag-name-row d-flex flex-wrap">
          <Badge as="a" href="" className="tag-name" variant="outline-primary">
            <span className="tag-name-content">My Tag</span>
            <span className="tag-close">
              <img
                className="tag-close-icon"
                src={tagCloseIcon}
                alt="tag-icon"
              />
            </span>
          </Badge>
          <Badge as="a" href="" className="tag-name" variant="outline-primary">
            <span className="tag-name-content">My Tag</span>
            <span className="tag-close">
              <img
                className="tag-close-icon"
                src={tagCloseIcon}
                alt="tag-icon"
              />
            </span>
          </Badge>
        </div>
        <Row>
          <Col lg={12} md={12} sm={12} xs={12}>
            <div className="form-group">
              <input
                type="text"
                className="form-control input-default form-field"
                placeholder="Enter Name"
              />
            </div>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Row className="w-100 m-0">
          <Col lg={6} md={6} sm={6} xs={6} className="pl-0 pr-2">
            <Button className="cancel-btn w-100" variant="outline-light">
              Cancel
            </Button>
          </Col>
          <Col lg={6} md={6} sm={6} xs={6} className="pl-2 pr-0">
            <Button
              variant=""
              type="button"
              className="btn btn-primary btn-block primary-btn"
              onClick={() => setNewTagModal(false)}
            >
              Add Screen
            </Button>
          </Col>
        </Row>
      </Modal.Footer>
    </Modal>
  );
};

export default AddNewTagModal;
