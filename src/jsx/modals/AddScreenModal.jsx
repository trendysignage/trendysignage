import { Button, Modal } from "react-bootstrap";
import ComputerIcon from "../../img/computer-monitor-icon.svg";
const AddScreenModal = ({ showScreenModal, setShowScreenModal }) => {
  return (
    <Modal
      className="fade bd-example-modal-lg mt-4"
      show={showScreenModal}
      size="lg"
    >
      <Modal.Header>
        <Modal.Title>
          Don't have a display screen that is ready to use?
        </Modal.Title>
        <Button
          variant=""
          className="close"
          onClick={() => setShowScreenModal(false)}
        >
          <span>&times;</span>
        </Button>
      </Modal.Header>
      <Modal.Body>
        <div className="col-xl-12 col-lg-12 ">
          <div className="addScreenModalTextContent">
            <h4>Register your screen</h4>
          </div>

          <div className="img-bx">
            <img
              src={ComputerIcon}
              alt=""
              className=" mr-3 card-list-img w-100"
              width="130"
              height={130}
            />
          </div>
        </div>
        <div className="">
          <div className="card-header chat-list-header text-center addscreenHeaderSection">
            Enter the 6 character 'Screen Registration Code ' as shown on your
            signage screen
          </div>
          <div className="addScreenModalTextContent">
          <div className="col-md-6"><input
              type="text"
              className="form-control input-default"
              placeholder="Enter registration code"
            /></div>
            
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="danger light"
          onClick={() => setShowScreenModal(false)}
        >
          Close
        </Button>
        <Button variant="" type="button" className="btn btn-primary">
          Next
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddScreenModal;
