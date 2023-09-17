import { Button, Modal, Row, Col, Badge } from "react-bootstrap";
import cancelIcon from "../../img/cancel-icon.png";
import icon from "../../img/link-alt 1.svg";
import { updateApps, addApps } from "../../utils/api";
import { Link } from "react-router-dom";
import Select from "react-select";
import { useEffect, useState } from "react";
const ScrollerTextAppModal = ({ setShowScrollerTextApp, show, mediaData , actionType }) => {
  const [showRedirectApp, setShowUrlRedirectApp] = useState(false)
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [selectedStyle, setSelectedStyle] = useState({ value: "regular", label: "Regular"});
  const [speed, setSpeed] = useState({ value: "slow", label: "Slow" });
  const [allign, setAllign] = useState({ value: "rightToLeft", label: "Right to Left" });
  const [err, setErr] = useState(false);
  const [errMessage, setErrorMessage] = useState('');
  const [tColor, setTextColor] = useState("#000000");
  const [backColor, setBackColor] = useState("#000000");
  const [mediaId, setMediaId] = useState(null);
  const options = [
    { value: "regular", label: "Regular" },
    { value: "italic", label: "italic" },
    { value: "bold", label: "Bold" },
  ];
  const options1 = [
    { value: "slow", label: "Slow" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
  ];
  const options2 = [
    { value: "rightToLeft", label: "Right to Left" },
    { value: "leftToRight", label: "Left to Right" },
  ];
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if(mediaData){
      console.log("media", mediaData, actionType)
      const jsonString = JSON.parse(mediaData.appData);
        console.log(jsonString)
        setName(mediaData.title);
        setText(jsonString.text);
        setSelectedStyle(jsonString.style);
        setSpeed(jsonString.speed);
        setAllign(jsonString.allign);
        setTextColor(jsonString.textColor)
        setBackColor(jsonString.backGroundColor)
        setMediaId(mediaData._id);
    }
  },[mediaData])
  

  const handleCreateApp = async(e) => {
    e.preventDefault();
    setIsLoading(true)
    setErr(false);
    setErrorMessage("");
    if(name.trim() == ''){
      setErr(true);
      setErrorMessage("App Name is required");
      setIsLoading(false)
      return 
    }
    if(text.trim() == ''){
      setErr(true);
      setErrorMessage("Text is required");
      setIsLoading(false)
      return;
    }

      console.log("Hello", err)
      const dataString = {
        allign:allign,
        speed:speed,
        textColor:tColor,
        backGroundColor:backColor,
        style:selectedStyle,
        url:name.trim(),
        text:text.trim()
      }
  
      if(actionType && actionType == 'edit'){
        await updateApps({
          name:name.trim(),
          appId:mediaId,
          data:JSON.stringify(dataString)
        });
        setShowScrollerTextApp(false)
      }else{
        await addApps({
          name:name.trim(),
          type:'scroller',
          data:JSON.stringify(dataString)
        });
        setShowScrollerTextApp(false);
        setIsLoading(false)
        setShowUrlRedirectApp(true)
      }
      console.log(name, text, selectedStyle, speed, allign)

    
  }

  const handleClose = (val) => {
    setName("");
    setText('');
    setSelectedStyle({ value: "regular", label: "Regular"});
    setSpeed({ value: "slow", label: "Slow" });
    setAllign({ value: "rightToLeft", label: "Right to Left" });
    setBackColor("#000000");
    setTextColor("#000000")
    setShowScrollerTextApp(val)
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
            Scroller Text App
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
          {err && errMessage !== '' ? <h6 className="alert alert-danger">{errMessage}</h6> : ''}
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
                onChange={(e) => {setName(e.target.value)}}
              />
              <label className="mt-3">Text</label>
              <input
                type="text"
                className="  form-control "
                placeholder="Text to be scrolled"
                required
                name="text"
                id="text"
                value={text}
                onChange={(e) => {setText(e.target.value)}}
              />

              <label className="mt-3">Text Style</label>
              <Select
                value={selectedStyle}
                onChange={setSelectedStyle}
                options={options}
                className="app-option"
              />
              <div className="row">
                <div className="col-6">
                  <label className="mt-3">Text Color</label>
                  <input
                    type="color"
                    className="  form-control "
                    placeholder="Text to be scrolled"
                    value={tColor}
                    name="textColor"
                    id="textColor"
                    onChange={(e) => {setTextColor(e.target.value)}}
                    required
                    
                  />
                </div>

                <div className="col-6">
                  <label className="mt-3">Background Color</label>
                  <input
                    type="color"
                    className="  form-control "
                    placeholder="Text to be scrolled"
                    value={backColor}
                    name="backColor"
                    id="backColor"
                    onChange={(e) => {setBackColor(e.target.value)}}
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-6">
                  <label className="mt-3">Scroll Speed</label>

                  <Select
                    value={speed}
                    onChange={setSpeed}
                    options={options1}
                    className="app-option"
                  />
                </div>

                <div className="col-6">
                  <label className="mt-3">Scroll Direction</label>

                  <Select
                    value={allign}
                    onChange={setAllign}
                    options={options2}
                    className="app-option"
                  />
                </div>
              </div>
            </div>
            <div className="col-6 ">
              <div className="d-flex justify-content-center align-items-center h-100 scroll-text-app-form-icon">
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
              <Button className="cancel-btn w-100" variant="outline-light"
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
                //   onClick={() => setNewTagModal(false)}
                onClick={(e) => handleCreateApp(e)}
                disabled={isLoading}
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
                <p>Scroller App created successfully</p>
                <p>Scroller App is saved in <u>Media</u></p>
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

export default ScrollerTextAppModal;
