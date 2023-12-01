import { useState } from "react";
import { Button, Modal, Row, Col } from "react-bootstrap";
import cancelIcon from "../../img/cancel-icon.png";
import { toast } from "react-toastify";

import searchIcon from "../../img/search-location.png";
import { editScreen } from "../../utils/api";

const UpdateModal = ({
  showUpdateModal,
  setUpdateModal,
  screenName,
  googleLocation,
  screenLocation,
  id,
  setIsRefresh,
}) => {
  const [screen, setScreen] = useState(screenName);
  const [address, setAddress] = useState(screenLocation);
  const [location, setLocation] = useState(googleLocation);
  const notifyTopRight = (success) => {
    toast.success(`✅ ${success}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };
  const notifyError = (error) => {
    toast.error(`❌${error}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await editScreen(id, screen, address, location);
      console.log(response.data.message, "successssss");
      notifyTopRight(response.data.message);
      setIsRefresh(true);
      setUpdateModal(false);
    } catch (error) {
      console.log(error.response.data, "error");
      notifyError(error.response.data.message);
    }
  };
  return (
    <Modal
      className="fade bd-example-modal-lg mt-4 custom-modal windows-modal custom-modal-medium"
      show={showUpdateModal}
      size="md"
    >
      <Modal.Header>
        <Modal.Title className="mr-auto">Update Screen</Modal.Title>
        <Button
          variant=""
          className="close"
          onClick={() => setUpdateModal(false)}
        >
          <img className="cancel-icon" src={cancelIcon} alt="cancel-icon" />
        </Button>
      </Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <Row>
            <Col lg={12} md={12} sm={12} xs={12}>
              <div className="form-group">
                <label className="update-textfield-label">Screen Name</label>
                <input
                  type="text"
                  className="form-control input-default form-field"
                  placeholder=" Screen Name"
                  value={screen}
                  required
                  onChange={(e) => setScreen(e.target.value)}
                />
              </div>
            </Col>
            <Col lg={12} md={12} sm={12} xs={12}>
              <div className="form-group">
                <label className="update-textfield-label">
                  Complete Address
                </label>
                <input
                  type="text"
                  className="form-control input-default form-field"
                  placeholder=" Complete Address"
                  value={address}
                  required
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </Col>
            <Col lg={12} md={12} sm={12} xs={12}>
              <div className="form-group location-field">
                <label className="update-textfield-label">
                  Google Location
                </label>
                <input
                  type="text"
                  className="form-control input-default form-field"
                  placeholder="Google Location"
                  value={location}
                  required
                  onChange={(e) => setLocation(e.target.value)}
                />
                <div className="search-location">
                  <img
                    className="search-loc-icon"
                    src={searchIcon}
                    alt="search-icon"
                  />
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
                type="submit"
                className="btn btn-primary btn-block primary-btn w-100"
              >
                Update Screen
              </Button>
            </Col>
          </Row>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default UpdateModal;
