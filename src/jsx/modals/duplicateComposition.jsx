import { Button, Modal, Row, Col, Badge } from "react-bootstrap";
import cancelIcon from "../../img/cancel-icon.png";
import tagCloseIcon from "../../img/tag-close-icon.png";
import { useState } from "react";

const DuplicateComposition = ({
  setDuplicateModal,
  createComposition,
}) => {
  const [name, setName] = useState("");
  return (
    
    <Modal
      className="fade bd-example-modal-lg mt-4 custom-modal custom-modal-medium"
      show={true}
      size="md"
    >
      <Modal.Header>
        <Modal.Title>Duplicate</Modal.Title>
        <Button
          variant=""
          className="close"
          onClick={() => setDuplicateModal(false)}
        >
          <img className="cancel-icon" src={cancelIcon} alt="cancel-icon" />
        </Button>
      </Modal.Header>
      <Modal.Body>
        <div className="add-screen-paragraph">
          <p>The Composition will be copied with all it's proporties. Just change the contents and play.</p>
        </div>

        <Row>
        <Col lg={12} md={12} sm={12} xs={12}>
            <div className="form-group" style={{color: "#1A1A1A", fontWeight:"700"}}>
            New Composition Name
            </div>
          </Col>
          <Col lg={12} md={12} sm={12} xs={12}>
            <div className="form-group">
              <input
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
                type="text"
                className="form-control input-default form-field"
                placeholder="Enter Name for new copy"
              />
            </div>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Row className="w-100 m-0">
          <Col lg={6} md={6} sm={6} xs={6} className="pl-0 pr-2">
            <Button
              className="cancel-btn w-100"
              variant="outline-light"
              onClick={() => setDuplicateModal(false)}
            >
              Cancel
            </Button>
          </Col>
          <Col lg={6} md={6} sm={6} xs={6} className="pl-2 pr-0">
            <Button
              variant=""
              type="button"
              className="btn btn-primary btn-block primary-btn"
              onClick={() =>{
                if(name.length){
                  createComposition(name)
                }
              }}
            >
              Confirm
            </Button>
          </Col>
        </Row>
      </Modal.Footer>
    </Modal>
  );
};

export default DuplicateComposition;
