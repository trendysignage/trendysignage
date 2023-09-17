import { Button, Modal, Row, Col, Badge } from "react-bootstrap";
import cancelIcon from "../../img/cancel-icon.png";
import tagCloseIcon from "../../img/tag-close-icon.png";

const ChangePassword = ({ setShowModel, show }) => {
  return (
    <Modal
      className="fade bd-example-modal-lg mt-4 custom-modal custom-modal-medium"
      show={show}
      size="md"
    >
      <Modal.Header>
        <Modal.Title>Change Password</Modal.Title>
        <Button
          variant=""
          className="close"
          onClick={() => setShowModel(false)}
        >
          <img className="cancel-icon" src={cancelIcon} alt="cancel-icon" />
        </Button>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="mb-3">
            <strong>
              <label className="mb-3"> Old Password</label>
            </strong>
            <input
              type="text"
              className="form-control input-default form-field"
              placeholder="Old Password"
            />
          </div>

          <div className="mb-4">
            <strong>
              <label className="mb-3"> New Password</label>
            </strong>
            <input
              type="text"
              className="form-control input-default form-field"
              placeholder="New Password"
            />
          </div>
        </form>
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
              onClick={() => setShowModel(false)}
            >
              Save
            </Button>
          </Col>
        </Row>
      </Modal.Footer>
    </Modal>
  );
};

export default ChangePassword;
