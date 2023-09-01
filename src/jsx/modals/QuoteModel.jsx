import { Button, Modal, Row, Col, Badge } from "react-bootstrap";
import cancelIcon from "../../img/cancel-icon.png";
import icon from "../../img/link-alt 1.svg";
import { addApps, updateApps } from "../../utils/api";

import { Link } from "react-router-dom";
import Select from "react-select";
import { useState, useEffect } from "react";
const QuoteModel = ({ setShowUrlApp, show, mediaData }) => {
  const options = [
    { value: "Light yellow", label: "Light Yellow" },
    { value: "Orange", label: "Orange" },
    { value: "Sky Blue", label: "Sky Blue" },
  ];
  const fontOptions = [
    { value: "Rubik", label: "Rubik" },
    { value: "Roboto", label: "Roboto" },
    { value: "Poppins", label: "Poppins" },
  ];
  const [selectedOption, setSelectedOption] = useState({
    value: "Light yellow",
    label: "Light Yellow",
  });
  const [selectedFontOption, setSelectedFontOption] = useState({
    value: "Rubik",
    label: "Rubik",
  });
  const [showRedirectApp, setShowUrlRedirectApp] = useState(false);
  const [name, setName] = useState("");
  const [mediaId, setMediaId] = useState(null);
  const [urlLink, setUrlLink] = useState("");
  const [err, setErr] = useState(false);
  const [errMessage, setErrorMessage] = useState("");

  return (
    <>
      <Modal
        className="fade bd-example-modal-lg mt-4 app-modal"
        show={show}
        size="xl"
        centered
      >
        <Modal.Header className="border-0">
          <Modal.Title className="mr-auto app-modal-heading">
            Quote App
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
                className="form-control "
                placeholder="App Name"
                required
              />
              <label className="mt-3"> Slide Duration (in seconds)</label>
              <input
                type="number"
                className="  form-control "
                placeholder="10"
                required
              />
              <label className="mt-3">Color Scheme </label>
              <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
                className="app-option"
              />
              <label className="mt-3">Font </label>
              <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={fontOptions}
                className="app-option"
              />
            </div>
            <div className="col-6 ">
              <div className="d-flex">
                {" "}
                <div className="form-check mr-4">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="viewImage"
                    value="aspectRation"
                    id="aspectRation"
                    // onChange={handleOptionChange}
                    // defaultChecked={viewImage === "aspectRation"}
                  />
                  <label
                    className="form-check-label mt-0"
                    htmlFor="aspectRation"
                  >
                    Landscape
                  </label>
                </div>
                <div className="form-check mr-4">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="viewImage"
                    value="aspectRation"
                    id="aspectRation"
                    // onChange={handleOptionChange}
                    // defaultChecked={viewImage === "aspectRation"}
                  />
                  <label
                    className="form-check-label mt-0"
                    htmlFor="aspectRation"
                  >
                    Portrait
                  </label>
                </div>
              </div>
              <div className="d-flex justify-content-center align-items-center h-100 quote-app-form-icon">
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
              >
                Create App
              </Button>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>
      <Modal
        className="fade bd-example-modal-lg mt-4 app-modal"
        show={showRedirectApp}
        size="xl"
        centered
      >
        <Modal.Header className="border-0">
          <Button
            variant=""
            className="close"
            onClick={() => setShowUrlRedirectApp(false)}
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
          <div className="row">
            <div className="col-6 ">
              <div className="d-flex justify-content-center align-items-center h-100 url-app-form-icon">
                <div className="text-center">
                  <img src={icon} width="60px" height="60px" className="mb-3" />
                  <h4>https://www.</h4>
                </div>
              </div>
            </div>
            <div className="col-6 ">
              <div className="d-flex justify-content-center align-items-center">
                <div className="text-center">
                  <p>URL App created successfully</p>
                  <p>
                    URL App is saved in <u>Media</u>
                  </p>
                  <Link to={"/layout"}>Create Composition</Link>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default QuoteModel;
