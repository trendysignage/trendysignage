import { Button, Modal, Row, Col, Badge } from "react-bootstrap";
import cancelIcon from "../../img/cancel-icon.png";
import Switch from "react-switch";
import Select from "react-select";
import { useState } from "react";
import Slider from "@mui/material/Slider";

const EditTemplate = ({ setShowUrlApp, show, setSettingData, settingData }) => {
  const fontOptions = [
    { value: "bree-sarif", label: "Bree Sarif" },
    { value: "oswald", label: "Oswald" },
    { value: "permanent", label: "Permanent Maker" },
  ];

  const [isTitle, setIsTitle] = useState(true);
  const [titleColor, setTitleColor] = useState(settingData.titleColor);
  const [nameColor, setNameColor] = useState(settingData.nameColor);
  const [messageColor, setMessageColor] = useState(settingData.messageColor);
  const [bgColor, setBgColor] = useState(settingData.bgColor);

  const [titleStyle, setTitleStyle] = useState(settingData.titleStyle);
  const [nameStyle, setNameStyle] = useState(settingData.nameStyle);
  const [messageStyle, setMessageStyle] = useState(settingData.messageStyle);
  const [bgStyle, setBgStyle] = useState(settingData.bgStyle);
  const [duration, setDuration] = useState(settingData.duration);
  const [bgOpacity, setBgOpacity] = useState(settingData.bgOpacity);

  const handleUpdate = (e) => {
    e.preventDefault();
    const setting = {
      isTitle,
      titleColor,
      nameColor,
      messageColor,
      titleStyle,
      nameStyle,
      messageStyle,
      bgStyle,
      duration,
      bgOpacity,
    };
    console.log("Setting", setting);
    setSettingData(setting);
    setShowUrlApp(false);
  };

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
              <div className=" d-flex align-items-center justify-content-between mt-3">
                <div className="d-flex align-items-center justify-content-between">
                  <strong>
                    <label className="mb-0 mr-3">Title</label>
                  </strong>
                  <Switch
                    onColor="#B3005E"
                    onChange={setIsTitle}
                    checked={isTitle}
                    name="isTitle"
                    id="isTitle"
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
                      name="duration"
                      id="duration"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between mt-3">
                <div>
                  <label className="mb-0">Title Font</label>
                </div>
                <div className="d-flex align-items-center ">
                  <div
                    style={{
                      marginLeft: "10px",
                      marginRight: "10px",
                      width: "120px",
                    }}
                  >
                    <input
                      type="color"
                      name="titleColor"
                      onChange={(e) => setTitleColor(e.target.value)}
                      id="titleColor"
                      value={titleColor}
                      className="  form-control "
                      required
                    />
                  </div>
                  <div style={{ width: "150px" }}>
                    <Select
                      value={titleStyle}
                      onChange={setTitleStyle}
                      placeholder="English"
                      options={fontOptions}
                      className="app-option"
                    />
                  </div>
                </div>
              </div>

              <strong>
                <label className="mt-4">Body</label>
              </strong>

              <div className="d-flex align-items-center justify-content-between mt-3">
                <div>
                  <label className="mb-0">Name</label>
                </div>
                <div className="d-flex align-items-center ">
                  <div
                    style={{
                      marginLeft: "10px",
                      marginRight: "10px",
                      width: "120px",
                    }}
                  >
                    <input
                      type="color"
                      name="nameColor"
                      id="nameColor"
                      onChange={(e) => setNameColor(e.target.value)}
                      value={nameColor}
                      className="  form-control "
                      required
                    />
                  </div>
                  <div style={{ width: "150px" }}>
                    <Select
                      value={nameStyle}
                      onChange={setNameStyle}
                      placeholder="English"
                      options={fontOptions}
                      className="app-option"
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between mt-3">
                <div>
                  <label className="mb-0">Message</label>
                </div>
                <div className="d-flex align-items-center ">
                  <div
                    style={{
                      marginLeft: "10px",
                      marginRight: "10px",
                      width: "120px",
                    }}
                  >
                    <input
                      type="color"
                      name="messageColor"
                      id="messageColor"
                      onChange={(e) => setMessageColor(e.target.value)}
                      value={messageColor}
                      className="  form-control "
                      required
                    />
                  </div>
                  <div style={{ width: "150px" }}>
                    <Select
                      value={messageStyle}
                      onChange={setMessageStyle}
                      placeholder="English"
                      options={fontOptions}
                      className="app-option"
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between mt-3">
                <div>
                  <label className="mb-0">Background</label>
                </div>
                <div className="d-flex align-items-center ">
                  <div style={{ width: "120px" }}>
                    <input
                      type="color"
                      name="bgColor"
                      id="bgColor"
                      onChange={(e) => setBgColor(e.target.value)}
                      value={bgColor}
                      className="  form-control "
                      required
                    />
                  </div>
                  <div
                    style={{
                      marginLeft: "10px",
                      width: "150px",
                    }}
                  >
                    <Select
                      value={bgStyle}
                      onChange={setBgStyle}
                      placeholder="English"
                      options={fontOptions}
                      className="app-option"
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center  justify-content-between mt-3">
                <div>
                  <label className="mb-0">Background Opacity</label>
                </div>
                <div
                  style={{
                    marginLeft: "10px",
                    marginRight: "10px",
                    width: "150px",
                  }}
                  className="d-flex align-items-center"
                >
                  <Slider
                    size="small"
                    value={bgOpacity}
                    onChange={(e) => setBgOpacity(e.target.value)}
                    aria-label="Small"
                    valueLabelDisplay="auto"
                  />
                  <p className="mb-0 ml-3">{bgOpacity}</p>
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
            onClick={(e) => handleUpdate(e)}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditTemplate;
