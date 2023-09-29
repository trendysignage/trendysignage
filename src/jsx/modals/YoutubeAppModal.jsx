import { Button, Modal, Row, Col, Badge } from "react-bootstrap";
import cancelIcon from "../../img/cancel-icon.png";
import icon from "../../img/link-alt 1.svg";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { updateApps, addApps } from "../../utils/api";
import { handleYoutubeApps } from "../../utils/UtilsService";

const YoutubeAppModal = ({ setShowUrlApp, show, mediaData, actionType }) => {
  const [showRedirectApp, setShowUrlRedirectApp] = useState(false);
  const [name, setName] = useState("");
  const [mediaId, setMediaId] = useState(null);
  const [urlLink, setUrlLink] = useState("");
  const [muteOptions, setMuteOptions] = useState(false);
  const [err, setErr] = useState(false);
  const [errMessage, setErrorMessage] = useState("");
  const [isRefresh, setIsRefresh] = useState(false);
  const [orientationMode, setOrientation] = useState("landscape");
  const [previewData, setPreviewData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (mediaData) {
      const jsonString = JSON.parse(mediaData.appData);
      console.log(jsonString);
      setName(mediaData.title.trim());
      setUrlLink(jsonString.url.trim());
      setMuteOptions(jsonString.mute);
      setMediaId(mediaData._id);
    }
  }, [mediaData]);
  console.log("media", mediaData);

  const handleCreateApp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErr(false);
    setErrorMessage("");
    if (name.trim() == "") {
      setErr(true);
      setErrorMessage("App Name is required");
      setIsLoading(false);
      return;
    }
    if (urlLink.trim() == "") {
      setErr(true);
      setErrorMessage("URL Link is required");
      setIsLoading(false);
      return;
    }
    const dataString = {
      url: urlLink,
      mute: muteOptions,
    };

    if (actionType && actionType == "edit") {
      await updateApps({
        name: name.trim(),
        appId: mediaId,
        data: JSON.stringify(dataString),
      });
      setShowUrlApp(false);
    } else {
      await addApps({
        name: name.trim(),
        type: "youtube-apps",
        data: JSON.stringify(dataString),
      });
      //setShowUrlApp(false);
      handleClose(false);
      setIsLoading(false);
      setShowUrlRedirectApp(true);
    }
    //console.log(name, urlLink, selectedOption)
  };

  const handleClose = (val) => {
    setName("");
    setUrlLink("");
    setMuteOptions(false);
    setShowUrlApp(val);
  };

  const handlePreview = () => {
    if (name && urlLink) {
      setPreviewData(
        handleYoutubeApps(
          JSON.stringify({
            url: urlLink,
            mute: muteOptions,
          })
        )
      );
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
            Youtube App
          </Modal.Title>
          <Button
            variant=""
            className="close"
            onClick={(e) => {
              e.preventDefault();
              handleClose(false);
            }}
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
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label className="mt-3">Video URL</label>
              <input
                type="text"
                className="  form-control "
                placeholder="https://www."
                required
                value={urlLink}
                onChange={(e) => setUrlLink(e.target.value)}
              />
              <label className="mt-3 mr-3">Mute</label>
              <input
                type="checkbox"
                checked={muteOptions}
                className="   "
                required
                onChange={(e) => {
                  setMuteOptions(e.target.checked);
                }}
              />
              <div className="youtube-info mt-3">
                <ul>
                  <li>
                    With this app. You can play Youtube videos on screen.{" "}
                  </li>
                  <li>Refer this guide on how to create the app.</li>
                </ul>
              </div>
              <Button onClick={handlePreview}>Preview</Button>
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
                    checked={orientationMode === "landscape"}
                    onChange={(e) => {
                      setOrientation(e.target.value);
                    }}
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
                    checked={orientationMode === "potrait"}
                    onChange={(e) => {
                      setOrientation(e.target.value);
                    }}
                    //disabled
                    // style={{cursor:"not-allowed"}}
                    // placeholder="Preview Not Available"
                  />
                  <label
                    className="form-check-label mt-0"
                    htmlFor="aspectRation"
                  >
                    Portrait
                  </label>
                </div>
              </div>
              <div className="d-flex justify-content-center align-items-center h-100">
                {orientationMode && orientationMode == "potrait" ? (
                  <div
                    className="d-flex justify-content-center h-100"
                    style={{ backgroundColor: "none" }}
                  >
                    <div className="p-3 h-100">
                      {previewData ? previewData : ""}
                    </div>
                  </div>
                ) : (
                  <>{previewData ? previewData : ""}</>
                )}
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer className="border-0 mb-2">
          <Row className="w-100 m-0">
            <Col lg={6} md={6} sm={6} xs={6} className="pl-0 pr-2">
              <Button
                className="cancel-btn w-100"
                variant="outline-light"
                onClick={(e) => {
                  e.preventDefault();
                  handleClose(false);
                }}
              >
                Cancel
              </Button>
            </Col>
            <Col lg={6} md={6} sm={6} xs={6} className="pl-2 pr-0">
              <Button
                variant=""
                type="button"
                className="btn btn-primary btn-block primary-btn"
                disabled={isLoading}
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

export default YoutubeAppModal;
