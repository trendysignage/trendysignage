import { Button, Modal, Row, Col, Badge } from "react-bootstrap";
import cancelIcon from "../../img/cancel-icon.png";
import icon from "../../img/link-alt 1.svg";

import { Link } from "react-router-dom";
import Select from "react-select";
import { useState, useEffect } from "react";
import { updateApps, addApps, getWeather } from "../../utils/api";
import { handleAqiApps } from "../../utils/UtilsService";
import Switch from "react-switch";
import Autocomplete from "react-google-autocomplete";

const AirQualityAppModal = ({ setShowUrlApp, show, actionType, mediaData }) => {
  const options = [
    { value: "us", label: "us" },
    { value: "india", label: "India" },
  ];
  const options1 = [
    { value: "Light Mode", label: "Light Mode" },
    { value: "Dark Mode", label: "Dark Mode" },
  ];

  const [showRedirectApp, setShowUrlRedirectApp] = useState(false);
  const [name, setName] = useState("");
  const [location, setLocation] = useState({
    address: "",
    latitude: "",
    longitude: "",
  });
  const [aqiLocation, setAqiLocation] = useState({ value: "us", label: "us" });
  const [mediaId, setMediaId] = useState(null);
  const [theame, setTheame] = useState({
    value: "Light Mode",
    label: "Light Mode",
  });
  const [err, setErr] = useState(false);
  const [errMessage, setErrorMessage] = useState("");
  const [preview, setPreview] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [orientationMode, setOrientation] = useState("landscape");
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [aqiData, setAQIData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (mediaData) {
      const jsonString = JSON.parse(mediaData.appData);
      setName(mediaData.title);
      setLocation(jsonString.location);
      setTheame(jsonString.theame);
      setAqiLocation(jsonString.aqiLocation);
      setMediaId(mediaData._id);
      setOrientation(
        jsonString.orientationMode ? jsonString.orientationMode : "landscape"
      );
    }
  }, [mediaData, orientationMode]);
  console.log("media", mediaData);

  const handleCloseRedirectApp = (e) => {
    e.preventDefault();
    setShowUrlRedirectApp(false);
    window.location.reload();
  };

  const handleCreateApp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErr(false);
    setErrorMessage("");
    if (name == "") {
      setErr(true);
      setErrorMessage("App Name is required");
      setIsLoading(false);
      return;
    } else if (
      location.address == "" ||
      location.latitude == "" ||
      location.longitude == ""
    ) {
      setErr(true);
      setErrorMessage("Location is required");
      setIsLoading(false);
      return;
    }
    const dataString = {
      url: name.trim(),
      location,
      aqiLocation,
      theame,
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
        type: "aqi-apps",
        data: JSON.stringify(dataString),
      });
      handleClose(false);
      setIsLoading(false);
      setShowUrlRedirectApp(true);
    }
    //console.log(name, urlLink, selectedOption)
  };

  const handleLocation = (place) => {
    let location = JSON.parse(JSON.stringify(place?.geometry?.location));
    console.log("location", location);
    const adres = {
      address: place.formatted_address,
      latitude: location.lat,
      longitude: location.lng,
    };
    setLocation(adres);
    //setAdd(adres);
  };
  const getWeatherDetail = async (lat, long) => {
    const locationData = await getWeather(lat, long);
    setWeatherInfo(locationData);
  };

  const getAQIDataZone1 = (prp) => {
    console.log("location", location.latitude);
    if (location.latitude && location.longitude) {
      getWeatherDetail(location.latitude, location.longitude);
      return handleAqiApps(JSON.stringify(prp), weatherInfo);
    }
  };

  const handlePreview = () => {
    console.log(preview, location);
    if (location && location.address) {
      setAQIData(
        getAQIDataZone1(
          JSON.stringify({
            url: name,
            location,
            aqiLocation,
            theame,
            orientationMode,
          })
        )
      );
      setIsRefresh(true);
      setPreview(true);
    } else {
      setPreview(false);
    }
  };

  const handleClose = (val) => {
    setName("");
    setLocation({
      address: "",
      latitude: "",
      longitude: "",
    });
    setAqiLocation({ value: "us", label: "us" });
    setMediaId(null);
    setTheame({
      value: "Light Mode",
      label: "Light Mode",
    });
    setErr(false);
    setErrorMessage("");
    setOrientation("landscape");
    setWeatherInfo(null);
    setAQIData(null);
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
            Air Quality App
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
                type="text"
                className="  form-control "
                placeholder="App Name"
                required
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label className="mt-3">Location</label>
              {/* <input
              type="text"
              className="  form-control "
              placeholder="Location"
              required
              name="urlLink"
              id="urlLink"
              value={urlLink}
              onChange={(e) => setUrlLink(e.target.value)}
            /> */}
              <Autocomplete
                className="form-control"
                apiKey={"AIzaSyA_JO9H6JEScutFurdvFw1t-v31GIf2Q2o"}
                onPlaceSelected={(place) => {
                  console.log(place);
                  handleLocation(place);
                }}
                options={{
                  types: ["(regions)"],
                  componentRestrictions: { country: "sau" },
                }}
                defaultValue={location?.address}
              />
              <label className="mt-3">AQI-IN/US</label>
              <Select
                value={aqiLocation}
                onChange={setAqiLocation}
                placeholder="us"
                options={options}
                className="app-option"
              />
              <label className="mt-3">Theme</label>
              <Select
                value={theame}
                onChange={setTheame}
                placeholder="Light Mode"
                options={options1}
                className="app-option"
              />
              <Button onClick={handlePreview}>Preview</Button>
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
              <div className="d-flex justify-content-center align-items-center h-100 air-quality-app-form-icon">
                {aqiData}
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
            onClick={(e) => handleCloseRedirectApp(e)}
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
                  <p>AQI App created successfully</p>
                  <p>
                    AQI App is saved in <u>Media</u>
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

export default AirQualityAppModal;
