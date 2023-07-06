import { Button, Modal, Row, Col, Badge } from "react-bootstrap";
import cancelIcon from "../../img/cancel-icon.png";
import icon from "../../img/link-alt 1.svg";
import { Table } from "react-bootstrap";
import downArrow from "../../img/down-arrow.png";

import { Link } from "react-router-dom";
import Select from "react-select";
import { useState } from "react";
import { assignDefaultComposition, BASE_URL } from "../../utils/api";
import {
  getDatetimeIn12Hours,
  humanReadableFormattedDateString,
} from "../../utils/UtilsService";
import AddNewTagModal from "./AddNewTagModal";
const DefaultCompositionModal = ({
  close,
  show,
  compositionList,
  getVendorProfile,
}) => {
  const [showNewTagModal, setNewTagModal] = useState(false);
  const [selected, setSelected] = useState("");
  const [compositionId, setCompositionId] = useState("");
  const [duration, setDuration] = useState("");

  const handleSubmit = async () => {
    console.log(compositionId, duration, "iiiiiii");
    await assignDefaultComposition({
      compositionId: compositionId,

      duration: duration,
    }).then((res) => {
      console.log(res, "assignDefaultComposition");
      if (res.data.statusCode === 200) {
        getVendorProfile();
        close();
      }
    });

    // setShowPublishPopUp(false);
  };
  return (
    <>
      <Modal
        className="fade bd-example-modal-lg mt-4 app-modal"
        show={show}
        size="xl"
      >
        <Modal.Header className="border-0 d-flex justify-content-between align-items-center">
          <div>
            <Button variant="" className="" onClick={() => close(false)}>
              <img
                className="cancel-icon"
                src={cancelIcon}
                alt="cancel-icon"
                height="25px"
                width="25px"
              />
            </Button>
          </div>

          <Button
            variant=""
            type="button"
            className="btn btn-primary btn-block primary-btn"
            style={{ width: "fit-content" }}
            //   onClick={() => setNewTagModal(false)}
            disabled={compositionId.length === 0}
            onClick={handleSubmit}
          >
            Assign
          </Button>
        </Modal.Header>
        <Modal.Body>
          <Table
            responsive
            className="custom-table screen-table"
            style={{ marginBottom: "36px" }}
          >
            <thead>
              <tr>
                <th>Composition</th>
                <th>Date Added</th>
                <th>Duration</th>
                <th>Associated Schedule</th>
                <th>Tags</th>
              </tr>
            </thead>

            <tbody>
              {compositionList &&
                compositionList.map((composition) => {
                  const content = composition.zones[0].content[0];
                  return (
                    <tr
                      key={composition._id}
                      id={composition._id}
                      onClick={() => {
                        setCompositionId(composition._id);
                        setDuration(composition.duration);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <td>
                        <span className="td-content d-flex name-td-content">
                          <span
                            className={`name-img mr-2  ${
                              content.type === "video" && "videotableName"
                            }`}
                          >
                            {content.type === "image" && (
                              <img
                                className="media-img img-fluid"
                                src={`${BASE_URL}${content.url}`}
                                alt="media-img"
                              />
                            )}
                            {content.type === "video" &&
                              content.duration.toFixed(0) / 60}
                          </span>
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
                          <span>
                            {getDatetimeIn12Hours(composition.createdAt)}
                          </span>
                        </span>
                      </td>
                      <td> {composition.duration} Sec</td>
                      <td>No Schedule</td>
                      <td style={{ width: "180px" }}>
                        <span className="tag-container">
                          {composition.tags &&
                            composition.tags.map((tag) => {
                              return (
                                <span className="my-phone-tag text-truncate ml-1 mr-1 mb-1">
                                  {tag}
                                </span>
                              );
                            })}
                        </span>

                        <span
                          className="down-arrow"
                          onClick={() => {
                            setSelected(composition);
                            setNewTagModal(true);
                          }}
                        >
                          <img
                            className="down-arrow-img img-fluid"
                            src={downArrow}
                            alt="arrow"
                          />
                        </span>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
      {showNewTagModal && (
        <AddNewTagModal
          setNewTagModal={setNewTagModal}
          allScreens={compositionList}
          selected={selected}
        />
      )}
    </>
  );
};

export default DefaultCompositionModal;
