import { Button, Modal } from "react-bootstrap";
import cancelIcon from "../../img/cancel-icon.png";
import FileUploadWithPreview from "../components/media/fileUploadWithPreview";
import { useState } from "react";
import { addMedia } from "../../utils/api";

const UploadMediaModal = ({ showUploadMediaModal, setUploadMediaModal, callAllMediaApi }) => {
  const [file, setFile] = useState([]);
  const [fileMeta, setFileMeta] = useState([]);
  const [error, setShowError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [keyImg, setKeyImg] = useState(null);
  const handleUpload = async () => {
    let c = 0;
    //setKeyImg(c)
    for(let item of file){
      await handleSingleUpload(item, c)
      c++;      
    }
    // setIsLoading(false)
    // callAllMediaApi()
    // setUploadMediaModal(false)
  };
  const handleSingleUpload = async (item, c) => {
    setIsLoading(true)
    setKeyImg(c)
    if (!item) {
      setIsLoading(false)
      setShowError("Please select a File")
      return false;
    } 

    if (!item.type.includes('image') && !item.type.includes('video')) {
      setIsLoading(false)
      setShowError("Please upload an image or video file.")
      return;
    }
    const formData = new FormData();

    //const sendFileMeta = JSON.stringify({...fileMeta,...{size : bytesToMB(item.size)}})
    //const fileMetaNew = fileMeta;
    console.log("fileMeta",fileMeta)
    //fileMetaNew[c].fileLoading = true;
   // setFileMeta(fileMetaNew)
    const sendFileMeta = JSON.stringify({
      height: fileMeta[c].height,
      width: fileMeta[c].width,
      length: fileMeta[c].duration,
      fileLoading:true,
      size : bytesToMB(item.size)
    })
    formData.append('file', item);
    formData.append('properties', sendFileMeta);
    if (item.type.includes('image')) {
      formData.append('type', "image");
    } else if (item.type.includes('video')) {
      formData.append('type', "video");
    } else {
      return false;
    }
    console.log(sendFileMeta)
    setTimeout(() => {
      const fileMetaUpdated = fileMeta;
      fileMetaUpdated[c].fileLoading = false;
      setFileMeta(fileMetaUpdated)
    }, 2000)
   //await addMedia(formData)
  }

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



     <FileUploadWithPreview file={file}  setFile={setFile} setShowError={setShowError} setFileMeta={setFileMeta} keyImg={keyImg} fileMeta={fileMeta}/>
    
        {error && <div className="error text-center font-weight-500">{error}</div>}
        <div className="add-screen-paragraph text-center font-weight-500">
          <p>We support JPEG, PNG, MP4.</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
      <div className="loader-button-container">
        <Button
          variant=""
          type="button"
          //disabled={isLoading}
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
