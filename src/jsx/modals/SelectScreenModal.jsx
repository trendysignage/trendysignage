import { Button, Modal, Row, Col, Badge, Table } from "react-bootstrap";
import cancelIcon from "../../img/cancel-icon.png";
import { useEffect, useState } from "react";
import { getAllScreens, assignScreenProfile, pushUpdateSchedule } from "../../utils/api";
import TableLoader from "../components/TableLoader";
import '../components/Table.css';
import { toast } from "react-toastify";

const SelectScreenModal = ({ setShowPublishPopUp, showPublishPopUp, selected, setIsRefresh,selectedScreen, setSelectedScreen, selectedSchdule, setSelectedSchdule}) => {
  const [allScreens, setAllScreens] = useState("");
  const [name, setName] = useState("")
  const [checkedItems, setCheckedItems] = useState({});
  const [checkedValues, setCheckedValues] = useState(selectedScreen);
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(false);
  // use effect
  useEffect(() => {
    if(selectedScreen){
        setCheckedValues(selectedScreen);
        const newCheckedItems = {};
        selectedScreen.forEach((item) => {
            newCheckedItems[item] = true;
        });
        setCheckedItems(newCheckedItems);
    }
    callAllScreenApi();
  }, [selectedScreen]);
  
  useEffect(() => {
    if(selectedSchdule){
        setCheckedValues(selectedSchdule.screens);
        const newCheckedItems = {};
        selectedSchdule.screens.forEach((item) => {
            newCheckedItems[item] = true;
        });
        setCheckedItems(newCheckedItems);
    }
    callAllScreenApi();
  }, [selectedSchdule]);

  const callAllScreenApi = async () => {
    setLoading(true);
    const list = await getAllScreens();
    setLoading(false);
    setAllScreens(list);
  };

  const handleCheckboxChange = (event) => {
    // const newA = checkedValues;
    // checkedValues.filter((i) => {
    //     return i==event.target.name
    // })
    const newCheckedItems = {
      ...checkedItems,
      [event.target.name]: event.target.checked,
    };
    const selectedScreens = [];
    for (const key in newCheckedItems) {
      if (newCheckedItems[key] === true) {
        selectedScreens.push(key);
      }
    }
    setCheckedValues(selectedScreens);
    setCheckedItems(newCheckedItems);
  };

  const handleSelectAllChange = (event) => {
    const newCheckedItems = {};
    allScreens.forEach((item) => {
      newCheckedItems[item._id] = event.target.checked;
    });
    const selectedScreens = [];
    for (const key in newCheckedItems) {
      if (newCheckedItems[key] === true) {
        selectedScreens.push(key);
      }
    }
    setCheckedValues(selectedScreens);
    setCheckedItems(newCheckedItems);
  };

  const handleSubmit = async () => {
    if(selectedSchdule){
        console.log("checkedValues",checkedValues);
        await pushUpdateSchedule({
          scheduleId: selectedSchdule._id,
          name: selectedSchdule.name,
          screens: checkedValues
        }).then((response) => {
          //setError(null);
          toast.success("Screen has been assigned to Schedule successfully !!!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
          setSelectedSchdule(null)
          setIsRefresh(true);
          setShowPublishPopUp(false);
          
      })
      .catch(function (error) {
          //setError(error.response.data.message);
      });
    }else{
      await assignScreenProfile({
          profileId:selected,
          screens: checkedValues,
      })
      .then((response) => {
          //setError(null);
          toast.success("Screen has been assigned to Profile successfully !!!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
          setIsRefresh(true);
          setShowPublishPopUp(false);
      })
      .catch(function (error) {
          //setError(error.response.data.message);
      });
    }

  };
  return (
<>
    
    <Modal
        className={`fade bd-example-modal-lg mt-4 custom-modal ${
            published ? "custom-modal-medium" : "custom-modal-large"
        }`}
        show={showPublishPopUp}
        size="md"
    >
      <Modal.Header>
        <Modal.Title>{"Assign Screen"}</Modal.Title>
        <Button
          variant=""
          className="close"
          onClick={() => setShowPublishPopUp(false)}
        >
          <img className="cancel-icon" src={cancelIcon} alt="cancel-icon" />
        </Button>
      </Modal.Header>

      {published && <Modal.Body><div style={{display:"flex", alignItems:"center", justifyContent:"center"}}><h3>Media Published</h3></div></Modal.Body>}
      {!published && (
        <Modal.Body>
            {/* <div className="mb-3 mr-3">
              <input
                type="text"
                className="form-control"
                id="quickplayname"
                onChange={(e) => {setName(e.target.value)}}
                required="true"
                placeholder="Name..."
              />
            </div> */}
          <Table responsive>
            <thead>
              <tr>
                <th className="width50">
                  <div className="custom-control custom-checkbox checkbox-success check-lg mr-3">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="checkbox1_exam_all"
                      onChange={handleSelectAllChange}
                      required=""
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="checkbox1_exam_all"
                    ></label>
                  </div>
                </th>
                <th>Screen</th>
                <th>Last Seen</th>
                <th>Default Composition</th>
                <th>Current Schedule</th>
              </tr>
            </thead>
            {loading  ? (
          <TableLoader colSpan={5}/>
        ) : (
            <tbody>
              {allScreens !== "" &&
                allScreens.map((screen) => {
                  return (
                    <tr>
                      <td>
                        <div className="custom-control custom-checkbox checkbox-success check-lg mr-3">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id={screen._id}
                            name={screen._id}
                            checked={checkedItems[screen._id]}
                            onChange={handleCheckboxChange}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor={screen._id}
                          ></label>
                        </div>
                      </td>

                      <td>
                        <span className="td-content">
                          <strong>{screen.name}</strong>
                          <span>{screen.screenLocation}</span>
                        </span>
                      </td>
                      <td>
                        <span className="d-flex align-items-center">
                          <span className="status status-green"></span>
                          <span className="td-content">
                            <strong>{screen.name}</strong>
                            <span>{screen.screenLocation}</span>
                          </span>
                        </span>
                      </td>
                      <td>Default Compo. </td>
                      <td>No Schedule</td>
                    </tr>
                  );
                })}
            </tbody>
            )}
          </Table>
        </Modal.Body>
      )}

      <Modal.Footer>
        {!published && (
          <Row className="w-100 m-0">
            <Col lg={6} md={6} sm={6} xs={6} className="pl-0 pr-2">
              <Button className="cancel-btn w-100"
                  onClick={(e) => {setShowPublishPopUp(false)}}
                  variant="outline-light">
                Cancel
              </Button>
            </Col>
            <Col lg={6} md={6} sm={6} xs={6} className="pl-2 pr-0">
              <Button
                disabled={!checkedValues || checkedValues.length == 0}
                variant=""
                type="button"
                className="btn btn-primary btn-block primary-btn"
                onClick={handleSubmit}
              >
                Publish
              </Button>
            </Col>
          </Row>
        )}
      </Modal.Footer>
    </Modal>
      

    </>
  );
};

export default SelectScreenModal;
