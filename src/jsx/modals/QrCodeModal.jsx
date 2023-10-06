import { Button, Modal, Row, Col, Badge } from "react-bootstrap";
import cancelIcon from "../../img/cancel-icon.png";
import icon from "../../img/link-alt 1.svg";
import { useState, useEffect } from "react";
import { updateApps, addApps, BASE_URL } from "../../utils/api";
import { Link } from "react-router-dom";
import Select from "react-select";
import qrupload from "../../img/qrupload.svg";
import SelectMedia from "./SelecteMedia";
import deleteicon from "../../img/delete-btn.png";
import { handleQrApps } from "../../utils/UtilsService";

const QrCodeModal = ({ setShowUrlApp, show, actionType, mediaData }) => {
  const [showRedirectApp, setShowUrlRedirectApp] = useState(false);
  const [name, setName] = useState("");
  const [urlLink, setUrlLink] = useState("");
  const [appTitle, setAppTitle] = useState("");
  const [appDesc, setAppDesc] = useState("");
  const [mediaId, setMediaId] = useState(null);
  const [err, setErr] = useState(false);
  const [errMessage, setErrorMessage] = useState("");
  const [color, setColor] = useState({
    value: "lightYellow",
    label: "Light Yellow",
  });
  const [preview, setPreview] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [orientationMode, setOrientation] = useState("landscape");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageModalShow, setImageModalShow] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
      setColor(jsonString.color);
      setSelectedImage(jsonString.image);
      setOrientation(
        jsonString.orientationMode ? jsonString.orientationMode : "landscape"
      );
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
    if (appTitle.trim() == "") {
      setErr(true);
      setErrorMessage("App Title is required");
      setIsLoading(false);
      return;
    }
    if (appDesc.trim() == "") {
      setErr(true);
      setErrorMessage("App Description is required");
      setIsLoading(false);
      return;
    }
    const dataString = {
      url: urlLink.trim(),
      appTitle: appTitle.trim(),
      appDesc: appDesc.trim(),
      name: name.trim(),
      color,
      orientationMode,
      image: selectedImage,
    };
    console.log(dataString);
    if (actionType && actionType == "edit") {
      await updateApps({
        name: name.trim(),
        appId: mediaId,
        data: JSON.stringify(dataString),
      });
      setShowUrlApp(false);
      setIsLoading(false);
    } else {
      await addApps({
        name: name.trim(),
        type: "qrcode-apps",
        data: JSON.stringify(dataString),
      });
      handleClose(false);
      setIsLoading(false);
      setShowUrlRedirectApp(true);
    }
    //console.log(name, urlLink, selectedOption)
  };

  const handlePreview = () => {
    if (name && urlLink && appTitle) {
      setPreview(true);
      setPreviewData(
        handleQrApps(
          JSON.stringify({
            url: urlLink,
            appTitle,
            appDesc,
            name,
            color,
            orientationMode,
            image: selectedImage,
          })
        )
      );
    } else {
      setPreview(false);
    }
  };

  const handleClose = (val) => {
    setName("");
    setUrlLink("");
    setAppTitle("");
    setAppDesc("");
    setColor({ value: "lightYellow", label: "Light Yellow" });
    setOrientation("landscape");
    setShowUrlApp(val);
  };
  return (
    <>
      <SelectMedia
        imageModalShow={imageModalShow}
        setImageModalShow={setImageModalShow}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
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
                name="name"
                id="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <label className="mt-3">URL Link</label>
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
              <label className="mt-3">App Title</label>
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
                <div className="col-4">
                  {selectedImage ? (
                    <>
                      <label className="mt-4"></label>
                      <div className="d-flex align-items-center mt-3">
                        <img
                          className="media-img img-fluid"
                          src={`${BASE_URL}${selectedImage}`}
                          alt="media-img"
                          style={{
                            width: "138px",
                          }}
                        />
                        <img
                          onClick={(e) => setSelectedImage(null)}
                          src={deleteicon}
                          alt="icon"
                          style={{ height: "20px", cursor: "pointer" }}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <label className="mt-3">Select Media</label>
                      <div
                        onClick={(e) => {
                          setImageModalShow(true);
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        <img src={qrupload} alt="icon" />
                      </div>
                    </>
                  )}
                </div>
              </div>
              <Button className="mt-3" onClick={handlePreview}>
                Preview
              </Button>
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
                      {previewData && preview ? previewData : ""}
                    </div>
                  </div>
                ) : (
                  <>{previewData && preview ? previewData : ""}</>
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
                onClick={(e) => handleCreateApp(e)}
                disabled={isLoading}
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
