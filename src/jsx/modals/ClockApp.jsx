import { Button, Modal, Row, Col, Badge } from "react-bootstrap";
import cancelIcon from "../../img/cancel-icon.png";
import icon from "../../img/link-alt 1.svg";

import { Link } from "react-router-dom";
import Select from "react-select";
import { useState } from "react";
import Switch from "react-switch";
const ClockApp = ({ setShowUrlApp, show }) => {
  const options = [
    { value: "lefAnalogue - 12 hourt", label: "Analogue - 12 hour" },
    { value: "Digital - 12 hour", label: "Digital - 12 hour" },
    { value: "Digital - 24hour", label: "Digital - 24hour" },
  ];
  const [checked, setChecked] = useState(false);
  const [checkedLocation, setCheckedLocation] = useState(false);
  const [checkedRounded, setCheckedRounded] = useState(false);
  const [checkedDate, setCheckedDate] = useState(false);

  const handleChange = (nextChecked) => {
    setChecked(nextChecked);
  };
  const handleChangeLocation = (nextChecked) => {
    setCheckedLocation(nextChecked);
  };
  const handleChangeRounded = (nextChecked) => {
    setCheckedRounded(nextChecked);
  };
  const handleChangeDate = (nextChecked) => {
    setCheckedDate(nextChecked);
  };

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
          Clock App
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

            <div className="row">
              <div className="col-6">
                <label className="mt-3 mr-3">Regular Clock</label>
                <input type="checkbox" className="   " required />
              </div>
              <div className="col-6">
                <label className="mt-3 mr-3">World Clock</label>
                <input type="checkbox" className="   " required />
              </div>
            </div>

            <label className="mt-3">Time Format</label>

            <Select
              defaultValue={selectedOption}
              // onChange={setSelectedOption}
              placeholder="Select one from the list"
              options={options}
              className="app-option"
            />
            <div className="row mt-4">
              <div className="col-6 d-flex align-items-center justify-content-between">
                <label className="mb-0 mr-3">Get device timezone</label>
                <Switch
                  onColor="#B3005E"
                  onChange={handleChange}
                  checked={checked}
                  className="react-switch"
                  required={true}
                />
              </div>
              <div className="col-6  d-flex align-items-center justify-content-between">
                <label className="mb-0 mr-3">Hidden location</label>
                <Switch
                  onColor="#B3005E"
                  onChange={handleChangeLocation}
                  checked={checkedLocation}
                  className="react-switch"
                  required={true}
                />
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-6 d-flex align-items-center justify-content-between">
                <label className="mb-0 mr-3">Hide date</label>
                <Switch
                  onColor="#B3005E"
                  onChange={handleChangeDate}
                  checked={checkedDate}
                  className="react-switch"
                  required={true}
                />
              </div>
              <div className="col-6  d-flex align-items-center  justify-content-between">
                <label className="mb-0 mr-3">Rounded Corners</label>
                <Switch
                  onColor="#B3005E"
                  onChange={handleChangeRounded}
                  checked={checkedRounded}
                  className="react-switch"
                  required={true}
                />
              </div>
            </div>

            <label className="mt-3">Timezone</label>
            <input
              type="text"
              className="  form-control "
              placeholder="Timezone"
              required
            />
          </div>
          <div className="col-6 ">
            <div className="d-flex justify-content-center align-items-center h-100 clock-app-form-icon">
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

export default ClockApp;
