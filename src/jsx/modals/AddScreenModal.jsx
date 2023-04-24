import { Button, Modal, Row, Col, Alert } from "react-bootstrap";
import cancelIcon from "../../img/cancel-icon.png";
import TagInputField from "../components/screen/tagInputField";
import { useState } from "react";
import webScreen from "../../img/webScreen.png";


import { addScreen, validateScreenCode } from "../../utils/api";

const AddScreenModal = ({ setShowScreenModal, callAllScreenApi }) => {
  const [step, setStep] = useState(1);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [screenLocation, setScreenLocation] = useState("");
  const [googleLocation, setGoogleLocation] = useState("");
  const [tags, setTags] = useState([]);
  const [codeError, setCodeError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [screenLocationError, setScreenLocationError] = useState(false);
  const [googleLocationError, setGoogleLocationError] = useState(false);
  const [showError, setShowError] = useState("");

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const saveScreen = async () => {
    setShowError("")
    setCodeError(false)
    setNameError(false)
    setScreenLocationError(false)
    setGoogleLocationError(false)
    if (step === 1) {
      if(code.trim().length === 0){
        setCodeError(true)
        return false;
      }
      const validateCode =  await validateScreenCode(code)
      if(validateCode){
        setStep(2);
      } else {
        setCodeError(true)
        setShowError("Invalid registration code!")
      }
      return;
    }
    if(step === 2){
      let hassError = false
      if(name.trim().length === 0){
        setNameError(true)
        hassError = true
      }
      if(screenLocation.trim().length === 0){
        setScreenLocationError(true)
        hassError = true
      }
      if(googleLocation.trim().length === 0){
        setGoogleLocationError(true)
        hassError = true
      }
      if(hassError) return false
      const finalScreenData = {
        code: code,
        name: name,
        screenLocation: screenLocation,
        googleLocation: googleLocation,
        ...(tags.length ? { tags: tags } : {})
      };
      await addScreen(finalScreenData);
      await callAllScreenApi();
      setShowScreenModal(false);
      
    }
    if(step === 4){
      window.open(`/web-player`, '_blank');
      setStep(1);
      return;
    }
  };
  return (
    <Modal
      className="fade bd-example-modal-lg custom-modal custom-modal-medium"
      show={true}
      size="md"
    >
      <Modal.Header>
        <Modal.Title className={step === 3 ? " font22" : ""}>
          {step === 1 && "Register your screen"}
          {step === 2 && "Add Screen"}
          {step === 3 && "Try following if you don’t have display screen"}
          {step === 4 && "Webplayer"}
        </Modal.Title>
        <Button
          variant=""
          className="close"
          onClick={() => setShowScreenModal(false)}
        >
          <img className="cancel-icon" src={cancelIcon} alt="cancel-icon" />
        </Button>
      </Modal.Header>
      <Modal.Body>
        {step === 1 && (
          <div>
                <div className="image-container d-flex align-items-center justify-content-center flex-column mx-auto">
                  {/* <img className="devicebg" src={DeviceBG} alt="upload-img" /> */}
                  <div className="image-container-content">
                  <div className="image-text">Registration Code </div>
                  <div className="image-text2">******</div>
                  </div>
                
                </div>
            <div className="screenText">
              Enter the ‘Screen Registration Code’ as shown on your signage
              screen
            </div>
              <div className="form-group enter-code-textfield">
                {/* <label>Enter Code</label> */}
                <input
                  value={code}
                  type="text"
                  
                  className={`${codeError ? 'invalid' : ''} form-control input-default form-field`}
                  placeholder="Enter Code"
                  onChange={handleCodeChange}
                />
              </div>
          </div>
        )}
        {step === 2 && (
          <>
            {" "}
            <div className="add-screen-paragraph">
              <p>
                Want to add new screen? Please fill in some information and
                continue
              </p>
            </div>
            <Row>
              <Col lg={6} md={6} sm={6} xs={12}>
                <div className="form-group">
                  <input
                    type="text"
                    
                    className={`${nameError ? 'invalid' : ''} form-control input-default form-field`}
                    placeholder="Screen Name"
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                  />
                </div>
              </Col>
              <Col lg={6} md={6} sm={6} xs={12}>
                <div className="form-group">
                  <input
                    type="text"
                    className={`${screenLocationError ? 'invalid' : ''} form-control input-default form-field`}
                    placeholder="Screen Location"
                    value={screenLocation}
                    onChange={(event) => {
                      setScreenLocation(event.target.value);
                    }}
                  />
                </div>
              </Col>
              <Col lg={12} md={12} sm={12} xs={12}>
                <div className="form-group">
                  <input
                    type="text"
                    className={`${googleLocationError ? 'invalid' : ''} form-control input-default form-field`}
                    placeholder="Google Location"
                    value={googleLocation}
                    onChange={(event) => {
                      setGoogleLocation(event.target.value);
                    }}
                  />
                </div>
              </Col>
              <Col lg={12} md={12} sm={12} xs={12}>
                <TagInputField tags={tags} setTags={setTags} />
              </Col>
            </Row>
          </>
        )}
        {step === 3 && (
          <div className="webBrowserOptionSection w-100" onClick={()=>{
            setStep(4)
          }}>
            <Row className="w-100">
            <Col lg={6} md={6} sm={6} xs={12} className="d-flex align-items-center">
            <div className="try-card-img">
              <img className="browserImg" src={webScreen} alt="web screen" />
            </div>
              </Col>
              <Col lg={6} md={6} sm={6} xs={12} className="d-flex align-items-center flex-wrap pl-0">
              <div className="try-card-info">
              <p className="tryBrowser">Try browser based Webplayer</p>
              <p className="tryBrowserText">Works on all types of browsers <br/>(Ideal for quick start)</p>
            </div>
              </Col>
            </Row>
            
         
          </div>
        )}
        {step === 4 && (
          <div>
            {/* <div className="relative d-flex align-items-center justify-content-center flex-column">
              <div className="upload-flie-img">
                <div className="image-container">
                  <img className="devicebg" src={DeviceBG} alt="upload-img" />
                  <div className="image-text">Registration Code </div>
                  <div className="image-text2">ABDHSG</div>
                </div>
              </div>
            </div> */}
              <div className="image-container d-flex align-items-center justify-content-center flex-column mx-auto">
                  <div className="image-container-content">
                  <div className="image-text">Registration Code </div>
                  <div className="image-text2">ABDHSG</div>
                  </div>
                
                </div>
                <div className="using-webplayer-paragraph">
                  <p>You are about to start using the webplayer</p>
                </div>
                <div className="webplayer-list">
                  <ul>
                    <li>Please note, Webplayer is designed to give you the overall idea of how screens are registered using ‘Registration Code’</li>
                  <li>Use this Webplayer to check how the content generated from console will appear on TV screens.</li>
                  </ul>
                </div>
          </div>
        )}
      </Modal.Body>
      {step !== 3 && (
        <Modal.Footer>
        {showError !== "" &&              <div className="errorSection"> <Alert
                  
                  variant={"danger"}
                  className='solid alert-dismissible fade show'
                >
                   {showError}
                  
                </Alert></div>}
          <Button
            variant=""
            type="button"
            className="btn btn-primary btn-block primary-btn mx-0 register-screen-modal"
            onClick={() => saveScreen()}
          >
            {step === 1 && "Done"}
            {step === 2 && "Add Screen"}
            {step === 4 && "Okay"}
          </Button>
          {step === 1 && (
            <>
              <div className="alternetTextSection">
                {" "}
                <span>
                  Don’t have a display screen that is ready to use yet?
                </span>
              </div>
              <div className="alternetTextSection">
                <p
                  onClick={() => {
                    setStep(3);
                  }}
                >
                  Try Alternate Options
                </p>
              </div>
            </>
          )}
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default AddScreenModal;
