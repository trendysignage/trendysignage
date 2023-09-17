import { Button, Modal, Row, Col, Badge } from "react-bootstrap";
import cancelIcon from "../../img/cancel-icon.png";
import icon from "../../img/link-alt 1.svg";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { updateApps, addApps } from "../../utils/api";
import {handleGoogleApps} from '../../utils/UtilsService';
import useDrivePicker from 'react-google-drive-picker'
//import GooglePicker from 'react-google-picker';
import moment from 'moment'

const GoogleSlideAppModal = ({ setShowUrlApp, show, actionType, mediaData }) => {
  const tokenDetailsString = localStorage.getItem('googleAuth');
  const [authToken, setAuthToken] = useState(null)
  const [name, setName] = useState("");
  const [openPicker, data,authResponse] = useDrivePicker(); 
  const [fileData, setFileData] = useState(null);
  const [fileURL, setFileURL] = useState(null);
  const [showRedirectApp, setShowUrlRedirectApp] = useState(false);
  const [mediaId, setMediaId] = useState(null);
  const [err, setErr] = useState(false);
  const [errMessage, setErrorMessage] = useState("");
  const [preview, setPreview] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [orientationMode, setOrientation] = useState("landscape");
  const [isLoading, setIsLoading] = useState(false);
  const handleOpenPicker = () => {
    openPicker({
      clientId: "374562955931-mhli1rlb1kuhip30lhe58u0nht8bd2lg.apps.googleusercontent.com",
      developerKey: "AIzaSyCMJk6QpvPCdibrNzpOQlFrqpDgf4-GHjw",
      //viewId: "SPREADSHEETS",
      viewId: "DOCS",
      token:authToken,
      customScopes:['https://www.googleapis.com/auth/drive.readonly'],
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
      // customViews: customViewsArray, // custom view
      callbackFunction: (data) => {

        if (data.action === 'cancel') {
          console.log('User clicked cancel/close button')
        }
        console.log("data",data)
        if (data.action === 'picked') {
          setFileData(data.docs);
          setFileURL(data.docs[0].embedUrl);
        }
      },
    })
  }

  useEffect(() => {
    console.log("tokenDetailsString",tokenDetailsString);
    if(tokenDetailsString){
      const tokenDetails = JSON.parse(tokenDetailsString);
      let expireDate = tokenDetails.expirationTime;
      let todaysDate = moment().format();
      console.log("todays",expireDate,todaysDate);
      if (todaysDate > expireDate) {
        console.log("Hello1");
          setAuthToken(null)
      }else{
        console.log("Hello2");
        setAuthToken(tokenDetails.access_token);
      }
      
    }
    console.log("data",data);
    if(data && data.access_token){
      console.log("Loging in");
      data.expirationTime = moment().add(3599,'seconds').format();
      localStorage.setItem('googleAuth', JSON.stringify(data));
    }
    if (mediaData) {
      console.log("media", mediaData, actionType);
      const jsonString = JSON.parse(mediaData.appData);
      setName(mediaData.title);
      setMediaId(mediaData._id);
      setFileData(jsonString.fileData);
      setFileURL(jsonString.fileURL);
      setOrientation(
        jsonString.orientationMode ? jsonString.orientationMode : "landscape"
      );
    }
  }, [mediaData,tokenDetailsString]);

  const handleCreateApp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErr(false);
    setErrorMessage("");
    if (name.trim() == "") {
      setErr(true);
      setErrorMessage("App Name is required");
      setIsLoading(false);
      return
    }

    if(!fileURL){
      setErr(true);
      setErrorMessage("File URL is required");
      setIsLoading(false);
      return
    }
      console.log("Hello", err);
      const dataString = {
        url: name.trim(),
        fileURL,
        fileData,
        orientationMode,
      };

      if (actionType && actionType == "edit") {
        await updateApps({
          name:name.trim(),
          appId: mediaId,
          data: JSON.stringify(dataString),
        });
        setShowUrlApp(false);
        setIsLoading(false);
      } else {
        await addApps({
          name:name.trim(),
          type: "google-apps",
          data: JSON.stringify(dataString),
        });
        handleClose(false);
        setIsLoading(false);
        setShowUrlRedirectApp(true);
      }
  };

  const handleClose = (val) => {
    setAuthToken(null)
    setName("");
    setFileData(null);
    setFileURL(null);
    setErrorMessage("");
    setOrientation("landscape");
    setShowUrlApp(val)
  }

  useEffect(() => {
    
  },[data, fileURL, tokenDetailsString])

  return (
    <>
      <Modal
        className="fade bd-example-modal-lg mt-4 app-modal custModal"
        show={show}
        size="xl"
        centered
      >
        <Modal.Header className="border-0">
          <Modal.Title className="mr-auto app-modal-heading">
            Google Slide
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
          {
            err && errMessage ? <h6 className="alert alert-danger">{errMessage}</h6> : ""
          }
          <form
            // onSubmit={handleSubmit}
            className="row"
          >
            <div className="form-group col-6 mb-0  url-app-form google-slide-form">
              <label>Name</label>
              <input
                type="text"
                name="name"
                id="name"
                onChange={(e) => {setName(e.target.value)}}
                className="  form-control "
                placeholder="App Name"
                required
                value={name}
              />

              <p className="mb-0 model-info-h text-black mt-3">
                This app let’s you publish Google workspace files on screens.
              </p>
              <p>Use either of the options mentioned below.</p>

              <div className=" my-3">
                <p className="model-info-h">Option 1</p>
                <ul>
                  <li>Open the Google file you wish to publish.</li>
                  <li>
                    Change the access from ‘Restricted’ to ‘Public’. Here’s how
                  </li>
                  <li>
                    Paste the link below and click on “Create App” button.{" "}
                  </li>
                </ul>
              </div>
              <input
                type="text"
                name="fileURL"
                id="fileURL"
                onChange={(e) => {setFileURL(e.target.value)}}
                value={fileURL}
                className="  form-control "
                placeholder="Paste embed link here"
                required
              />
              <div className=" my-3">
                <p className="model-info-h">Option 2</p>
                <ul>
                  <li>Open the Google file you wish to publish.</li>
                  <li>
                    Change the access from ‘Restricted’ to ‘Public’. Here’s how
                  </li>
                  <li>
                    Paste the link below and click on “Create App” button.{" "}
                  </li>
                </ul>
              </div>
              <Button onClick={() => handleOpenPicker()}>{authToken ?"Open Picker" :"Login With Google"}</Button>
              {/* <GooglePicker 
                clientId="374562955931-mhli1rlb1kuhip30lhe58u0nht8bd2lg.apps.googleusercontent.com"
                developerKey="AIzaSyCMJk6QpvPCdibrNzpOQlFrqpDgf4-GHjw"
                //scope={SCOPE}
                onChange={data => console.log('on change:', data)}
                onAuthFailed={data => console.log('on auth failed:', data)}
                multiselect={true}
                navHidden={true}
                authImmediate={false}
                viewId={'FOLDERS'}
                createPicker={ (google, oauthToken) => {
                  const googleViewId = google.picker.ViewId.FOLDERS;
                  const docsView = new google.picker.DocsView(googleViewId)
                      .setIncludeFolders(true)
                      .setMimeTypes('application/vnd.google-apps.folder')
                      .setSelectFolderEnabled(true);

                  const picker = new window.google.picker.PickerBuilder()
                      .addView(docsView)
                      .setOAuthToken(oauthToken)
                      .setDeveloperKey("AIzaSyCMJk6QpvPCdibrNzpOQlFrqpDgf4-GHjw")
                      .setCallback(()=>{
                        console.log('Custom picker is ready!');
                      });

                  picker.build().setVisible(true);
              }}
          >
              <Button>Login With Google</Button>
              <div className="google"></div>
              </GooglePicker> */}
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
              </div>
              <div className="d-flex justify-content-center align-items-center h-100 google-slide-icon">
                {handleGoogleApps(JSON.stringify({
                  fileURL,
                  fileData,
                  name
                }))}
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

export default GoogleSlideAppModal;
