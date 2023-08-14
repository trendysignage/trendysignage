import { Button, Modal, Row, Col, Badge } from "react-bootstrap";
import cancelIcon from "../../img/cancel-icon.png";
import icon from "../../img/link-alt 1.svg";

import { Link } from "react-router-dom";
import Select from "react-select";
import { useEffect, useState } from "react";
import { updateApps, addApps } from "../../utils/api";
const TextAppModal = ({ setShowUrlApp, show, mediaData , actionType }) => {
  const options = [
    { value: "left", label: "Left" },
    { value: "right", label: "Right" },
    { value: "center", label: "Center" },
  ];

  const options3 = [
    { value: "Regular", label: "Regular" },
    { value: "Italic", label: "Italic" },
    { value: "Bold", label: "Bold" },
  ];
  const options1 = [
    { value: "100", label: "Slow" },
    { value: "200", label: "Medium" },
    { value: "300", label: "300" },
    { value: "400", label: "400" },
    { value: "500", label: "500" },
    { value: "600", label: "600" },
    { value: "700", label: "700" },
  ];
  const options2 = [
    { value: "Fira Sans", label: "Fira Sans" },
    { value: "Poppins", label: "Poppins" },
    { value: "Poppins", label: "Poppins" },
    { value: "Manrope", label: "Manrope" },
    { value: "Sans Serif", label: "Sans Serif" },
  ];
  const [showRedirectApp, setShowUrlRedirectApp] = useState(false)
  const [name, setName] = useState("");
  //const [text, setText] = useState("");
  const [content, setContent] = useState("");
  const [selectedStyle, setSelectedStyle] = useState({ value: "Regular", label: "Regular"});
  const [weight, setWeight] = useState({ value: "slow", label: "Slow" });
  const [allign, setAllign] = useState({ value: "left", label: "Left" });
  const [familyStyle, setFamilyStyle] = useState({ value: "Fira Sans", label: "Fira Sans" });
  const [isTransparent, setIsTransparent] = useState(false);
  const [err, setErr] = useState(false);
  const [errMessage, setErrorMessage] = useState('');
  const [tColor, setTextColor] = useState("#000000");
  const [backColor, setBackColor] = useState("#000000");
  const [mediaId, setMediaId] = useState(null);

  useEffect(() => {
    if(mediaData){
      console.log("media", mediaData, actionType)
      const jsonString = JSON.parse(mediaData.appData);
        console.log(jsonString)
        setName(mediaData.title);
        //setText(jsonString.text);
        setSelectedStyle({value:jsonString.style,label:jsonString.style});
        setAllign({value:jsonString.allign,label:jsonString.allign});
        setTextColor(jsonString.textColor)
        setBackColor(jsonString.backGroundColor)
        setMediaId(mediaData._id);
        setWeight({value:jsonString.weight,label:jsonString.weight})
        setFamilyStyle({value:jsonString.familyStyle,label:jsonString.familyStyle})
        setContent(jsonString.content)
        setIsTransparent(jsonString.isTransparent)
    }
  },[mediaData])
  

  const handleCreateApp = async(e) => {
    e.preventDefault();

    setErr(false);
    setErrorMessage("");
    if(name == ''){
      setErr(true);
      setErrorMessage("App Name is required");
    }
    else if(content == ''){
      setErr(true);
      setErrorMessage("Content is required");
    }

    if(err){
      return false;
    }else{
      console.log("Hello", err)
      const dataString = {
        allign:allign.value,
        weight:weight.value,
        textColor:tColor,
        familyStyle:familyStyle.value,
        backGroundColor:backColor,
        style:selectedStyle.value,
        url:name,
        isTransparent,
        //text,
        content
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
          type:'text-apps',
          data:JSON.stringify(dataString)
        });
        setShowUrlApp(false)
        setShowUrlRedirectApp(true)
      }

    }
    
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
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => {setName(e.target.value)}}
                  required
                />
                <label className="mt-3">Content</label>
                <textarea
                  type="text"
                  className="  form-control "
                  placeholder="Type Content"
                  required
                  name="content"
                  id="content"
                  value={content}
                  onChange={(e) => {setContent(e.target.value)}}
                  rows={4}
                />
                {/* <label className="mt-3">Text </label>
                <textarea
                  type="text"
                  className="  form-control "
                  placeholder="Type Content"
                  required
                  name="text"
                  id="text"
                  value={text}
                  onChange={(e) => {setText(e.target.value)}}
                  rows={4}
                /> */}
                <div className="row">
                  <div className="col-3">
                    <label className="mt-3">Color </label>

                    <input
                      type="color"
                      className="  form-control "
                      placeholder="App Name"
                      required
                      value={tColor}
                      name="tColor"
                      id="tColor"
                      onChange={(e) => {setTextColor(e.target.value)}}
                    />
                  </div>
                  <div className="col-3">
                    <label className="mt-3">Allignment </label>

                    <Select
                      value={allign}
                      onChange={setAllign}
                      options={options}
                      className="app-option"
                    />
                  </div>
                  <div className="col-3">
                    <label className="mt-3">Weight </label>

                    <Select
                      defaultValue={weight}
                      onChange={setWeight}
                      options={options1}
                      className="app-option"
                    />
                  </div>
                  <div className="col-3">
                    <label className="mt-3">Family Style </label>

                    <Select
                      defaultValue={familyStyle}
                      onChange={setFamilyStyle}
                      options={options2}
                      className="app-option"
                    />
                  </div>
                </div>

                <label className="mt-3">Text Style</label>
                <Select
                  defaultValue={selectedStyle}
                  onChange={setSelectedStyle}
                  options={options3}
                  className="app-option"
                />
                <div className="row">
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
                  <div className="col-6">
                    <label className="mt-3 mr-3">Transparent</label>
                    <input type="checkbox" className="   " required checked={isTransparent} onChange={(e) => setIsTransparent(e.target.checked)} />
                  </div>
                </div>
              </div>
              <div className="col-6 ">
                <div className="d-flex justify-content-center align-items-center h-100 text-app-form-icon">
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
              <p>Text App created successfully</p>
              <p>Text App is saved in <u>Media</u></p>
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

export default TextAppModal;
