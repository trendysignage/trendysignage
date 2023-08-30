import { Button, Modal, Row, Col, Badge } from "react-bootstrap";
import cancelIcon from "../../img/cancel-icon.png";
import icon from "../../img/link-alt 1.svg";
import { usePlacesWidget } from "react-google-autocomplete";
import { Link } from "react-router-dom";
import Select from "react-select";
import { useState, useEffect } from "react";
import { updateApps, addApps } from "../../utils/api";
import Form from "react-bootstrap/Form";
import Autocomplete from "react-google-autocomplete";
const WeatherAppModal = ({ setShowUrlApp, show, mediaData, actionType }) => {
  const options = [{ value: "Classic", label: "Classic" }];
  const options1 = [{ value: "Celsius", label: "Celsius" }];
  const [showRedirectApp, setShowUrlRedirectApp] = useState(false);
  const [name, setName] = useState("");
  const [location, setLocation] = useState({
    address: "",
    latitude: "",
    longitude: "",
  });
  const [selectedTheme, setSelectedTheme] = useState({
    value: "Classic",
    label: "Classic",
  });
  const [selectedTemp, setSelectedTemp] = useState({
    value: "Celsius",
    label: "Celsius",
  });
  const [isForcast, setIsForcast] = useState(false);
  const [isCorner, setIsCorner] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);
  const [err, setErr] = useState(false);
  const [errMessage, setErrorMessage] = useState("");
  const [mediaId, setMediaId] = useState(null);

  useEffect(() => {
    if (mediaData) {
      const jsonString = JSON.parse(mediaData.appData);
      console.log(jsonString);
      setName(mediaData.title);
      setSelectedTheme({ value: jsonString.theme, label: jsonString.theme });
      setSelectedTemp({ value: jsonString.temp, label: jsonString.temp });
      setMediaId(mediaData._id);
      setLocation(jsonString.location);
      setIsForcast(jsonString.isForcast);
      setIsAnimated(jsonString.isAnimated);
      setIsCorner(jsonString.isCorner);
    }
  }, [mediaData]);

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

  const handleCreateApp = async (e) => {
    e.preventDefault();

    setErr(false);
    setErrorMessage("");
    if (name == "") {
      setErr(true);
      setErrorMessage("App Name is required");
      return;
    } else if (
      location.address == "" ||
      location.latitude == "" ||
      location.longitude == ""
    ) {
      setErr(true);
      setErrorMessage("Location is required");
      return;
    }
    console.log("Hello", err);
    const dataString = {
      theme: selectedTheme.value,
      temp: selectedTemp.value,
      url: name,
      isForcast,
      isAnimated,
      isCorner,
      location,
    };

    if (actionType && actionType == "edit") {
      await updateApps({
        name,
        appId: mediaId,
        data: JSON.stringify(dataString),
      });
      setShowUrlApp(false);
    } else {
      await addApps({
        name,
        type: "weather-apps",
        data: JSON.stringify(dataString),
      });
      setShowUrlApp(false);
      setShowUrlRedirectApp(true);
    }
  };

  const handleCloseRedirectApp = (e) => {
    e.preventDefault();
    setShowUrlRedirectApp(false);
    window.location.reload();
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
            Weather App
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
                name="name"
                id="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                required
              />
              <label className="mt-3">Location</label>
              <Autocomplete
                className="form-control"
                apiKey={"AIzaSyA_JO9H6JEScutFurdvFw1t-v31GIf2Q2o"}
                onPlaceSelected={(place) => {
                  console.log(place);
                  handleLocation(place);
                }}
                options={{
                  types: ["(regions)"],
                  componentRestrictions: { country: "in" },
                }}
                defaultValue={location?.address}
              />
              ;<label className="mt-3">Theme</label>
              <Select
                value={selectedTheme}
                onChange={setSelectedTheme}
                options={options}
                className="app-option"
              />
              <label className="mt-3">Temperature Unit</label>
              <Select
                defaultValue={selectedTemp}
                onChange={setSelectedTemp}
                options={options1}
                className="app-option"
              />
              <div className="col-6">
                <label className="mt-3 mr-3">Forcast</label>
                <input
                  type="checkbox"
                  className="   "
                  required
                  checked={isForcast}
                  onChange={(e) => setIsForcast(e.target.checked)}
                />
              </div>
              <div className="col-6">
                <label className="mt-3 mr-3">Animation</label>
                <input
                  type="checkbox"
                  className="   "
                  required
                  checked={isAnimated}
                  onChange={(e) => setIsAnimated(e.target.checked)}
                />
              </div>
              <div className="col-6">
                <label className="mt-3 mr-3">Corner</label>
                <input
                  type="checkbox"
                  className="   "
                  required
                  checked={isCorner}
                  onChange={(e) => setIsCorner(e.target.checked)}
                />
              </div>
            </div>
            <div className="col-6 ">
              <div className="d-flex ">
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
                    name="viewImage"
                    value="aspectRation"
                    id="aspectRation"
                    // onChange={handleOptionChange}
                    // defaultChecked={viewImage === "aspectRation"}
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
                    className="form-check-input"
                    type="radio"
                    name="viewImage"
                    value="aspectRation"
                    id="aspectRation"
                    // onChange={handleOptionChange}
                    // defaultChecked={viewImage === "aspectRation"}
                  />
                  <label
                    className="form-check-label mt-0"
                    htmlFor="aspectRation"
                  >
                    Footer
                  </label>
                </div>
              </div>
              <div className="d-flex justify-content-center align-items-center h-100 weather-app-form-icon">
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
                  <p>Weather App created successfully</p>
                  <p>
                    Weather App is saved in <u>Media</u>
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

export default WeatherAppModal;
