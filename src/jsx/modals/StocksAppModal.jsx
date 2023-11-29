import { Button, Modal, Row, Col, Badge } from "react-bootstrap";
import cancelIcon from "../../img/cancel-icon.png";
import icon from "../../img/link-alt 1.svg";

import { Link } from "react-router-dom";
import Select from "react-select";
import { useState, useEffect } from "react";
import { updateApps, addApps, getStock } from "../../utils/api";
import { handleStockApps } from "../../utils/UtilsService";
import Switch from "react-switch";
const StocksAppModal = ({ setShowUrlApp, show, actionType, mediaData }) => {
  const options = [
    { value: "Day Gainers", label: "Day Gainers" },
    { value: "Day Losers", label: "Day Losers" },
    { value: "Most Actives", label: "Most Actives" },
    // { value: "Top Mutual Funds", label: "Top Mutual Funds" },
  ];
  const [showRedirectApp, setShowUrlRedirectApp] = useState(false);
  const [name, setName] = useState("");
  const [isPriceChange, setIsPriceChange] = useState(false);
  const [isHigh, setIsHigh] = useState(false);
  const [isLow, setIsLow] = useState(false);
  const [volume, setVolume] = useState(false);
  const [slideDuration, setSlideDuration] = useState(10);
  const [mediaId, setMediaId] = useState(null);
  const [stock, setStock] = useState(null);
  const [stockType, setStockType] = useState({
    value: "Day Gainers",
    label: "Day Gainers",
  });
  const [err, setErr] = useState(false);
  const [errMessage, setErrorMessage] = useState("");

  const [preview, setPreview] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [orientationMode, setOrientation] = useState("landscape");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (mediaData) {
      const jsonString = JSON.parse(mediaData.appData);
      setName(mediaData.title);
      setIsPriceChange(jsonString.isPriceChange);
      setIsHigh(jsonString.isHigh);
      setIsLow(jsonString.isLow);
      setVolume(jsonString.volume);
      setSlideDuration(jsonString.slideDuration);
      setMediaId(mediaData._id);
      setStockType(jsonString.stockType);
      setOrientation(
        jsonString.orientationMode ? jsonString.orientationMode : "landscape"
      );
    }
  }, [mediaData, isRefresh, orientationMode]);
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
    const dataString = {
      url: name.trim(),
      slideDuration,
      isHigh,
      isLow,
      volume,
      stockType,
      isPriceChange,
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
        type: "stocks-apps",
        data: JSON.stringify(dataString),
      });
      handleClose(false);
      setIsLoading(false);
      setShowUrlRedirectApp(true);
    }
    //console.log(name, urlLink, selectedOption)
  };

  const getStockDetail = async (lat, long) => {
    const locationData = await getStock(lat, long);
    setStock(locationData);
    // console.log('getLocation', locationData);
  };

  const handlePreview = () => {
    console.log(preview, name);
    if (name) {
      setIsRefresh(true);
      setPreview(true);
    } else {
      setPreview(false);
    }
  };

  const getStockDataZone1 = (data) => {
    const prp = JSON.parse(data);
    console.log("location", prp);
    let stockType = "gainers";
    if (prp.stockType === '"Day Losers"') {
      stockType = "losers";
    } else if (prp.stockType === "Most Actives") {
      stockType = "actives";
    }

    if (!stock) {
      console.log("Hello Stock Calling");
      getStockDetail(stockType);
    }
    return handleStockApps(data, stock);
  };

  const handleClose = (val) => {
    setName("");
    setIsPriceChange(false);
    setIsHigh(false);
    setIsLow(false);
    setVolume(false);
    setSlideDuration(10);
    setStock(null);
    setStockType({
      value: "Day Gainers",
      label: "Day Gainers",
    });
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
            Stocks App
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
              <label>Name</label>
              <input
                type="text"
                className="  form-control "
                placeholder="App Name"
                required
                name="name"
                id="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />

              <label className="mt-3">Stocks</label>

              <Select
                value={stockType}
                onChange={setStockType}
                placeholder="Day Gainers"
                options={options}
                className="app-option"
              />
              <div className="row mt-4">
                <div className="col-6 d-flex align-items-center justify-content-between">
                  <label className="mb-0 mr-3">Price Change</label>
                  <Switch
                    onColor="#B3005E"
                    onChange={setIsPriceChange}
                    checked={isPriceChange}
                    className="react-switch"
                    required={true}
                  />
                </div>
                <div className="col-6  d-flex align-items-center justify-content-between">
                  <label className="mb-0 mr-3">52 Week High</label>
                  <Switch
                    onColor="#B3005E"
                    onChange={setIsHigh}
                    checked={isHigh}
                    className="react-switch"
                    required={true}
                  />
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-6 d-flex align-items-center justify-content-between">
                  <label className="mb-0 mr-3">Volumes</label>
                  <Switch
                    onColor="#B3005E"
                    onChange={setVolume}
                    checked={volume}
                    className="react-switch"
                    required={true}
                  />
                </div>
                <div className="col-6  d-flex align-items-center  justify-content-between">
                  <label className="mb-0 mr-3">52 Week Low</label>
                  <Switch
                    onColor="#B3005E"
                    onChange={setIsLow}
                    checked={isLow}
                    className="react-switch"
                    required={true}
                  />
                </div>
              </div>

              <label className="mt-4">Slide Duration</label>
              <input
                type="number"
                className="  form-control "
                placeholder="10"
                required
                name="slide"
                value={slideDuration}
                onChange={(e) => setSlideDuration(e.target.value)}
              />
              <Button className="mt-3" onClick={handlePreview}>
                Preview
              </Button>
            </div>
            <div className="col-6 ">
              {/* <div className="d-flex ">
             
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
              </div> */}
              <div className="d-flex justify-content-center align-items-center h-100 stocks-app-form-icon">
                {/* <div className="text-center">
                  <img src={icon} width="60px" height="60px" className="mb-3" />
                </div> */}
                {preview &&
                  orientationMode == "landscape" &&
                  getStockDataZone1(
                    JSON.stringify({
                      url: name,
                      slideDuration,
                      isHigh,
                      isLow,
                      volume,
                      stockType,
                      isPriceChange,
                    })
                  )}
                {preview &&
                  orientationMode == "potrait" &&
                  getStockDataZone1(
                    JSON.stringify({
                      url: name,
                      slideDuration,
                      isHigh,
                      isLow,
                      volume,
                      stockType,
                      isPriceChange,
                    })
                  )}
                {preview &&
                  orientationMode == "footer" &&
                  getStockDataZone1(
                    JSON.stringify({
                      url: name,
                      slideDuration,
                      isHigh,
                      isLow,
                      volume,
                      stockType,
                      isPriceChange,
                    })
                  )}
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer className="border-0 mb-2">
          <Row className="w-100 m-0">
            <Col lg={6} md={6} sm={6} xs={6} className="pl-0 pr-2">
              <Button
                className="cancel-btn w-100"
                onClick={(e) => {
                  e.preventDefault();
                  handleClose(false);
                }}
                variant="outline-light"
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

export default StocksAppModal;
