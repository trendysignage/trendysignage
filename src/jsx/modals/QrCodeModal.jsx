import { Button, Modal, Row, Col, Badge } from "react-bootstrap";
import cancelIcon from "../../img/cancel-icon.png";
import icon from "../../img/link-alt 1.svg";
import { useState, useEffect } from "react";
import { updateApps, addApps } from "../../utils/api";
import { Link } from "react-router-dom";
import Select from "react-select";
import qrupload from "../../img/qrupload.svg";

const QrCodeModal = ({ setShowUrlApp, show, actionType, mediaData }) => {
  const [showRedirectApp, setShowUrlRedirectApp] = useState(false);
  const [name, setName] = useState("");
  const [urlLink, setUrlLink] = useState("");
  const [appTitle, setAppTitle] = useState("");
  const [appDesc, setAppDesc] = useState("");
  const [mediaId, setMediaId] = useState(null);
  const [err, setErr] = useState(false);
  const [errMessage, setErrorMessage] = useState("");
  const [color, setColor] = useState({ value: "lightYellow", label: "Light Yellow" });

  const colorOptions = [
    { value: "lightYellow", label: "Light Yellow" },
    { value: "orange", label: "Orange" },
    {
      value: "skyBlue",
      label: "Sky Blue",
    },
  ];
  useEffect(() => {
    if (mediaData) {
      const jsonString = JSON.parse(mediaData.appData);
      console.log(jsonString);
      setName(mediaData.title);
      setUrlLink(jsonString.url);
      setAppDesc(jsonString.appDesc);
      setAppTitle(jsonString.appTitle);
      setMediaId(mediaData._id);
      setColor(jsonString.color)
    }
  }, [mediaData]);
  console.log("media", mediaData);

  const handleCreateApp = async (e) => {
    e.preventDefault();

    setErr(false);
    setErrorMessage("");
    if (name == "") {
      setErr(true);
      setErrorMessage("App Name is required");
    } else if (urlLink == "") {
      setErr(true);
      setErrorMessage("URL Link is required");
    } else if (appTitle == "") {
      setErr(true);
      setErrorMessage("App Title is required");
    } else if (appDesc == "") {
      setErr(true);
      setErrorMessage("App Description is required");
    }
    if (err) {
      return false;
    }
    const dataString = {
      url: urlLink,
      appTitle,
      appDesc,
      name,
      color
    };
console.log(dataString)
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
        type: "qrcode-apps",
        data: JSON.stringify(dataString),
      });
      setShowUrlApp(false);
      setShowUrlRedirectApp(true);
    }
    //console.log(name, urlLink, selectedOption)
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
            Qr Code App
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
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <label className="mt-3">Url Link</label>
              <input
                type="text"
                className="  form-control "
                placeholder="https://www."
                required
                name="urlLink"
                id="urlLink"
                value={urlLink}
                onChange={(e) => {
                  setUrlLink(e.target.value);
                }}
              />
              <label className="mt-3">App Tital</label>
              <input
                type="text"
                className="  form-control "
                placeholder="Eg. Scan to view full brochure"
                required
                name="appTitle"
                id="appTitle"
                value={appTitle}
                onChange={(e) => {
                  setAppTitle(e.target.value);
                }}
              />
              <label className="mt-3"> App Description</label>
              <textarea
                type="text"
                className="  form-control "
                placeholder="Eg. Please scan this QR Code to view our Product Brochure on your mobile phone."
                required
                rows={4}
                name="appDesc"
                id="appDesc"
                value={appDesc}
                onChange={(e) => {
                  setAppDesc(e.target.value);
                }}
              />
              <div className="row">
                <div className="col-8">
                  <label className="mt-3">Color Scheme</label>
                  <Select
                    value={color}
                    onChange={setColor}
                    placeholder="Light Yellow"
                    options={colorOptions}
                    className="app-option"
                  />
                </div>
                {/* <div className="col-4">
                  <label className="mt-3">Color Scheme</label>
                  <div>
                    <img src={qrupload} alt="icon" />
                  </div>
                </div> */}
              </div>
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
              <div className="d-flex justify-content-center align-items-center h-100 qr-code-app-form-icon">
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

export default QrCodeModal;
