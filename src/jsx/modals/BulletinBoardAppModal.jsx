import { Button, Modal, Row, Col, Badge } from "react-bootstrap";
import cancelIcon from "../../img/cancel-icon.png";
import icon from "../../img/link-alt 1.svg";

import { Link } from "react-router-dom";
import Select from "react-select";
import { useState } from "react";
import Switch from "react-switch";
const BulletinBoardAppModal = ({ setShowUrlApp, show }) => {
  const [name, setName] = useState(null);
  const [isBulletin, setIsBulletin] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [selectedContent, setSelectedContent] = useState(null);
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
    const newData = {
      title:selectedTitle,
      content:selectedContent
    }
    data.push(newData);
    setBulletin(data);
    console.log("Bulletin",bulletin);
    setIsBulletin(false);
    setSelectedContent(null);
    setSelectedTitle(null);
  }
  return (
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
                    //defaultValue={selectedOption}
                    // onChange={setSelectedOption}
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
                  />
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-6">
                  <div>
                    <label className="">Format</label>
                  </div>

                  <label className=" mr-3">Single</label>
                  <input type="checkbox" className="   " required />
                  <label className=" mx-3">Multi</label>
                  <input type="checkbox" className="   " required />
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
                bulletin.length == 0 && <>
                  <label className="mt-3 pb-3">Bulletin Board Content</label>
                  <div>
                    <span className="add-content-bulletinboard" onClick={(e) => setIsBulletin(true)}> + Add Content</span>
                  </div>
                </>
              }
              
              <div className="col-12">
                {
                  bulletin && bulletin.length > 0 && <table>
                    <thead>
                      <tr>
                        <th>Content</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bulletin.map((item, index) =>{
                        return <tr key={index}>
                          <td>
                            <strong>{item.title}</strong>
                            <p>{item.content}</p>
                          </td>
                          <td><span className="add-content-bulletinboard" onClick={(e) => setIsBulletin(true)}> + Add</span></td>
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
              //   onClick={() => setNewTagModal(false)}
            >
              Create App
            </Button>
          </Col>
        </Row>
      </Modal.Footer>
    </Modal>
  );
};

export default BulletinBoardAppModal;
