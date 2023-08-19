import { Button, Modal, Row, Col, Badge } from "react-bootstrap";
import cancelIcon from "../../img/cancel-icon.png";
import icon from "../../img/link-alt 1.svg";

import { Link } from "react-router-dom";
import Select from "react-select";
import { useState, useEffect } from "react";
import { updateApps, addApps } from "../../utils/api";
const RssFeedAppModal = ({ setShowUrlApp, show, actionType, mediaData }) => {
  const options = [
    { value: "White Background", label: "white-background" },
    { value: "Color Background", label: "color-background" },
  ];
  const [showRedirectApp, setShowUrlRedirectApp] = useState(false)
  const [name, setName] = useState("");
  const [urlLink, setUrlLink] = useState(null);
  const [slideDuration, setSlideDuration] = useState(10)
  const [mediaId, setMediaId] = useState(null);
  const [theame,setTheame] = useState({ value: "White Background", label: "white-background" })
  const [err, setErr] = useState(false);
  const [errMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if(mediaData){
      const jsonString = JSON.parse(mediaData.appData);
      setName(mediaData.title);
      setUrlLink(jsonString.urlLink)
      setTheame(jsonString.theame);
      setSlideDuration(jsonString.slideDuration);
      setMediaId(mediaData._id);
    }
  },[mediaData])
  console.log("media", mediaData)

  const handleCreateApp = async(e) => {
    e.preventDefault();

    setErr(false);
    setErrorMessage("");
    if(name == ''){
      setErr(true);
      setErrorMessage("App Name is required");
    }
    if(err){
      return false;
    }
    const dataString = {
      url:name,urlLink,slideDuration,theame
    }

    if(actionType && actionType == 'edit'){
      await updateApps({
        name,
        appId:mediaId,
        data:JSON.stringify(dataString)
      });
      setShowUrlApp(false)
    }else{
      await addApps({
        name,
        type:'rss-apps',
        data:JSON.stringify(dataString)
      });
      setShowUrlApp(false)
      setShowUrlRedirectApp(true)
    }
    //console.log(name, urlLink, selectedOption)
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
            RSS Feed
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
              {/* <input
                type="text"
                className="  form-control "
                placeholder="cache"
                required
              /> */}
              <Select
                value={theame}
                onChange={setTheame}
                options={options}
                className="app-option"
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
                  <label className="form-check-label mt-0" htmlFor="aspectRation">
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
                  <label className="form-check-label mt-0" htmlFor="aspectRation">
                    Portrait
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
                  <label className="form-check-label mt-0" htmlFor="aspectRation">
                    Footer
                  </label>
                </div>
              </div>
              <div className="d-flex justify-content-center align-items-center h-100 rss-feed-app-form-icon">
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
                {actionType && actionType == 'edit' ? 'Update' : 'Create'} App
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
                <p>RSS FEED App is saved in <u>Media</u></p>
                <Link to={'/layout'}>Create Composition</Link>
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
