import { Button, Modal, Row, Col, Badge } from "react-bootstrap";
import cancelIcon from "../../img/cancel-icon.png";

const TemplateAddContent = ({ setShowUrlApp, show }) => {
  return (
    <>
      <Modal
        className="fade bd-example-modal-lg mt-4 app-modal"
        show={show}
        size="md"
        centered
      >
        <Modal.Header className="border-0">
          <Modal.Title className="mr-auto app-modal-heading">
            Add Content
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
        <Modal.Body className="pt-0">
          <p>Enter content you need to add in your template</p>
          <form
          // onSubmit={handleSubmit}
          >
            <div>
              <strong>
                <label>Name</label>
              </strong>

              <input
                type="text"
                className="  form-control "
                placeholder="Give a name"
                required
              />
              <strong>
                <label className="mt-3">Message</label>
              </strong>

              <textarea
                type="text"
                className="form-control"
                rows={5}
                placeholder="Eg. Hope this year be full of colors"
              ></textarea>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer className="border-0 mb-2">
          <Button
            variant=""
            type="button"
            className="btn btn-primary btn-block primary-btn"
          >
            Add Content
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TemplateAddContent;
