import { Button, Modal, Row, Col, Badge } from "react-bootstrap";
import cancelIcon from "../../img/cancel-icon.png";
import icon from "../../img/link-alt 1.svg";

import { Link } from "react-router-dom";
import Select from "react-select";
import { useState, useEffect } from "react";
import { updateApps, addApps } from "../../utils/api";
import { handleClockApps } from "../../utils/UtilsService";
import Switch from "react-switch";
import { Preview } from "react-dropzone-uploader";
const ClockApp = ({ setShowUrlApp, show, mediaData, actionType }) => {
  const [orientationMode, setOrientation] = useState("landscape");
  const options = [
    { value: "Analogue - 12 hour", label: "Analogue - 12 hour" },
    { value: "Digital - 12 hour", label: "Digital - 12 hour" },
    { value: "Digital - 24hour", label: "Digital - 24hour" },
  ];
  const languageOptions = [
    { value: "English", label: "English" },
    { value: "Japanese", label: "Japanese" },
    { value: "Spanish", label: "Spanish" },
  ];
  const colorOptions = [
    { value: "Light Yellow", label: "Light Yellow" },
    { value: "Orange", label: "Orange" },
    {
      value: "Sky Blue",
      label: "Sky Blue",
    },
  ];
  const [name, setName] = useState(null);
  const [clockType, setClockType] = useState("regular");
  const [timeFormat, setTimeFormat] = useState({
    value: "Analogue - 12 hour",
    label: "Analogue - 12 hour",
  });
  const [err, setErr] = useState(false);
  const [errMessage, setErrorMessage] = useState("");
  const [mediaId, setMediaId] = useState(null);
  const [showRedirectApp, setShowUrlRedirectApp] = useState(false);
  const [deviceTime, setDeviceTime] = useState(false);
  const [hiddenLocation, setHiddenLocation] = useState(false);
  const [hideDate, setHideDate] = useState(false);
  const [roundCorner, setRoundeCorner] = useState(false);
  const [timeZone, setTimeZone] = useState("");
  const [language, setLanguage] = useState(null);

  const [color, setColor] = useState({ value: "Light Yellow", label: "Light Yellow" });

  const handleChange = (e) => {
    console.log(e.target);
    //setDeviceTime(e.target)
  };

  useEffect(() => {
    if (mediaData) {
      const jsonString = JSON.parse(mediaData.appData);
      console.log(jsonString);
      setName(mediaData.title);
      setClockType(jsonString.clockType);
      setTimeFormat({
        value: jsonString.timeFormat,
        label: jsonString.timeFormat,
      });
      setDeviceTime(jsonString.deviceTime);
      setHiddenLocation(jsonString.hiddenLocation);
      setRoundeCorner(jsonString.roundCorner);
      setHideDate(jsonString.hideDate);
      setTimeZone(jsonString.timeZone);
      setMediaId(mediaData._id);
      setColor(jsonString.color)
      setOrientation(jsonString.orientationMode)
    }
  }, [mediaData]);

  const handleCreateApp = async (e) => {
    e.preventDefault();

    setErr(false);
    setErrorMessage("");
    if (name == "") {
      setErr(true);
      setErrorMessage("App Name is required");
    } else if (timeZone == "") {
      setErr(true);
      setErrorMessage("TimeZone is required");
    }

    if (err) {
      return false;
    } else {
      console.log("Hello", err);
      const dataString = {
        url: name,
        timeZone,
        hideDate,
        hiddenLocation,
        deviceTime,
        timeFormat: timeFormat.value,
        roundCorner,
        clockType,
        color,
        orientationMode
      };

      if (actionType && actionType == "edit") {
        await updateApps({
          name,
          appId: mediaId,
          data: JSON.stringify(dataString),
        });
        setShowUrlApp(false);
      } else {
        await addApps({
          name,
          type: "clock-apps",
          data: JSON.stringify(dataString),
        });
        setShowUrlApp(false);
        setShowUrlRedirectApp(true);
      }
    }
  };
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
                name="name"
                id="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />

              <div className="row">
                <div className="col-6">
                  <label className="mt-3 mr-3">Regular Clock</label>
                  <input
                    type="radio"
                    value="regular"
                    checked={clockType && clockType == "regular"}
                    onChange={(e) => setClockType("regular")}
                    required
                  />
                </div>
                {/* <div className="col-6">
                  <label className="mt-3 mr-3">World Clock</label>
                  <input
                    type="radio"
                    value="world"
                    checked={clockType && clockType == "world"}
                    onChange={(e) => setClockType("world")}
                    required
                  />
                </div> */}
              </div>

              <label className="mt-3">Time Format</label>

              <Select
                value={timeFormat}
                onChange={setTimeFormat}
                placeholder="Select one from the list"
                options={options}
                className="app-option"
              />
              <div className="row mt-4">
                <div className="col-6 d-flex align-items-center justify-content-between">
                  <label className="mb-0 mr-3">Get device timezone</label>
                  <Switch
                    onColor="#B3005E"
                    onChange={setDeviceTime}
                    checked={deviceTime}
                    name="deviceTime"
                    id="deviceTime"
                    className="react-switch"
                    required={true}
                  />
                </div>
                <div className="col-6  d-flex align-items-center justify-content-between">
                  <label className="mb-0 mr-3">Hidden location</label>
                  <Switch
                    onColor="#B3005E"
                    onChange={setHiddenLocation}
                    checked={hiddenLocation}
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
                    onChange={setHideDate}
                    checked={hideDate}
                    className="react-switch"
                    required={true}
                  />
                </div>
                <div className="col-6  d-flex align-items-center  justify-content-between">
                  <label className="mb-0 mr-3">Rounded Corners</label>
                  <Switch
                    onColor="#B3005E"
                    onChange={setRoundeCorner}
                    checked={roundCorner}
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
                name="timeZone"
                id="timeZone"
                value={timeZone}
                onChange={(e) => setTimeZone(e.target.value)}
              />

              <label className="mt-3">Language</label>

              <Select
                value={language}
                // onChange={setTimeFormat}
                placeholder="English"
                options={languageOptions}
                className="app-option"
              />
              <label className="mt-3">Color Scheme</label>

              <Select
                value={color}
                onChange={setColor}
                placeholder="Light Yellow"
                options={colorOptions}
                className="app-option"
              />
            </div>
            <div className="col-6 ">
              <div className="d-flex ">
                {" "}
                <div className="form-check mr-4">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="orientation"
                    value="landscape"
                    id="landscape"
                    checked={orientationMode === 'landscape'}
                    onChange={(e) => {setOrientation(e.target.value)}}
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
                    name="orientation"
                    value="potrait"
                    id="potrait"
                    checked={orientationMode === 'potrait'}
                    onChange={(e) => {setOrientation(e.target.value)}}
                  />
                  <label
                    className="form-check-label mt-0"
                    htmlFor="aspectRation"
                  >
                    Portrait
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="orientation"
                    value="footer"
                    id="footer"
                    checked={orientationMode === 'footer'}
                    onChange={(e) => {setOrientation(e.target.value)}}
                  />
                  <label
                    className="form-check-label mt-0"
                    htmlFor="aspectRation"
                  >
                    Footer
                  </label>
                </div>
              </div>
              <div className="d-flex justify-content-center align-items-center h-100 clock-app-form-icon">
                {/* <div className="text-center">
                  <img src={icon} width="60px" height="60px" className="mb-3" />
                </div> */}
                {
                  orientationMode === "landscape" && Preview 
                  ?
                  handleClockApps(JSON.stringify({
                    clockType:"regular",
                    color:color.value,
                    deviceTime,
                    hiddenLocation,
                    hideDate,
                    roundCorner,
                    timeFormat:timeFormat.value,
                    timeZone,
                    url:"Clock App"
                  }))
                  : <h6>{orientationMode}</h6>
                }
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer className="border-0 mb-2">
          <Row className="w-100 m-0">
            <Col lg={6} md={6} sm={6} xs={6} className="pl-0 pr-2">
              <Button className="cancel-btn w-100" variant="outline-light"
                onClick={() => setShowUrlApp(false)}
              >
                Cancel
              </Button>
            </Col>
            <Col lg={6} md={6} sm={6} xs={6} className="pl-2 pr-0">
              <Button
                variant=""
                type="button"
                className="btn btn-primary btn-block primary-btn"
                onClick={(e) => handleCreateApp(e)}
              >
                {actionType && actionType == "edit" ? "Update" : "Create"} App
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
                  <p>Clock App created successfully</p>
                  <p>
                    Clock App is saved in <u>Media</u>
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

export default ClockApp;
