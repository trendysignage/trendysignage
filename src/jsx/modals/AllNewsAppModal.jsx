import { Button, Modal, Row, Col, Badge } from "react-bootstrap";
import cancelIcon from "../../img/cancel-icon.png";
import icon from "../../img/link-alt 1.svg";
import { addApps, updateApps, getNews } from "../../utils/api";
import { handleNewsApps } from "../../utils/UtilsService";
import { Link } from "react-router-dom";
import Select from "react-select";
import { useState, useEffect } from "react";

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
  const [topicPre, setTopicPre] = useState({ value: "world", label: "World" });
  const [showRedirectApp, setShowUrlRedirectApp] = useState(false);
  const [name, setName] = useState("");
  const [duration, setDuration] = useState(10);
  const [mediaId, setMediaId] = useState(null);
  const [err, setErr] = useState(false);
  const [errMessage, setErrorMessage] = useState("");
  const [preview, setPreview] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [orientationMode, setOrientation] = useState("landscape");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsRefresh(false)
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
  }, [mediaData, isRefresh, topic]);

  const handleCreateApp = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    setErr(false);
    setErrorMessage("");
    if (name.trim() == "") {
      setErr(true);
      setErrorMessage("App Name is required");
      setIsLoading(false)
      return
    }

      console.log("Hello", err);
      const dataString = {
        url: name.trim(),
        duration,
        theame: selectedTheame,
        topic,
        orientationMode,
      };

      if (actionType && actionType == "edit") {
        await updateApps({
          name:name.trim(),
          appId: mediaId,
          data: JSON.stringify(dataString),
        });
        setShowUrlApp(false);
        setIsLoading(false)
      } else {
        await addApps({
          name:name.trim(),
          type: "news-apps",
          data: JSON.stringify(dataString),
        });
        handleClose(false);
        setIsLoading(false)
        setShowUrlRedirectApp(true);
      }
  };

  const getNewsData = async (data) => {
    const quoteResult = await getNews(data);
    console.log(quoteResult);
    setNewsData(quoteResult);
    setNewsPreviewData(handleNewsApps(
      JSON.stringify({
        url: name,
        theame: selectedTheame,
        topic,
        orientationMode,
      }),
      quoteResult
    ))
  };

  const getNewsDataZone1 = (data) => {
    const prp = JSON.parse(data);
    if(topic.value !== topicPre.value){
      console.log("Not match")
       getNewsData(topic.value);
       setTopicPre(topic);
       setIsRefresh(true);
    }
    if (!newsData) {
       getNewsData(topic.value);
    }
    //return handleNewsApps(data, newsData);
  };

  // const getNewsDataZone1 = (data) => {
  //   const prp = JSON.parse(data);
  //   if(topic.value !== topicPre.value){
  //     console.log("Not match")
  //      getNewsData(topic.value);
  //      setTopicPre(topic);
  //      setIsRefresh(true);
  //   }
  //   if (!newsData) {
  //      getNewsData(topic.value);
  //   }
  //   return handleNewsApps(data, newsData);
  // };

  const handleTopic = (e) => {
    setTopic(e);
  }

  const handlePreview =(e) => {
    e.preventDefault();
    if (name) {
      if(topic.value !== topicPre.value){
        console.log("Not match")
         getNewsData(topic.value);
         setTopicPre(topic);
         setIsRefresh(true);
      }
      if (!newsData) {
         getNewsData(topic.value);
      }
      setIsRefresh(true);
      setPreview(true);
    } else {
      setPreview(false);
    }
  };

  const handleClose = (val) => {
    setNewsData(null);
    setNewsPreviewData(null);
    setSelectedTheame({
      value: "classic",
      label: "Classic View",
    });
    setTopic({ value: "world", label: "World" });
    setShowUrlRedirectApp(false);
    setName("");
    setDuration(10);
    setErr(false);
    setErrorMessage("");
    setOrientation("landscape");
    setShowUrlApp(val)
  }

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
            onClick={(e) => {e.preventDefault(); handleClose(false)}}
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
                onChange={(e) => {
                  handleTopic(e)
                }}
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
              <Button onClick={(e) => {handlePreview(e)}} className="mt-3">
                Previews
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
                onClick={(e) => {e.preventDefault(); handleClose(false)}}
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

export default AllNewsAppModal;
