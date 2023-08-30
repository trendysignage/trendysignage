import { Button, Modal, Row, Col, Badge } from "react-bootstrap";
import cancelIcon from "../../img/cancel-icon.png";
import icon from "../../img/link-alt 1.svg";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { updateApps, addApps } from "../../utils/api";
const GoogleSlideAppModal = ({ setShowUrlApp, show }) => {
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
            Google Slide
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
            <div className="form-group col-6 mb-0  url-app-form google-slide-form">
              <label>Name</label>
              <input
                type="text"
                className="  form-control "
                placeholder="App Name"
                required
              />

              <p className="mb-0 model-info-h text-black mt-3">
                This app let’s you publish Google workspace files on screens.
              </p>
              <p>Use either of the options mentioned below.</p>

              <div className=" my-3">
                <p className="model-info-h">Option 1</p>
                <ul>
                  <li>Open the Google file you wish to publish.</li>
                  <li>
                    Change the access from ‘Restricted’ to ‘Public’. Here’s how
                  </li>
                  <li>
                    Paste the link below and click on “Create App” button.{" "}
                  </li>
                </ul>
              </div>
              <input
                type="text"
                className="  form-control "
                placeholder="Paste embed link here"
                required
              />
              <div className=" my-3">
                <p className="model-info-h">Option 2</p>
                <ul>
                  <li>Open the Google file you wish to publish.</li>
                  <li>
                    Change the access from ‘Restricted’ to ‘Public’. Here’s how
                  </li>
                  <li>
                    Paste the link below and click on “Create App” button.{" "}
                  </li>
                </ul>
              </div>
              <input
                type="text"
                className="  form-control "
                placeholder="Continue with Google"
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
                <div className="form-check">
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
                    Footer
                  </label>
                </div>
              </div>
              <div className="d-flex justify-content-center align-items-center h-100 google-slide-icon">
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
              ></Button>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>
      {/* <Modal
        className="fade bd-example-modal-lg mt-4 app-modal"
        // show={showRedirectApp}
        size="xl"
        centered
      >
        <Modal.Header className="border-0">
          <Button
            variant=""
            className="close"
            // onClick={() => setShowUrlRedirectApp(false)}
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
      </Modal> */}
    </>
  );
};

export default GoogleSlideAppModal;
