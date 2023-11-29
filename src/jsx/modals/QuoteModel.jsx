import { Button, Modal, Row, Col, Badge } from "react-bootstrap";
import cancelIcon from "../../img/cancel-icon.png";
import icon from "../../img/link-alt 1.svg";
import { addApps, updateApps, getQuotes } from "../../utils/api";
import { handleQuoteApps } from "../../utils/UtilsService";

import { Link } from "react-router-dom";
import Select from "react-select";
import { useState, useEffect } from "react";
const QuoteModel = ({ setShowUrlApp, show, mediaData, actionType }) => {
  const [quoteData, setQuoteData] = useState(null);
  const [quotePreviewData, setQuotePreviewData] = useState(null);
  const colorSchemeOptions1 = [
    { value: "lightYellow", label: "Light Yellow" },
    { value: "orange", label: "Orange" },
    { value: "skyBlue", label: "Sky Blue" },
  ];
  const colorSchemeOptions = [
    { value: "#d62128", label: "Red Scarlet" },
    { value: "#f36523", label: "Orange" },
    {
      value: "#f7861e",
      label: "Pumpkin Orange",
    },
    { value: "#fcb410", label: "Goldenrod" },
    { value: "#fdee21", label: "Yellow" },
    { value: "#8ec641", label: "Lime Green" },

    { value: "#08b252", label: "Forest Green" },
    { value: "#30bdb4", label: "Turquoise" },
    { value: "#2357bc", label: "Cobalt Blue" },

    { value: "#4d489c", label: "Deep Purple" },
    { value: "#733a99", label: "Eggplant Purple" },
    { value: "#af3b94", label: "Dark Magenta" },
  ];
  const fontOptions = [
    { value: "regular", label: "Regular" },
    { value: "italic", label: "Italic" },
    { value: "bold", label: "Bold" },
  ];
  const [color, setColor] = useState({
    value: "#fdee21",
    label: "Light Yellow",
  });
  const [selectedFontOption, setSelectedFontOption] = useState({
    value: "regular",
    label: "Regular",
  });
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
    if (mediaData) {
      console.log("media", mediaData, actionType);
      const jsonString = JSON.parse(mediaData.appData);
      setName(mediaData.title);
      setMediaId(mediaData._id);
      setSelectedFontOption(jsonString.fontStyle);
      setColor(jsonString.color);
      setOrientation(
        jsonString.orientationMode ? jsonString.orientationMode : "landscape"
      );
    }
  }, [mediaData]);

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
    const dataString = {
      url: name.trim(),
      fontStyle: selectedFontOption,
      color,
      duration,
      orientationMode,
    };

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
        type: "quote-apps",
        data: JSON.stringify(dataString),
      });
      handleClose(false);
      setIsLoading(false);
      setShowUrlRedirectApp(true);
    }
  };

  const getQuoteData = async (data) => {
    const quoteResult = await getQuotes(data);
    setQuoteData(quoteResult);
    setQuotePreviewData(
      handleQuoteApps(
        JSON.stringify({
          url: name,
          fontStyle: selectedFontOption,
          color,
          orientationMode,
          duration,
        }),
        quoteResult
      )
    );
  };

  // const getQuoteDataZone1 = (data) => {
  //   const prp = JSON.parse(data);

  //   if (!quoteData) {
  //     const prms = {
  //       cat: "famous",
  //       count: "10",
  //     };
  //     console.log("Hello Quote Calling");
  //     getQuoteData(prms);
  //   }
  //   return handleQuoteApps(data, quoteData);
  // };

  const handlePreview = () => {
    console.log(preview);
    if (name) {
      const prms = {
        cat: "famous",
        count: "10",
      };
      console.log("Hello Quote Calling");
      getQuoteData(prms);
      setIsRefresh(true);
      setPreview(true);
    } else {
      setPreview(false);
    }
  };

  const handleClose = (val) => {
    setQuoteData(null);
    setQuotePreviewData(null);

    setColor({
      value: "lightYellow",
      label: "Light Yellow",
    });
    setSelectedFontOption({
      value: "regular",
      label: "Regular",
    });
    setShowUrlRedirectApp(false);
    setName("");
    setDuration(10);
    setErr(false);
    setErrorMessage("");
    setOrientation("landscape");
    setShowUrlApp(val);
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
            Quote App
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
          {err && errMessage !== "" ? (
            <h6 className="alert alert-danger">{errMessage}</h6>
          ) : (
            ""
          )}
          <form
            // onSubmit={handleSubmit}
            className="row"
          >
            <div className="form-group col-6 mb-0  url-app-form">
              <label>Name</label>
              <input
                name="name"
                id="name"
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="form-control "
                placeholder="App Name"
                value={name}
                required
              />
              <label className="mt-3"> Slide Duration (in seconds)</label>
              <input
                id="duration"
                name="duration"
                onChange={(e) => setDuration(e.target.value)}
                type="number"
                value={duration}
                className="  form-control "
                placeholder="10"
                required
              />
              <label className="mt-3">Color Scheme </label>
              <Select
                value={color}
                onChange={setColor}
                options={colorSchemeOptions}
                className="app-option"
              />
              <label className="mt-3">Font </label>
              <Select
                value={selectedFontOption}
                onChange={setSelectedFontOption}
                options={fontOptions}
                className="app-option"
              />
              <Button onClick={handlePreview} className="mt-3">
                Preview
              </Button>
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
              </div> */}
              <div className="d-flex justify-content-center align-items-center h-100 quote-app-form-icon">
                {preview && quotePreviewData ? quotePreviewData : ""}
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

export default QuoteModel;
