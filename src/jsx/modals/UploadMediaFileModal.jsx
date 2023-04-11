import { Button, Modal } from "react-bootstrap";
import cancelIcon from "../../img/cancel-icon.png";
import uploadImg from "../../img/cloud-computing-icon.png";

const UploadMediaModal = ({ showUploadMediaModal, setUploadMediaModal }) => {
  return (
    <Modal
      className="fade bd-example-modal-lg mt-4 custom-modal custom-modal-medium"
      show={showUploadMediaModal}
      size="md"
    >
      <Modal.Header>
        <Modal.Title className="mr-auto">Upload Media Files</Modal.Title>
        <Button
          variant=""
          className="close"
          onClick={() => setUploadMediaModal(false)}
        >
          <img className="cancel-icon" src={cancelIcon} alt="cancel-icon" />
        </Button>
      </Modal.Header>
      <Modal.Body>
        <div className="upload-file-container relative d-flex align-items-center justify-content-center flex-column">
          <div className="upload-flie-img">
            <img className="upload-file" src={uploadImg} alt="upload-img" />
          </div>
          <h6>Click here to upload files</h6>
          <input type="file" className="upload-file-textfield" />
        </div>
        <div class="add-screen-paragraph text-center font-weight-500">
          <p>We support JPEG, PNG, MP4 dummy text.</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant=""
          type="button"
          className="btn btn-primary btn-block primary-btn"
          onClick={() => setUploadMediaModal(false)}
        >
          Upload
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UploadMediaModal;
