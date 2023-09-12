import { Button, Modal, Row, Col, Badge } from "react-bootstrap";
import cancelIcon from "../../img/cancel-icon.png";
import icon from "../../img/link-alt 1.svg";
import { addApps, updateApps, getNews } from "../../utils/api";
import { handleNewsApps } from "../../utils/UtilsService";
import { Link } from "react-router-dom";
import Select from "react-select";
import { useState, useEffect } from "react";
import Switch from "react-switch";

const AllNewsAppModal = ({ setShowUrlApp, show, actionType, mediaData }) => {
  const [newsData, setNewsData] = useState(null);
  const [newsPreviewData, setNewsPreviewData] = useState(null);
  const topics = [
    { value: "world", label: "World" },
    { value: "business", label: "Business" },
    { value: "technology", label: "Technology" },
    { value: "science", label: "Science" },
    { value: "health", label: "Health" },
    { value: "most-viewed", label: "Most Viewed" },
    { value: "movies", label: "Movies" },
    { value: "travel", label: "Travel" },
    { value: "automobile", label: "Automobile" },
    { value: "asia-pacific", label: "Asia Pacific" },
    { value: "education", label: "Education" },
    { value: "media", label: "Media" },
    { value: "fashion", label: "Fashion and style" },
  ];
  const themeOptions = [
    { value: "classic", label: "Classic View" },
    { value: "white", label: "White Background Center" },
  ];
  const [selectedTheame, setSelectedTheame] = useState({
    value: "classic",
    label: "Classic View",
  });
  const [topic, setTopic] = useState({ value: "world", label: "World" });
  const [showRedirectApp, setShowUrlRedirectApp] = useState(false);
  const [name, setName] = useState("");
  const [duration, setDuration] = useState(10);
  const [mediaId, setMediaId] = useState(null);
  const [err, setErr] = useState(false);
  const [errMessage, setErrorMessage] = useState("");
  const [preview, setPreview] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [orientationMode, setOrientation] = useState("landscape");

  useEffect(() => {
    if (mediaData) {
      console.log("media", mediaData, actionType);
      const jsonString = JSON.parse(mediaData.appData);
      setName(mediaData.title);
      setMediaId(mediaData._id);
      setDuration(jsonString.duration);
      setSelectedTheame(jsonString.theame);
      setTopic(jsonString.topic);
      setOrientation(
        jsonString.orientationMode ? jsonString.orientationMode : "landscape"
      );
    }
  }, [mediaData]);

  const handleCreateApp = async (e) => {
    e.preventDefault();

    setErr(false);
    setErrorMessage("");
    if (name == "") {
      setErr(true);
      setErrorMessage("App Name is required");
    }

    if (err) {
      return false;
    } else {
      console.log("Hello", err);
      const dataString = {
        url: name,
        duration,
        theame: selectedTheame,
        topic,
        orientationMode,
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
          type: "news-apps",
          data: JSON.stringify(dataString),
        });
        setShowUrlApp(false);
        setShowUrlRedirectApp(true);
      }
    }
  };

  const getNewsData = async (data) => {
    const quoteResult = await getNews(data);
    console.log(quoteResult);
    setNewsData(quoteResult);
  };

  const getNewsDataZone1 = (data) => {
    const prp = JSON.parse(data);

    if (!newsData) {
      getNewsData(topic);
    }
    console.log(data, newsData);
    return handleNewsApps(data, newsData);
  };

  const handlePreview = async () => {
    console.log(preview);
    if (name) {
      setNewsPreviewData(
        getNewsDataZone1(
          JSON.stringify({
            url: name,
            theame: selectedTheame,
            topic,
            orientationMode,
          }),
          newsData
        )
      );
      setIsRefresh(true);
      setPreview(true);
    } else {
      setPreview(false);
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
            All News App
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
                name="name"
                id="name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
                type="text"
                className="form-control "
                placeholder="App Name"
                required
              />

              <label className="mt-3">Topic </label>
              <Select
                value={topic}
                onChange={setTopic}
                options={topics}
                className="app-option"
              />
              <label className="mt-3">Slide Duration (in seconds)</label>
              <input
                name="duration"
                id="duration"
                onChange={(e) => {
                  setDuration(e.target.value);
                }}
                value={duration}
                type="number"
                className="form-control "
                placeholder="10"
                required
              />
              <label className="mt-3">Theme </label>
              <Select
                value={selectedTheame}
                onChange={setSelectedTheame}
                options={themeOptions}
                className="app-option"
              />
              {/* <div className="d-flex align-items-center mt-3">
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
              <Button onClick={handlePreview} className="mt-3">
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
                    disabled
                    style={{ cursor: "not-allowed" }}
                    placeholder="Preview Not Available"
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
                    disabled
                    style={{ cursor: "not-allowed" }}
                  />
                  <label
                    className="form-check-label mt-0"
                    htmlFor="aspectRation"
                  >
                    Footer
                  </label>
                </div>
              </div>
              <div className=" h-100 quote-app-form-icon">
                <div className="text-center h-100 ">
                  {newsPreviewData ? newsPreviewData : "News Loading..."}
                </div>
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

export default AllNewsAppModal;
