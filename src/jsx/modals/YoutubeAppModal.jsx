import { Button, Modal, Row, Col, Badge } from "react-bootstrap";
import cancelIcon from "../../img/cancel-icon.png";
import icon from "../../img/link-alt 1.svg";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { updateApps, addApps } from "../../utils/api";
const YoutubeAppModal = ({ setShowUrlApp, show, mediaData , actionType}) => {

  const [showRedirectApp, setShowUrlRedirectApp] = useState(false)
  const [name, setName] = useState("");
  const [mediaId, setMediaId] = useState(null);
  const [urlLink, setUrlLink] = useState(""); 
  const [muteOptions, setMuteOptions] = useState(false)
  const [err, setErr] = useState(false);
  const [errMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if(mediaData){
      const jsonString = JSON.parse(mediaData.appData);
      console.log(jsonString)
      setName(mediaData.title);
      setUrlLink(jsonString.url);
      setMuteOptions(jsonString.mute);
      setMediaId(mediaData._id)
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
    if(urlLink == ''){
      setErr(true);
      setErrorMessage("URL Link is required");
    }
    if(err){
      return false;
    }
    const dataString = {
      url:urlLink,
      mute:muteOptions
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
        type:'youtube-apps',
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
            Video App
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
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label className="mt-3">Video Url</label>
              <input
                type="text"
                className="  form-control "
                placeholder="https://www."
                required
                value={urlLink}
                onChange={(e) => setUrlLink(e.target.value)}
              />
              <label className="mt-3 mr-3">Mute</label>
              <input type="checkbox" checked={muteOptions} className="   " required onChange={(e) => {setMuteOptions(e.target.checked)}} />
              <div className="youtube-info mt-3">
                <ul>
                  <li>With this app. You can play Youtube videos on screen. </li>
                  <li>Refer this guide on how to create the app.</li>
                </ul>
              </div>
            </div>
            <div className="col-6 ">
              <div className="d-flex justify-content-center align-items-center h-100 youtube-app-form-icon">
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
                  <p>URL App created successfully</p>
                  <p>URL App is saved in <u>Media</u></p>
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

export default YoutubeAppModal;
