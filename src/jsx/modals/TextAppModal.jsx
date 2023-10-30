import { Button, Modal, Row, Col, Badge } from "react-bootstrap";
import cancelIcon from "../../img/cancel-icon.png";
import icon from "../../img/link-alt 1.svg";

import { Link } from "react-router-dom";
import Select from "react-select";
import { useEffect, useState } from "react";
import { updateApps, addApps } from "../../utils/api";
const TextAppModal = ({ setShowUrlApp, show, mediaData, actionType }) => {
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
    { value: "100", label: "100" },
    { value: "200", label: "200" },
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
  const [fontSize , setFontSize] = useState(12);
  const [showRedirectApp, setShowUrlRedirectApp] = useState(false);
  const [name, setName] = useState("");
  const [orientationMode, setOrientation] = useState("landscape");
  const [content, setContent] = useState("");
  const [selectedStyle, setSelectedStyle] = useState({value: "Regular",label: "Regular"});
  const [weight, setWeight] = useState({ value: "100", label: "100" });
  const [allign, setAllign] = useState({ value: "left", label: "Left" });
  const [familyStyle, setFamilyStyle] = useState({
    value: "Fira Sans",
    label: "Fira Sans",
  });
  const [isTransparent, setIsTransparent] = useState(false);
  const [err, setErr] = useState(false);
  const [errMessage, setErrorMessage] = useState("");
  const [tColor, setTextColor] = useState("#000000");
  const [backColor, setBackColor] = useState("#000000");
  const [mediaId, setMediaId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleFontSize = (e, size) => {
    e.preventDefault();
    console.log("size",size)
    if(size < 12 || size > 100){
      return;
    }
    setFontSize(size);
  }

  useEffect(() => {
    if (mediaData) {
      console.log("media", mediaData, actionType);
      const jsonString = JSON.parse(mediaData.appData);
      console.log(jsonString);
      setName(mediaData.title);
      setSelectedStyle({ value: jsonString.style, label: jsonString.style });
      setAllign({ value: jsonString.allign, label: jsonString.allign });
      setTextColor(jsonString.textColor);
      setBackColor(jsonString.backGroundColor);
      setMediaId(mediaData._id);
      setWeight({ value: jsonString.weight, label: jsonString.weight });
      setFamilyStyle({
        value: jsonString.familyStyle,
        label: jsonString.familyStyle,
      });
      setFontSize(jsonString.fontSize)
      setContent(jsonString.content);
      setIsTransparent(jsonString.isTransparent);
      setOrientation(jsonString.orientationMode ? jsonString.orientationMode : "")
    }
  }, [mediaData]);

  const handleCreateApp = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    setErr(false);
    setErrorMessage("");
    if (name.trim() == "") {
      setErr(true);
      setErrorMessage("App Name is required");
      setIsLoading(false);
      return;
    }
    if (content.trim() == "") {
      setErr(true);
      setErrorMessage("Content is required");
      setIsLoading(false);
      return;
    }
      console.log("Hello", err);
      const dataString = {
        allign: allign.value,
        weight: weight.value,
        textColor: tColor,
        familyStyle: familyStyle.value,
        backGroundColor: backColor,
        style: selectedStyle.value,
        url: name.trim(),
        isTransparent,
        orientationMode,
        content:content.trim(),
        fontSize
      };

      if (actionType && actionType == "edit") {
        await updateApps({
          name:name.trim(),
          appId: mediaId,
          data: JSON.stringify(dataString),
        });
        setIsLoading(false);
        setShowUrlApp(false);
      } else {
        await addApps({
          name:name.trim(),
          type: "text-apps",
          data: JSON.stringify(dataString),
        });
        setShowUrlApp(false);
        setIsLoading(false);
        setShowUrlRedirectApp(true);
      }
  };

  const handleClose = (val) => {
    setName("");
    setOrientation("landscape");
    setContent("");
    setSelectedStyle({value: "Regular",label: "Regular"});
    setWeight({ value: "slow", label: "Slow" });
    setAllign({ value: "left", label: "Left" });
    setFamilyStyle({value: "Fira Sans",label: "Fira Sans"});
    setIsTransparent(false);
    setTextColor("#000000");
    setBackColor("#000000");
    setShowUrlApp(val);
    setFontSize(12)
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
            Text App
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
                type="text"
                className="  form-control "
                placeholder="App Name"
                name="name"
                id="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
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
                onChange={(e) => {
                  setContent(e.target.value);
                }}
                rows={4}
              />
               <div className="row">
                  <div className="col-12">
                    <label className="mt-3">Font Size</label>
                    <div>
                      <Button onClick={(e) =>{handleFontSize(e, fontSize-1)}} className="btnnew">-</Button>
                      <span className="marginLR">{fontSize}</span>
                      <Button onClick={(e) =>{handleFontSize(e, fontSize+1)}} className="btnnew">+</Button>
                    </div>
                  </div>
                </div>
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
                    onChange={(e) => {
                      setTextColor(e.target.value);
                    }}
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
                    onChange={(e) => {
                      setBackColor(e.target.value);
                    }}
                    required
                  />
                </div>
                <div className="col-6">
                  <label className="mt-3 mr-3">Transparent</label>
                  <input
                    type="checkbox"
                    className="   "
                    required
                    checked={isTransparent}
                    onChange={(e) => setIsTransparent(e.target.checked)}
                  />
                </div>
              </div>
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
                    checked={orientationMode === 'landscape'}
                    onChange={(e) => {setOrientation(e.target.value)}}
                    
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
                    checked={orientationMode === 'potrait'}
                    onChange={(e) => {setOrientation(e.target.value)}}
                    disabled
                    style={{cursor:"not-allowed"}}
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
                    checked={orientationMode === 'footer'}
                    onChange={(e) => {setOrientation(e.target.value)}}
                    disabled
                    style={{cursor:"not-allowed"}}
                  />
                  <label
                    className="form-check-label mt-0"
                    htmlFor="aspectRation"
                  >
                    Footer
                  </label>
                </div>
              </div>
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
              <Button className="cancel-btn w-100"
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
                  <p>Text App created successfully</p>
                  <p>
                    Text App is saved in <u>Media</u>
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

export default TextAppModal;
