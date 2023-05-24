import { Button, Modal, Row, Col, Badge, Dropdown } from "react-bootstrap";
import cancelIcon from "../../img/cancel-icon.png";

import searchIcon from "../../img/search-location.png";

const UpdateModal = ({ showUpdateModal, setUpdateModal }) => {
  return (
    <Modal
      className="fade bd-example-modal-lg mt-4 custom-modal windows-modal custom-modal-medium"
      show={showUpdateModal}
      size="md"
    >
      <Modal.Header>
        <Modal.Title className="mr-auto">
        Update Screen
        </Modal.Title>
        <Button
          variant=""
          className="close"
          onClick={() => setUpdateModal(false)}
        >
          <img className="cancel-icon" src={cancelIcon} alt="cancel-icon" />
        </Button>
      </Modal.Header>
      <Modal.Body>
      <Row>
          <Col lg={12} md={12} sm={12} xs={12}>
            <div className="form-group">
              <label className="update-textfield-label">Screen Name</label>
              <input
                type="text"
                className="form-control input-default form-field"
                placeholder="Christan’s Windows"
              />
            </div>
          </Col>
          <Col lg={12} md={12} sm={12} xs={12}>
            <div className="form-group">
              <label className="update-textfield-label">Complete Address</label>
              <input
                type="text"
                className="form-control input-default form-field"
                placeholder="House No. 38-A Tribune colony, Ambala Cantt, Haryana"
              />
            </div>
          </Col>
          <Col lg={12} md={12} sm={12} xs={12}>
            <div className="form-group location-field">
              <label className="update-textfield-label">Google Location</label>
              <input
                type="text"
                className="form-control input-default form-field"
                placeholder="Haryana"
              />
              <div className="search-location">
              <img className="search-loc-icon" src={searchIcon} alt="search-icon" />
              </div>
            </div>
          </Col>
        </Row>
      </Modal.Body>

      <Modal.Footer>
        <Row className="w-100 m-0">
          <Col lg={12} md={12} sm={12} xs={12} className="pl-0 pr-0">
            <Button
              variant=""
              type="button"
              className="btn btn-primary btn-block primary-btn w-100"
              onClick={() => setUpdateModal(false)}
            >
             Update Screen
            </Button>
          </Col>
        </Row>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateModal;
