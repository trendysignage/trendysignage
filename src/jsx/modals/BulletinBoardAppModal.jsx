import { Button, Modal, Row, Col, Badge } from "react-bootstrap";
import cancelIcon from "../../img/cancel-icon.png";
import icon from "../../img/link-alt 1.svg";

import { Link } from "react-router-dom";
import Select from "react-select";
import { useState, useEffect } from "react";
import { updateApps, addApps, BASE_URL } from "../../utils/api";
import { handleBulletinApps } from "../../utils/UtilsService";
import Switch from "react-switch";
import SelectMedia from "./SelecteMedia";
import deleteicon from "../../img/delete-btn.png";

import editicon from "../../img/edit-btn.png";

const BulletinBoardAppModal = ({
  setShowUrlApp,
  show,
  actionType,
  mediaData,
}) => {
  const [showRedirectApp, setShowUrlRedirectApp] = useState(false);
  const [name, setName] = useState(null);
  const [isBulletin, setIsBulletin] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [selectedContent, setSelectedContent] = useState(null);
  const [bulletinType, setBulletinType] = useState(null);
  const [duration, setDuration] = useState(10);
  const [bulletinFormat, setBulletinFormat] = useState("single");
  const [mediaId, setMediaId] = useState(null);
  const [err, setErr] = useState(false);
  const [errMessage, setErrorMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageModalShow, setImageModalShow] = useState(false);
  const [colorScheme, setColorScheme] = useState({
    value: "lightYellow",
    label: "Light Yellow",
  });
  const options = [
    { value: "lightYellow", label: "Light Yellow" },
    { value: "orange", label: "Orange" },
    { value: "skyBlue", label: "Sky  Blue" },
  ];
  const [fontSize, setFontSize] = useState(20);
  const [checked, setChecked] = useState(false);
  const [bulletin, setBulletin] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  const [orientationMode, setOrientation] = useState("landscape");

  const handleChange = (nextChecked) => {
    setChecked(nextChecked);
  };
  const handleFontSize = (e, size) => {
    e.preventDefault();
    console.log("size", size);
    if (size < 12 || size > 100) {
      return;
    }
    setFontSize(size);
  };
  const handleBulletin = (e) => {
    console.log("dd");
    e.preventDefault();
    const data = bulletin;
    console.log("nu", bulletinType);
    if (bulletinType !== null) {
      console.log("edit");
      data[bulletinType].image = selectedImage;
      data[bulletinType].title = selectedTitle.trim();
      data[bulletinType].content = selectedContent.trim();
    } else {
      console.log("create");
      data.push({
        title: selectedTitle.trim(),
        image: selectedImage,
        content: selectedContent ? selectedContent.trim() : "",
      });
    }
    setBulletin(data);
    setIsBulletin(false);
    setSelectedContent(null);
    setSelectedTitle(null);
    setBulletinType(null);
    setSelectedImage(null);
  };
  const handleDelete = (e, data) => {
    e.preventDefault();
    const newData = bulletin.filter((item, index) => {
      return data != index;
    });
    setBulletin(newData);
    setIsBulletin(false);
    setSelectedContent(null);
    setSelectedTitle(null);
    setSelectedImage(null);
    setBulletinType(null);
  };
  const handleEdit = (e, data, key) => {
    console.log("fdf");
    e.preventDefault();
    setIsBulletin(true);
    setSelectedContent(data.content);
    setSelectedTitle(data.title);
    setBulletinType(key);
    setSelectedImage(data.image);
  };

  const handleBulletinCancel = (e) => {
    e.preventDefault();
    setIsBulletin(false);
    setSelectedContent(null);
    setSelectedTitle(null);
    setBulletinType(null);
    setSelectedImage(null);
  };
  useEffect(() => {
    if (mediaData) {
      const jsonString = JSON.parse(mediaData.appData);
      setName(mediaData.title);
      setColorScheme(jsonString.colorScheme);
      setDuration(jsonString.duration);
      setBulletinFormat(jsonString.bulletinFormat);
      setBulletin(jsonString.bulletin);
      setMediaId(mediaData._id);
      setFontSize(jsonString.fontSize);
      setOrientation(
        jsonString.orientationMode ? jsonString.orientationMode : "landscape"
      );
    }
  }, [mediaData]);
  console.log("media", mediaData);

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
    }
    const dataString = {
      url: name.trim(),
      bulletinFormat,
      bulletin,
      duration,
      colorScheme,
      orientationMode,
      fontSize,
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
        type: "bulletin-apps",
        data: JSON.stringify(dataString),
      });
      handleClose(false);
      setIsLoading(false);
      setShowUrlRedirectApp(true);
    }
    //console.log(name, urlLink, selectedOption)
  };

  const handleClose = (val) => {
    setName(null);
    setIsBulletin(false);
    setSelectedTitle(null);
    setSelectedContent(null);
    setBulletinType(null);
    setDuration(10);
    setBulletinFormat("single");
    setErr(false);
    setErrorMessage("");
    setSelectedImage(null);
    setColorScheme({
      value: "Light Yellow",
      label: "Light Yellow",
    });
    setChecked(false);
    setBulletin([]);
    setShowUrlApp(val);
  };
  const handlePreview = () => {
    if (name) {
      setPreviewData(
        handleBulletinApps(
          JSON.stringify({
            url: name.trim(),
            bulletinFormat,
            bulletin,
            duration,
            colorScheme,
            orientationMode,
            fontSize,
          })
        )
      );
      setPreview(true);
    } else {
      setPreview(false);
    }
  };
  return (
    <>
      <SelectMedia
        imageModalShow={imageModalShow}
        setImageModalShow={setImageModalShow}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
      <Modal
        className="fade bd-example-modal-lg mt-4 app-modal"
        show={show}
        size="xl"
        centered
      >
        <Modal.Header className="border-0">
          <Modal.Title className="mr-auto app-modal-heading">
            Bulletin Board App
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
              {!isBulletin && (
                <div className="col-12">
                  <label>Name</label>
                  <input
                    type="text"
                    className="  form-control "
                    placeholder="App Name"
                    required
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    name="name"
                    id="name"
                    value={name}
                  />
                  <div className="row mt-3">
                    <div className="col-6">
                      <label className="">Color Scheme</label>

                      <Select
                        value={colorScheme}
                        onChange={setColorScheme}
                        options={options}
                        className="app-option"
                      />
                    </div>
                    <div className="col-6">
                      <label>Duration</label>
                      <input
                        type="number"
                        className="  form-control "
                        placeholder="10"
                        required
                        id="duration"
                        name="duration"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mt-3">Font Size</label>
                    <div>
                      <Button
                        onClick={(e) => {
                          handleFontSize(e, fontSize - 1);
                        }}
                        className="btnnew"
                      >
                        -
                      </Button>
                      <span className="marginLR">{fontSize}</span>
                      <Button
                        onClick={(e) => {
                          handleFontSize(e, fontSize + 1);
                        }}
                        className="btnnew"
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-6">
                      <div>
                        <label className="">Format</label>
                      </div>

                      <label className=" mr-3">Single</label>
                      <input
                        type="radio"
                        name="bulletinFormat"
                        value="single"
                        checked={bulletinFormat == "single"}
                        onChange={(e) => setBulletinFormat("single")}
                        className="   "
                        required
                      />
                      <label className=" mx-3">Multi</label>
                      <input
                        type="radio"
                        name="bulletinFormat"
                        value="multi"
                        checked={bulletinFormat == "multi"}
                        onChange={(e) => setBulletinFormat("multi")}
                        className="   "
                        required
                      />
                    </div>
                    <div className="col-6 text-center">
                      <label className="mb-0 ">Want to include images</label>
                      <Switch
                        onColor="#B3005E"
                        onChange={handleChange}
                        checked={checked}
                        className="react-switch mt-1"
                        required={true}
                      />
                    </div>
                  </div>
                  {bulletin && bulletin.length == 0 && (
                    <>
                      <label className="mt-3 pb-3">
                        Bulletin Board Content
                      </label>
                      <div>
                        <span
                          className="add-content-bulletinboard"
                          onClick={(e) => setIsBulletin(true)}
                        >
                          {" "}
                          + Add Content
                        </span>
                      </div>
                    </>
                  )}

                  <div className="col-12 mt-4">
                    {bulletin && bulletin.length > 0 && (
                      <table className="w-100 bg-white bulletin-table">
                        <thead>
                          <tr className="bg-white">
                            {checked ? <th>Image</th> : ""}
                            <th>Title</th>
                            <th>Content</th>

                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {bulletin.map((item, index) => {
                            return (
                              <tr key={index} className="bg-white">
                                {checked ? (
                                  <td>
                                    {item.image ? (
                                      <img
                                        className="media-img img-fluid"
                                        src={`${BASE_URL}${item?.image}`}
                                        alt="media-img"
                                        style={{
                                          height: "50px",
                                          width: "50px",
                                        }}
                                      />
                                    ) : (
                                      "No-image"
                                    )}
                                  </td>
                                ) : (
                                  ""
                                )}
                                <td>
                                  <strong>{item.title}</strong>
                                </td>
                                <td>
                                  <span>{item.content}</span>
                                </td>
                                <td className="bulletin-action">
                                  <button
                                    className="border-0"
                                    style={{ padding: "0 5px" }}
                                    onClick={(e) => setIsBulletin(true)}
                                  >
                                    {" "}
                                    +
                                  </button>

                                  <img
                                    onClick={(e) => handleDelete(e, index)}
                                    src={deleteicon}
                                    alt="icon"
                                    style={{ height: "20px" }}
                                  />

                                  <img
                                    src={editicon}
                                    onClick={(e) => handleEdit(e, item, index)}
                                    alt="edit"
                                    style={{ height: "20px" }}
                                  />
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              )}
              {isBulletin && (
                <div className="col-12 mt-3">
                  <div className="row">
                    <div className="col-12 mt-3">
                      <label>Title</label>
                      <input
                        type="text"
                        className="  form-control "
                        placeholder="Buletin Title"
                        required
                        onChange={(e) => {
                          setSelectedTitle(e.target.value);
                        }}
                        name="selectedTitle"
                        id="selectedTitle"
                        value={selectedTitle}
                      />
                      <label className="mt-3">Content</label>
                      <textarea
                        type="text"
                        className="  form-control "
                        placeholder="Type Content"
                        required
                        name="selectedContent"
                        id="selectedContent"
                        value={selectedContent}
                        onChange={(e) => {
                          setSelectedContent(e.target.value);
                        }}
                        rows={4}
                      />
                    </div>
                    <div className="col-6 mt-2">
                      {checked && (
                        <>
                          {selectedImage && (
                            <img
                              className="media-img img-fluid mb-3"
                              src={`${BASE_URL}${selectedImage}`}
                              alt="media-img"
                            />
                          )}
                        </>
                      )}
                      <div className="d-flex align-items-center">
                        {checked && (
                          <>
                            <Button
                              className="btn btn-sm mr-2"
                              variant="outline-light"
                              onClick={(e) => {
                                setImageModalShow(true);
                              }}
                            >
                              Image
                            </Button>
                          </>
                        )}
                        <Button
                          className="btn btn-sm mr-2"
                          variant="outline-light"
                          onClick={(e) => handleBulletinCancel(e)}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant=""
                          type="button"
                          className="btn btn-sm btn-primary"
                          onClick={(e) => handleBulletin(e)}
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {!isBulletin && (
                <Button onClick={handlePreview} className="mt-3">
                  Preview
                </Button>
              )}
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
              <div className="d-flex justify-content-center align-items-center h-100 Bulletin-board-app-form-icon">
                {preview && previewData ? previewData : "..."}
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

export default BulletinBoardAppModal;
