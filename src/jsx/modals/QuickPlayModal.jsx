import { Button, Modal, Row, Col, Badge, Dropdown } from "react-bootstrap";
import cancelIcon from "../../img/cancel-icon.png";
import tagCloseIcon from "../../img/tag-close-icon.png";
import { Link } from "react-router-dom";
import searchIcon from "../../img/search.png";
import listIcon from "../../img/list-icon.png";
import pic1 from "./../../images/profile/small/pic1.jpg";
import downArrow from "../../img/down-arrow.png";

const QuickPlayModal = ({ showQuickPlayModal, setQuickPlayModal }) => {
  return (
    <Modal
      className="fade bd-example-modal-lg mt-4 custom-modal quick-modal custom-modal-medium"
      show={showQuickPlayModal}
      size="md"
    >
      <Modal.Header>
        <Modal.Title className="mr-auto">
          Choose Composition to assign as Quickplay
        </Modal.Title>
        <Button
          variant=""
          className="close"
          onClick={() => setQuickPlayModal(false)}
        >
          <img className="cancel-icon" src={cancelIcon} alt="cancel-icon" />
        </Button>
      </Modal.Header>
      <Modal.Body>
        <div className="search-textfield quickplay-search d-flex flex-wrap align-items-center">
          <div className="form-group mb-0">
            <input
              type="text"
              className="form-control input-default "
              placeholder="Search..."
            />
            <img className="search-icon" src={searchIcon} alt="search" />
          </div>
          <Button className="ml-2 icon-btn" variant="primary">
            <img className="icon-icon" src={listIcon} alt="list-icon" />
          </Button>
        </div>
        <div className="mb-3 quick-modal-table">
          <div className="w-100 table-responsive">
            <div id="example_wrapper">
              <table id="example" className="display w-100  table custom-table">
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
                  <tr>
                    <td>
                      <span className="d-flex align-items-center">
                        <img
                          className="rounded mr-2"
                          width="35"
                          src={pic1}
                          alt=""
                        />
                        <span className="td-content">
                          <strong>My_image_name</strong>
                          <span>Added by Gauri Batra</span>
                        </span>
                      </span>
                    </td>
                    <td>
                      <span className="d-flex align-items-center">
                        <span className="td-content">
                          <strong>3 Apr,2023</strong>
                          <span>05 :30 PM</span>
                        </span>
                      </span>
                    </td>
                    <td>10 Sec</td>
                    <td>0</td>
                    <td style={{ width: "180px" }}>
                      <span className="tag-container">
                        <span className="my-phone-tag text-truncate ml-1 mr-1 mb-1">
                          My Phone
                        </span>
                      </span>

                      <span className="down-arrow">
                        <img
                          className="down-arrow-img img-fluid"
                          src={downArrow}
                          alt="arrow"
                        />
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="d-flex align-items-center">
                        <img
                          className="rounded mr-2"
                          width="35"
                          src={pic1}
                          alt=""
                        />
                        <span className="td-content">
                          <strong>My_image_name</strong>
                          <span>Added by Gauri Batra</span>
                        </span>
                      </span>
                    </td>
                    <td>
                      <span className="d-flex align-items-center">
                        <span className="td-content">
                          <strong>3 Apr,2023</strong>
                          <span>05 :30 PM</span>
                        </span>
                      </span>
                    </td>
                    <td>10 Sec</td>
                    <td>0</td>
                    <td style={{ width: "180px" }}>
                      <span className="tag-container">
                        <span className="my-phone-tag text-truncate ml-1 mr-1 mb-1">
                          My Phone
                        </span>
                      </span>

                      <span className="down-arrow">
                        <img
                          className="down-arrow-img img-fluid"
                          src={downArrow}
                          alt="arrow"
                        />
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Row className="w-100 m-0">
          <Col lg={6} md={6} sm={6} xs={6} className="pl-0 pr-2">
            <Button
              className="cancel-btn w-100"
              variant="outline-light"
              onClick={() => setQuickPlayModal(false)}
            >
              Cancel
            </Button>
          </Col>
          <Col lg={6} md={6} sm={6} xs={6} className="pl-2 pr-0">
            <Button
              variant=""
              type="button"
              className="btn btn-primary btn-block primary-btn"
              onClick={() => setQuickPlayModal(false)}
            >
              Assign
            </Button>
          </Col>
        </Row>
      </Modal.Footer>
    </Modal>
  );
};

export default QuickPlayModal;
