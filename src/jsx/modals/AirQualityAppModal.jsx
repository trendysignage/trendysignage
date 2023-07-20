import { Button, Modal, Row, Col, Badge } from "react-bootstrap";
import cancelIcon from "../../img/cancel-icon.png";
import icon from "../../img/link-alt 1.svg";

import { Link } from "react-router-dom";
import Select from "react-select";
import { useState } from "react";
import Switch from "react-switch";
const AirQualityAppModal = ({ setShowUrlApp, show }) => {
  const options = [
    { value: "us", label: "us" },
    { value: "india", label: "India" },
  ];
  const options1 = [
    { value: "Light Mode", label: "Light Mode" },
    { value: "Dark Mode", label: "Dark Mode" },
  ];

  const [selectedOption, setSelectedOption] = useState(null);
  return (
    <Modal
      className="fade bd-example-modal-lg mt-4 app-modal"
      show={show}
      size="xl"
      centered
    >
      <Modal.Header className="border-0">
        <Modal.Title className="mr-auto app-modal-heading">
          Air Quality App
        </Modal.Title>
        <Button
          variant=""
          className="close"
          onClick={() => setShowUrlApp(false)}
        >
          <img
            className="cancel-icon"
            src={cancelIcon}
            alt="cancel-icon"
            height="25px"
            width="25px"
          />
        </Button>
      </Modal.Header>
      <Modal.Body>
        <form
          // onSubmit={handleSubmit}
          className="row"
        >
          <div className="form-group col-6 mb-0  url-app-form">
            <label>Name</label>
            <input
              type="text"
              className="  form-control "
              placeholder="App Name"
              required
            />
            <label className="mt-3">Location</label>
            <input
              type="text"
              className="  form-control "
              placeholder="Location"
              required
            />

            <label className="mt-3">AQI-IN/US</label>

            <Select
              defaultValue={selectedOption}
              // onChange={setSelectedOption}
              placeholder="us"
              options={options}
              className="app-option"
            />

            <label className="mt-3">Theme</label>

            <Select
              defaultValue={selectedOption}
              // onChange={setSelectedOption}
              placeholder="Light Mode"
              options={options1}
              className="app-option"
            />
          </div>
          <div className="col-6 ">
            <div className="d-flex justify-content-center align-items-center h-100 air-quality-app-form-icon">
              <div className="text-center">
                <img src={icon} width="60px" height="60px" className="mb-3" />
              </div>
            </div>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer className="border-0 mb-2">
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
              //   onClick={() => setNewTagModal(false)}
            >
              Create App
            </Button>
          </Col>
        </Row>
      </Modal.Footer>
    </Modal>
  );
};

export default AirQualityAppModal;
