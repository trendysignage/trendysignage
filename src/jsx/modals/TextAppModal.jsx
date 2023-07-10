import { Button, Modal, Row, Col, Badge } from "react-bootstrap";
import cancelIcon from "../../img/cancel-icon.png";
import icon from "../../img/link-alt 1.svg";

import { Link } from "react-router-dom";
import Select from "react-select";
import { useState } from "react";
const TextAppModal = ({ setShowUrlApp, show }) => {
  const options = [
    { value: "left", label: "Left" },
    { value: "right", label: "Right" },
    { value: "center", label: "Center" },
  ];
  const options1 = [
    { value: "100", label: "Slow" },
    { value: "200", label: "Medium" },
    { value: "300", label: "300" },
    { value: "400", label: "400" },
    { value: "500", label: "500" },
    { value: "600", label: "600" },
    { value: "700", label: "700" },
  ];
  const options2 = [
    { value: "Fira Sans", label: "Fira Sans" },
    { value: "Poppins", label: "Poppins" },
    { value: "Poppins", label: "Poppins" },
    { value: "Manrope", label: "Manrope" },
    { value: "Sans Serif", label: "Sans Serif" },
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
          Scroller Text App
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
            <label className="mt-3">Content</label>
            <textarea
              type="text"
              className="  form-control "
              placeholder="Type Content"
              required
              rows={4}
            />
            <label className="mt-3">Text </label>
            <div className="row">
              <div className="col-3">
                <label className="mt-3">Color </label>

                <input
                  type="color"
                  className="  form-control "
                  placeholder="App Name"
                  required
                  value="#000000"
                />
              </div>
              <div className="col-3">
                <label className="mt-3">Allignment </label>

                <Select
                  defaultValue={selectedOption}
                  // onChange={setSelectedOption}
                  options={options}
                  //   style={{
                  //     lineHeight: "40px",
                  //     color: "#7e7e7e",
                  //     paddingLeft: " 15px",
                  //     padding: "10px",
                  //   }}
                  className="app-option"
                />
              </div>
              <div className="col-3">
                <label className="mt-3">Weight </label>

                <Select
                  defaultValue={selectedOption}
                  // onChange={setSelectedOption}
                  options={options1}
                  //   style={{
                  //     lineHeight: "40px",
                  //     color: "#7e7e7e",
                  //     paddingLeft: " 15px",
                  //     padding: "10px",
                  //   }}
                  className="app-option"
                />
              </div>
              <div className="col-3">
                <label className="mt-3">Family Style </label>

                <Select
                  defaultValue={selectedOption}
                  // onChange={setSelectedOption}
                  options={options2}
                  //   style={{
                  //     lineHeight: "40px",
                  //     color: "#7e7e7e",
                  //     paddingLeft: " 15px",
                  //     padding: "10px",
                  //   }}
                  className="app-option"
                />
              </div>
            </div>

            <label className="mt-3">Text Style</label>
            {/* <input
              type="text"
              className="  form-control "
              placeholder="cache"
              required
            /> */}
            <Select
              defaultValue={selectedOption}
              // onChange={setSelectedOption}
              options={options}
              //   style={{
              //     lineHeight: "40px",
              //     color: "#7e7e7e",
              //     paddingLeft: " 15px",
              //     padding: "10px",
              //   }}
              className="app-option"
            />
            <div className="row">
              <div className="col-6">
                <label className="mt-3">Background Color</label>
                <input
                  type="color"
                  className="  form-control "
                  placeholder="Text to be scrolled"
                  value="#000000"
                  required
                />
              </div>
              <div className="col-6">
                <label className="mt-3 mr-3">Transparent</label>
                <input type="checkbox" className="   " required />
              </div>
            </div>
          </div>
          <div className="col-6 ">
            <div className="d-flex justify-content-center align-items-center h-100 text-app-form-icon">
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

export default TextAppModal;
