import React, {useState, useEffect} from 'react';
import { Button, Modal, Row, Col, Badge, Dropdown, Table } from "react-bootstrap";
import cancelIcon from "../../img/cancel-icon.png";
import {getAllComposition, publishMedia } from "../../utils/api";
import TableLoader from "../components/TableLoader";
import {
  getDatetimeIn12Hours,
  humanReadableFormattedDateString,
} from "../../utils/UtilsService";
import { toast } from "react-toastify";


const QuickPlayModal = ({ showQuickPlayModal, setQuickPlayModal,showPublishPopUp, setShowPublishPopUp, type, selected }) => {
  const [compositionList, setAllComposition] = useState("");
  const [name, setName] = useState("")
  const [checkedItems, setCheckedItems] = useState({});
  const [checkedValues, setCheckedValues] = useState(null);
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getAllCompositionList();
  }, []);

  const getAllCompositionList = async () => {
    setLoading(true);
    const list = await getAllComposition();
    setLoading(false);
    setAllComposition(list);
  };

  const handleCheckboxChange = (event) => {
    console.log(event.target)
    setCheckedValues(event.target.name);
  };

  // const handleSelectAllChange = (event) => {
  //   const newCheckedItems = {};
  //   compositionList.forEach((item) => {
  //     newCheckedItems[item._id] = event.target.checked;
  //   });
  //   const selectedScreens = [];
  //   for (const key in newCheckedItems) {
  //     if (newCheckedItems[key] === true) {
  //       selectedScreens.push(key);
  //     }
  //   }
  //   setCheckedValues(selectedScreens);
  //   setCheckedItems(newCheckedItems);
  // };

  const handleSubmit = async () => {
    console.log("sdsdsd");
    const screens = [];
    screens[0] = selected._id;
    await publishMedia({
      id: checkedValues,
      screenIds: screens,
      duration: 600,
      type: type,
    });
    setQuickPlayModal(false);
    toast.success("Quickplay has been assigned...", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setCheckedItems({});
    setCheckedValues(null)
  };

  return (
    <Modal
        className={`fade bd-example-modal-lg mt-4 custom-modal ${
          published ? "custom-modal-medium" : "custom-modal-large"
        }`}
        show={showQuickPlayModal}
        size="md"
      >
        <Modal.Header>
          <Modal.Title>{type==="media" ? "Publish Media" :(type == 'composition' ? 'Assign Quickplay' : "Assign Quickplay")}</Modal.Title>
          <Button
            variant=""
            className="close"
            onClick={() => setQuickPlayModal(false)}
          >
            <img className="cancel-icon" src={cancelIcon} alt="cancel-icon" />
          </Button>
        </Modal.Header>

        <Modal.Body>
            <Table responsive>
              <thead>
                <tr>
                  <th className="width50">
                    <div className="custom-control custom-checkbox checkbox-success check-lg mr-3">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="checkbox1_exam_all"
                        disabled
                      // onChange={handleSelectAllChange}
                        required=""
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="checkbox1_exam_all"
                      ></label>
                    </div>
                  </th>
                  <th>Name</th>
                  <th>Date Added</th>
                  <th>Duration</th>
                  <th>Associated Schedule</th>
                </tr>
              </thead>
              {loading  ? (
            <TableLoader colSpan={5}/>
          ) : (
              <tbody>
                {compositionList !== "" &&
                  compositionList.map((composition) => {
                    return (
                      <tr>
                        <td>
                          <div className="custom-control custom-checkbox checkbox-success check-lg mr-3">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id={composition._id}
                              name={composition._id}
                              checked={checkedValues === composition._id}
                              onChange={handleCheckboxChange}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor={composition._id}
                            ></label>
                          </div>
                        </td>
                        <td>
                          <span className="td-content d-flex name-td-content">
                            <span className="name-content d-flex flex-column flex-grow-1">
                              <strong>{composition.name}</strong>
                              <span>{composition.createdBy}</span>
                            </span>
                          </span>
                        </td>

                        <td>
                          <span className="td-content">
                            <strong>
                              {humanReadableFormattedDateString(
                                composition.createdAt
                              )}
                            </strong>
                            <span>{getDatetimeIn12Hours(composition.createdAt)}</span>
                          </span>
                        </td>
                        <td> {composition.duration} Sec</td>
                        <td>No Schedule</td>
                      </tr>
                    );
                  })}
              </tbody>
              )}
            </Table>
          </Modal.Body>

        <Modal.Footer>
          {!published && (
            <Row className="w-100 m-0">
              <Col lg={6} md={6} sm={6} xs={6} className="pl-0 pr-2">
                <Button className="cancel-btn w-100" variant="outline-light"
                  onClick={(e) => setQuickPlayModal(false)}
                >
                  Cancel
                </Button>
              </Col>
              <Col lg={6} md={6} sm={6} xs={6} className="pl-2 pr-0">
                <Button
                  disabled={checkedValues === null}
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
  );
};

export default QuickPlayModal;
