import { Button, Modal, Row, Col, Badge } from "react-bootstrap";
import cancelIcon from "../../img/cancel-icon.png";
import Switch from "react-switch";
import Select from "react-select";
import { useState } from "react";

const EditTemplate = ({ setShowUrlApp, show }) => {
  const languageOptions = [
    { value: "English", label: "English" },
    { value: "Japanese", label: "Japanese" },
    { value: "Spanish", label: "Spanish" },
  ];
  const [language, setLanguage] = useState(null);
  const [title, setTitle] = useState(true);

  return (
    <>
      <Modal
        className="fade bd-example-modal-lg mt-4 app-modal"
        show={show}
        size="lg"
        centered
      >
        <Modal.Header className="border-0">
          <Modal.Title className="mr-auto app-modal-heading">
            Update Content
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
        <Modal.Body className="pt-0">
          <form
          // onSubmit={handleSubmit}
          >
            <div>
              <strong>
                <label>Name</label>
              </strong>

              <input
                type="text"
                className="  form-control "
                placeholder=" Name"
                required
              />
              <strong>
                <label className="mt-3">Message</label>
              </strong>

              <textarea
                type="text"
                className="form-control"
                rows={5}
                placeholder="Enter Message"
              ></textarea>
              <div className=" d-flex align-items-center justify-content-between mt-3">
                <div className="d-flex align-items-center justify-content-between">
                  <strong>
                    <label className="mb-0 mr-3">Title</label>
                  </strong>
                  <Switch
                    onColor="#B3005E"
                    onChange={setTitle}
                    checked={title}
                    name="deviceTime"
                    id="deviceTime"
                    className="react-switch"
                    required={true}
                  />
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>
                      <label className="mb-0 mr-3">Slide Duration</label>
                    </strong>
                  </div>
                  <div>
                    <input
                      type="number"
                      className="  form-control "
                      placeholder=" Name"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center mt-3">
                <div>
                  <label className="mb-0">Title Font</label>
                </div>
                <div style={{ width: "120px" }}>
                  <input type="color" className="  form-control " required />
                </div>
                <div style={{ width: "150px" }}>
                  <Select
                    value={language}
                    // onChange={setTimeFormat}
                    placeholder="English"
                    options={languageOptions}
                    className="app-option"
                  />
                </div>
              </div>

              <strong>
                <label className="mt-4">Body</label>
              </strong>

              <div className="d-flex align-items-center mt-3">
                <div>
                  <label className="mb-0">Title Font</label>
                </div>
                <div style={{ width: "120px" }}>
                  <input type="color" className="  form-control " required />
                </div>
                <div style={{ width: "150px" }}>
                  <Select
                    value={language}
                    // onChange={setTimeFormat}
                    placeholder="English"
                    options={languageOptions}
                    className="app-option"
                  />
                </div>
              </div>
              <div className="d-flex align-items-center mt-3">
                <div>
                  <label className="mb-0">Message</label>
                </div>
                <div style={{ width: "120px" }}>
                  <input type="color" className="  form-control " required />
                </div>
                <div style={{ width: "150px" }}>
                  <Select
                    value={language}
                    // onChange={setTimeFormat}
                    placeholder="English"
                    options={languageOptions}
                    className="app-option"
                  />
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer className="border-0 mb-2">
          <Button
            variant=""
            type="button"
            className="btn btn-primary btn-block primary-btn"
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditTemplate;
