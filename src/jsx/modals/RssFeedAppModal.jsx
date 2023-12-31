import { Button, Modal, Row, Col, Badge } from "react-bootstrap";
import cancelIcon from "../../img/cancel-icon.png";
import icon from "../../img/link-alt 1.svg";
import deleteicon from "../../img/delete-btn.png";
import { Link } from "react-router-dom";
import Select from "react-select";
import { useState, useEffect } from "react";
import { updateApps, addApps, BASE_URL, rssParser } from "../../utils/api";
import Switch from "react-switch";
import SelectMedia from "./SelecteMedia";
import Carousel from "react-material-ui-carousel";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Slide from "@mui/material/Slide";
import newsimg from "../../img/news-image.webp";
import { handleRssApps } from "../../utils/UtilsService";

const RssFeedAppModal = ({ setShowUrlApp, show, actionType, mediaData }) => {
  const options = [
    { value: "classic", label: "Classic View" },
    { value: "blurred", label: "Blurred" },
    { value: "white", label: "White Background" },
    { value: "white-center", label: "White Background Center" },
    { value: "bottom-load", label: "Bottom Load" },
  ];
  const [showRedirectApp, setShowUrlRedirectApp] = useState(false);
  const [name, setName] = useState("");
  const [urlLink, setUrlLink] = useState("");
  const [slideDuration, setSlideDuration] = useState(10);
  const [mediaId, setMediaId] = useState(null);
  const [theame, setTheame] = useState({
    value: "white-background",
    label: "White Background",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageModalShow, setImageModalShow] = useState(false);
  const [err, setErr] = useState(false);
  const [errMessage, setErrorMessage] = useState("");
  const [preview, setPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [orientationMode, setOrientation] = useState("landscape");
  const [previewData, setPreviewData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    //rssParser();
    if (mediaData) {
      const jsonString = JSON.parse(mediaData.appData);
      setName(mediaData.title);
      setUrlLink(jsonString.urlLink);
      setTheame(jsonString.theame);
      setSlideDuration(jsonString.slideDuration);
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
      setErrorMessage("RSS Feed URL is required");
      setIsLoading(false);
      return;
    }
    const dataString = {
      url: name.trim(),
      urlLink: urlLink.trim(),
      slideDuration,
      theame,
      selectedImage,
      orientationMode,
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
        type: "rss-apps",
        data: JSON.stringify(dataString),
      });
      //setShowUrlApp(false);
      handleClose(false);
      setIsLoading(false);
      setShowUrlRedirectApp(true);
    }
    //console.log(name, urlLink, selectedOption)
  };

  const list = [
    {
      title:
        " title 1We Consider Requests As They Come': United Nations On Row Over 'Bharat Vs India' Name",
      content:
        "'Testament To Our Shared Vision And Collaboration For Better Future': PM Modi At ASEAN-India Summit In Jakarta",
    },
    {
      title:
        " title 2We Consider Requests As They Come': United Nations On Row Over 'Bharat Vs India' Name",
      content:
        "'Testament To Our Shared Vision And Collaboration For Better Future': PM Modi At ASEAN-India Summit In Jakarta",
    },
    {
      title:
        " title 3We Consider Requests As They Come': United Nations On Row Over 'Bharat Vs India' Name",
      content:
        "'Testament To Our Shared Vision And Collaboration For Better Future': PM Modi At ASEAN-India Summit In Jakarta",
    },
    {
      title:
        " title 4We Consider Requests As They Come': United Nations On Row Over 'Bharat Vs India' Name",
      content:
        "'Testament To Our Shared Vision And Collaboration For Better Future': PM Modi At ASEAN-India Summit In Jakarta",
    },
    {
      title:
        " title 5We Consider Requests As They Come': United Nations On Row Over 'Bharat Vs India' Name",
      content:
        "'Testament To Our Shared Vision And Collaboration For Better Future': PM Modi At ASEAN-India Summit In Jakarta",
    },
  ];
  const data = {
    slideDuration: 10,
    theame: {
      value: "classic",
      label: "Classic",
    },
  };

  const handleClose = (val) => {
    setName("");
    setUrlLink("");
    setSlideDuration(10);
    setTheame({
      value: "white-background",
      label: "White Background",
    });
    setSelectedImage(null);
    setOrientation("landscape");
    setShowUrlApp(val);
  };

  // const rssParserHandle = async() => {
  //   const data = await rssParser()
  // }

  const handlePreview = () => {
    if (name && urlLink) {
      setPreview(true);
      const dt = handleRssApps({
        url: name,
        urlLink,
        slideDuration,
        theame,
        selectedImage,
        urlLink: { items: list },
        orientationMode,
      });
      console.log("rssfeed", dt);
      setPreviewData(dt);
    } else {
      setPreview(false);
    }
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
            RSS Feed
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
              {errMessage && (
                <h6 className="alert alert-danger">{errMessage}</h6>
              )}
              <label>Name</label>
              <input
                type="text"
                className="  form-control "
                placeholder="App Name"
                required
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label className="mt-3">RSS Feed URL</label>
              <input
                type="text"
                className="  form-control "
                placeholder="https://example.com"
                required
                name="urlLink"
                id="urlLink"
                value={urlLink}
                onChange={(e) => setUrlLink(e.target.value)}
              />
              <label className="mt-3">Slide Duration (in seconds)</label>
              <input
                type="number"
                className="  form-control "
                placeholder="0"
                required
                name="slideDuration"
                id="slideDuration"
                value={slideDuration}
                onChange={(e) => setSlideDuration(e.target.value)}
              />
              <label className="mt-3">Theme</label>
              <Select
                value={theame}
                onChange={setTheame}
                options={options}
                className="app-option mb-3"
              />
              {selectedImage ? (
                <>
                  <img
                    className="media-img img-fluid mr-3"
                    src={`${BASE_URL}${selectedImage}`}
                    alt="media-img"
                    style={{
                      height: "50px",
                      width: "50px",
                      objectFit: "cover",
                    }}
                  />
                  <img
                    onClick={(e) => setSelectedImage(null)}
                    src={deleteicon}
                    alt="icon"
                    style={{ height: "20px", cursor: "pointer" }}
                    className="mr-3"
                  />
                </>
              ) : (
                <Button
                  className="btn btn-sm mr-2"
                  variant="outline-light"
                  onClick={(e) => {
                    setImageModalShow(true);
                  }}
                >
                  Image
                </Button>
              )}
              <Button
                className="btn btn-sm mr-2"
                variant="outline-light"
                onClick={(e) => {
                  handlePreview(true);
                }}
              >
                Preview
              </Button>
              {/* <div className="d-flex align-items-center justify-content-between mt-3">
                <label className="mb-0 mr-3">Enable Animation?</label>
                <Switch
                  onColor="#B3005E"
                  // onChange={setDeviceTime}
                  checked={true}
                  name="deviceTime"
                  id="deviceTime"
                  className="react-switch"
                  required={true}
                />
              </div> */}
            </div>
            <div className="col-6 ">
              {/* <div className="d-flex ">
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
                <div className="form-check">
                  <input
                    placeholder="Preview Not Available"
                    className="form-check-input"
                    type="radio"
                    name="orientation"
                    value="footer"
                    id="footer"
                    checked={orientationMode === "footer"}
                    onChange={(e) => {
                      setOrientation(e.target.value);
                    }}
                  />
                  <label
                    className="form-check-label mt-0"
                    htmlFor="aspectRation"
                  >
                    Footer
                  </label>
                </div>
              </div> */}
              <div className="d-flex justify-content-center align-items-center h-100 rss-feed-app-form-icon">
                {previewData && preview ? previewData : ""}
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
                  <p>RSS FEED App created successfully</p>
                  <p>
                    RSS FEED App is saved in <u>Media</u>
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

export default RssFeedAppModal;
