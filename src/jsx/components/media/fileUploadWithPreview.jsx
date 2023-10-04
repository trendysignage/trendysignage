import React, { useState } from "react";
import uploadImg from "../../../img/cloud-computing-icon.png";
import CircularProgress from "@material-ui/core/CircularProgress";
import deleteIcon from "../../../img/delete-icon.png";
import ImageRotation from '../cropImage/ImageRotation'
function FileUploadWithPreview({
  setShowError,
  setFile,
  setFileMeta,
  setPreviewList,
  previewList,
  isLoading,
}) {
  const [preview, setPreview] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [selectedCroppedFile, setSelectedCroppedFile] = useState(null);
  const [checkCrop, setCheckCrop] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    console.log(event);
    if (!selectedFile) {
        selectedFile(null);
      //setPreview(null);
      return;
    }
    setShowError(null);
    setFileList((fileList) => [...fileList, selectedFile]);
    setFile((file) => [...file, selectedFile]);
    // setSelectedCroppedFile(URL.createObjectURL(selectedFile))
    // setCheckCrop(true);

    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);

    reader.onload = function (e) {
      const newP = {
        file: e.target.result,
        isLoading: false,
      };
      setPreviewList((previewList) => [...previewList, newP]);
    };

  };

  function handleLoadedMetadata(event) {
    console.log("event", event);
    const fMeta = {
      height: event.target.height,
      width: event.target.width,
      length: event.target.duration,
      fileLoading: false,
    };
    setFileMeta((fileMeta) => [...fileMeta, fMeta]);
  }

  const handleDelete = (e, item) => {
    e.preventDefault();
    const newPreview = previewList;
    const newFileList = fileList;
    delete newPreview[item];
    delete newFileList[item];
    setPreviewList(newPreview);
    setFile(newFileList);
  };

  return (
    <>
      {
        checkCrop && <ImageRotation 
        imgSrc={selectedCroppedFile}
        checkCrop={checkCrop}
        setSelectedCroppedFile={setSelectedCroppedFile}
        setCheckCrop={setCheckCrop}
        setFile={setFile}
      />
      }
      
      <div className=" d-flex flex-column">
        {previewList &&
          previewList.length > 0 &&
          previewList.map((item, index) => {
            return (
              <div className="d-flex justify-content-between align-items-center mb-3">
                {item?.file?.includes("image") ? (
                  <img
                    onLoad={handleLoadedMetadata}
                    src={item.file}
                    style={{ width: "50px", height: "50px", objectFit: "fill" }}
                    alt="File Preview"
                  />
                ) : item?.file?.includes("video") ? (
                  <video
                    onLoadedMetadata={handleLoadedMetadata}
                    style={{ width: "50px", height: "50px", objectFit: "fill" }}
                    src={item.file}
                    controls
                  />
                ) : (
                  ""
                )}
                <img
                  onClick={(e) => handleDelete(e, index)}
                  src={deleteIcon}
                  style={{ width: "30px", height: "30px" }}
                />
              </div>
            );
          })}
        <div className="text-center">{isLoading && <CircularProgress />}</div>
      </div>
      {/* {previewList.length === 0 && ( */}
      <div
        className="upload-file-container relative d-flex align-items-center justify-content-center flex-column"
        style={{ position: "relative" }}
      >
        {previewList.length === 0 && (
          <div className=" d-flex align-items-center justify-content-center flex-column">
            <div className="upload-flie-img">
              <img className="upload-file" src={uploadImg} alt="upload-img" />
            </div>
            <h6>Click here to upload files</h6>
          </div>
        )}

        {previewList.length > 0 && (
          <button
            className={`btn btn-primary btn-block primary-btn add-file-media`}
          >
            + Add More
          </button>
        )}

        <input
          type="file"
          accept="image/*,video/*"
          className="upload-file-textfield"
          onChange={handleFileChange}
        />
      </div>
    </>
  );
}

export default FileUploadWithPreview;
