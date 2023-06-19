import { Button, Modal } from "react-bootstrap";
import cancelIcon from "../../img/cancel-icon.png";
import FileUploadWithPreview from "../components/media/fileUploadWithPreview";
import { useState } from "react";
import { addMedia } from "../../utils/api";

const UploadMediaModal = ({ showUploadMediaModal, setUploadMediaModal, callAllMediaApi }) => {
  const [file, setFile] = useState(null);
  const [fileMeta, setFileMeta] = useState(null);
  const [error, setShowError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleUpload = async () => {
    setIsLoading(true)
    if (!file) {
      setIsLoading(false)
      setShowError("Please select a File")
      return false;
    } 

    if (!file.type.includes('image') && !file.type.includes('video')) {
      setIsLoading(false)
      setShowError("Please upload an image or video file.")
      return;
    }
    const formData = new FormData();
    const sendFileMeta = JSON.stringify({...fileMeta,...{size : bytesToMB(file.size)}})
    formData.append('file', file);
    // formData.append('title', file.name);
    formData.append('properties', sendFileMeta);
    if (file.type.includes('image')) {
      formData.append('type', "image");
    } else if (file.type.includes('video')) {
      formData.append('type', "video");
    } else {
      return false;
    }
     await addMedia(formData)
     setIsLoading(false)
     callAllMediaApi()
     setUploadMediaModal(false)
  };

  const bytesToMB = (bytes) => {
    return (bytes / (1024 * 1024)).toFixed(2);
  };
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



     <FileUploadWithPreview file={file}  setFile={setFile} setShowError={setShowError} setFileMeta={setFileMeta}/>
    
        {error && <div className="error text-center font-weight-500">{error}</div>}
        <div class="add-screen-paragraph text-center font-weight-500">
          <p>We support JPEG, PNG, MP4.</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
      <div className="loader-button-container">
        <Button
          variant=""
          type="button"
          disabled={isLoading}
          className={`btn btn-primary btn-block primary-btn`}
          onClick={() => handleUpload()}
        >
        {isLoading ? <div className="loader"></div> : 'Upload'}
          
        </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default UploadMediaModal;
