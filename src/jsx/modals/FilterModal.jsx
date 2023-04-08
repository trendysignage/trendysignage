import { Button, Modal, Row, Col, Badge } from "react-bootstrap";
import cancelIcon from "../../img/cancel-icon.png";
import tagCloseIcon from "../../img/tag-close-icon.png";
import { Link } from "react-router-dom";

const FilterModal = ({ showFilterModal, setFilterModal }) => {
  return (
    <Modal
      className="fade bd-example-modal-lg mt-4 custom-modal custom-modal-medium"
      show={showFilterModal}
      size="md"
    >
      <Modal.Header>
        <Modal.Title className="mr-auto">Filter</Modal.Title>
        <span className="clear-filter-link">Clear Filter</span>
        <Button
          variant=""
          className="close"
          onClick={() => setFilterModal(false)}
        >
          <img className="cancel-icon" src={cancelIcon} alt="cancel-icon" />
        </Button>
      </Modal.Header>
      <Modal.Body>
        <div className="filter-row mb-3">
          <h6>Show</h6>
          <div className="d-flex flex-wrap">
            <div className="custom-control custom-checkbox common-checkbox mr-3">
              <input
                type="checkbox"
                className="custom-control-input"
                id="Landscape"
                required
              />
              <label className="custom-control-label" htmlFor="Landscape">
                Landscape
              </label>
            </div>
            <div className="custom-control custom-checkbox common-checkbox mr-3">
              <input
                type="checkbox"
                className="custom-control-input"
                id="Landscape1"
                required
              />
              <label className="custom-control-label" htmlFor="Landscape1">
                Landscape
              </label>
            </div>
            <div className="custom-control custom-checkbox common-checkbox mr-3">
              <input
                type="checkbox"
                className="custom-control-input"
                id="Landscape2"
                required
              />
              <label className="custom-control-label" htmlFor="Landscape2">
                Landscape
              </label>
            </div>
          </div>
        </div>
        <div className="filter-row mb-3">
          <h6>Tags</h6>
          <div className="d-flex flex-wrap">
            <Badge className="badge-common-light mr-2" variant="outline-light">
              Test Devices
            </Badge>
            <Badge className="badge-common-light mr-2" variant="outline-light">
              Test Devices
            </Badge>
            <Badge className="badge-common-light mr-2" variant="outline-light">
              Test Devices
            </Badge>
          </div>
        </div>
        <div className="filter-row mb-3">
          <h6>Groups</h6>
          <div className="d-flex flex-wrap">
            <Badge className="badge-common-light mr-2" variant="outline-light">
              Test Devices
            </Badge>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant=""
          type="button"
          className="btn btn-primary btn-block primary-btn"
          onClick={() => setFilterModal(false)}
        >
          Apply
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FilterModal;
