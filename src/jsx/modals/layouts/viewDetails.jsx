import { Button, Modal, Row, Col, Table } from "react-bootstrap";
import cancelIcon from "../../../img/cancel-icon.png";

import Rectangle from "../../../img/Rectangle.png";

import "../../components/Table.css";
import layoutSelected from "../../../img/layout-select-img.png";
// import tagCloseIcon from "../../img/tag-close-icon.png";
import { BASE_URL } from "../../../utils/api";
import { Link } from "react-router-dom";
const ViewDetails = ({ setViewDetailsModal, composition }) => {

  return (
    <>
      <Modal
        className={`fade bd-example-modal-lg mt-4 custom-modal custom-modal-medium`}
        show={true}
        size="md"
      >
        <Modal.Header>
          <Modal.Title>Composition Details</Modal.Title>
          <Button
            variant=""
            className="close"
            onClick={() => setViewDetailsModal(false)}
          >
            <img className="cancel-icon" src={cancelIcon} alt="cancel-icon" />
          </Button>
        </Modal.Header>

        <Modal.Body>
          <div>
            <div className=" d-flex align-items-center justify-content-center flex-column mx-auto">
              <img className="" src={Rectangle} alt="upload-img" />
            </div>
            <div className="d-flex align-items-center justify-content-center flex-column mx-auto">
              Duration : {composition.duration} sec
            </div>
            <div className="d-flex align-items-center justify-content-center flex-column mx-auto">
              {composition.layout.zones.map((zone) => {
                return (
                  <span variant="" type="button" className=" zoneName">
                    {zone.name}
                  </span>
                );
              })}
            </div>
            <hr className="new1" />
            <Table responsive className="custom-table mt-3">
              <tbody>
              {composition.zones[0].content.map((content, index) => {
                return (
                    <tr>
                    <td>{index + 1}.</td>
                    <td>
                    <span className="td-content d-flex name-td-content">
                      <span className={`name-img mr-2  ${content.type === "video" && "videotableName"}`}>
                      {content.type === "image" && <img
                          className="media-img img-fluid"
                          src={`${BASE_URL}${content.url}`}
                          alt="media-img"
                        />}
                         {content.type === "video" && content.duration.toFixed(0)/60}
                      </span>
                      <span className="name-content d-flex flex-column flex-grow-1">
                        <strong>{content.url.split("/")[content.url.split("/").length -1]}</strong>
                        {/* <span>{content.createdBy}</span> */}
                      </span>
                    </span>
                  </td>

                  <td>
                    <span className="my-phone-tag  ml-1">{(content.duration).toFixed(0)} Sec</span>
                  </td>
                </tr>
                )
              })}

              </tbody>
            </Table>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Row className="w-100 m-0">
            <Col lg={6} md={6} sm={6} xs={6} className="pl-0 pr-2">
              <Button
                className="cancel-btn w-100"
                variant="outline-light"
                onClick={() => {
                  setViewDetailsModal(false);
                }}
              >
                Cancel
              </Button>
            </Col>
            <Col lg={6} md={6} sm={6} xs={6} className="pl-2 pr-0">
            <Link to={`/composition/edit?id=${composition._id}`}>
            <Button
                variant=""
                type="button"
                className="btn btn-primary btn-block primary-btn"
              >
                Edit Details
              </Button>
            </Link>
              
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ViewDetails;
