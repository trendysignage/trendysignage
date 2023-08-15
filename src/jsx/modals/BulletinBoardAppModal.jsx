import { Button, Modal, Row, Col, Badge } from "react-bootstrap";
import cancelIcon from "../../img/cancel-icon.png";
import icon from "../../img/link-alt 1.svg";

import { Link } from "react-router-dom";
import Select from "react-select";
import { useState, useEffect } from "react";
import { updateApps, addApps } from "../../utils/api";
import Switch from "react-switch";
const BulletinBoardAppModal = ({ setShowUrlApp, show, actionType, mediaData }) => {
  const [showRedirectApp, setShowUrlRedirectApp] = useState(false)
  const [name, setName] = useState(null);
  const [isBulletin, setIsBulletin] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [selectedContent, setSelectedContent] = useState(null);
  const [bulletinType, setBulletinType] = useState(null)
  const [duration, setDuration] = useState(10);
  const [bulletinFormat, setBulletinFormat] = useState('single');
  const [mediaId, setMediaId] = useState(null);
  const [err, setErr] = useState(false);
  const [errMessage, setErrorMessage] = useState('');
  const [colorScheme, setColorScheme] = useState({value: "Light Yellow", label: "Light Yellow"});
  const options = [
    { value: "Light Yellow", label: "Light Yellow" },
    { value: "Orange", label: "Orange" },
    { value: "Sky  Blue", label: "Sky  Blue" },
  ];
  const [checked, setChecked] = useState(false);
  const [bulletin, setBulletin] = useState([]);

  const handleChange = (nextChecked) => {
    setChecked(nextChecked);
  };

  const handleBulletin = (e) => {
    e.preventDefault();
    const data = bulletin;
    if(bulletinType){
      data[bulletinType].title = selectedTitle;
      data[bulletinType].content = selectedContent
    }else{
      const newData = {
        title:selectedTitle,
        content:selectedContent
      }
      data.push(newData);
    }
    setBulletin(data);
    setIsBulletin(false);
    setSelectedContent(null);
    setSelectedTitle(null);
    setBulletinType(null)
  }

  const handleDelete = (e, data) => {
    e.preventDefault();
    const newData = bulletin.filter((item, index) => {
      return data != index
    })
    console.log("filter", newData, data, bulletin)
    setBulletin(newData);
    setIsBulletin(false);
    setSelectedContent(null);
    setSelectedTitle(null);
    setBulletinType(null)

  }
  const handleEdit = (e, data, key) => {
    e.preventDefault();
    setIsBulletin(true);
    setSelectedContent(data.content);
    setSelectedTitle(data.title);
    setBulletinType(key)
  }

  useEffect(() => {
    if(mediaData){
      const jsonString = JSON.parse(mediaData.appData);
      setName(mediaData.title);
      setColorScheme(jsonString.colorScheme);
      setDuration(jsonString.duration);
      setBulletinFormat(jsonString.bulletinFormat);
      setBulletin(jsonString.bulletin);
      setMediaId(mediaData._id);
    }
  },[mediaData])
  console.log("media", mediaData)

  const handleCreateApp = async(e) => {
    e.preventDefault();

    setErr(false);
    setErrorMessage("");
    if(name == ''){
      setErr(true);
      setErrorMessage("App Name is required");
    }
    if(err){
      return false;
    }
    const dataString = {
      url:name,bulletinFormat, bulletin, duration,colorScheme
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
        type:'bulletin-apps',
        data:JSON.stringify(dataString)
      });
      setShowUrlApp(false)
      setShowUrlRedirectApp(true)
    }
    //console.log(name, urlLink, selectedOption)
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
          Bulletin Board App
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
            {!isBulletin && <div  className="col-12">
              <label>Name</label>
              <input
                type="text"
                className="  form-control "
                placeholder="App Name"
                required
                onChange={(e) => {setName(e.target.value)}}
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

              <div className="row mt-3">
                <div className="col-6">
                  <div>
                    <label className="">Format</label>
                  </div>

                  <label className=" mr-3">Single</label>
                  <input type="radio" name="bulletinFormat" value="single" checked={bulletinFormat == 'single'} onChange={(e) => setBulletinFormat("single")} className="   " required />
                  <label className=" mx-3">Multi</label>
                  <input type="radio" name="bulletinFormat" value="multi" checked={bulletinFormat == 'multi'} onChange={(e) => setBulletinFormat("multi")}  className="   " required />
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
              {
                bulletin && bulletin.length == 0 && <>
                  <label className="mt-3 pb-3">Bulletin Board Content</label>
                  <div>
                    <span className="add-content-bulletinboard" onClick={(e) => setIsBulletin(true)}> + Add Content</span>
                  </div>
                </>
              }
              
              <div className="col-12">
                {
                  bulletin && bulletin.length > 0 && <table style={{width:"100% !important"}}>
                    <thead>
                      <tr>
                        {checked ? <th>Image</th> : ""}
                        <th>Content</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bulletin.map((item, index) =>{
                        return <tr key={index}>
                          {checked ? <td>Image</td> : ""}
                          <td>
                            <strong>{item.title}</strong>
                            <span>{item.content}</span>
                          </td>
                          <td><button className="" onClick={(e) => setIsBulletin(true)}> + Add</button><button className="" onClick={(e) => handleDelete(e, index)}> - Del</button><button className="" onClick={(e) => handleEdit(e, item, index)}> Edit</button></td>
                        </tr>
                      })}
                    </tbody>
                  </table>
                }
              </div>
            </div>
          }
          {
            isBulletin && <div  className="col-12 mt-3">
              <div className="row">
                <div className="col-12 mt-3">
                  <label>Title</label>
                  <input
                    type="text"
                    className="  form-control "
                    placeholder="Buletin Title"
                    required
                    onChange={(e) => {setSelectedTitle(e.target.value)}}
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
                    onChange={(e) => {setSelectedContent(e.target.value)}}
                    rows={4}
                  />
                </div>
                <div className="col-6">
                  <Button className="btn btn-sm" variant="outline-light">
                    Cancel
                  </Button>
                </div>
                <div className="col-6">
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
          }
            
            
          </div>
          <div className="col-6 ">
            <div className="d-flex justify-content-center align-items-center h-100 Bulletin-board-app-form-icon">
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
              <p>URL App created successfully</p>
              <p>URL App is saved in <u>Media</u></p>
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

export default BulletinBoardAppModal;
