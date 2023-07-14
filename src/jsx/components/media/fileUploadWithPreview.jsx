import React, { useState } from "react";
import uploadImg from "../../../img/cloud-computing-icon.png";
import CircularProgress from '@material-ui/core/CircularProgress';
function FileUploadWithPreview({ setShowError, setFile, setFileMeta, setPreviewList, previewList, isLoading}) {
  const [preview, setPreview] = useState(null);
  const [fileList, setFileList] = useState([]);
  
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
   console.log(event);
    if (!selectedFile) {
      //setFile(null);
      //setPreview(null);
      return;
    }
    setShowError(null)
    setFileList(fileList => [...fileList, selectedFile]);
    setFile(file=> [...file,selectedFile]);

    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);

    reader.onload = function (e) {
      const newP = {
        file:e.target.result,
        isLoading:false
      }
      setPreviewList(previewList => [...previewList,newP])
    };

    console.log('selectedFile',previewList)

  };
  function handleLoadedMetadata(event) {
    console.log("event",event)
    const fMeta = {
      height: event.target.height,
      width: event.target.width,
      length: event.target.duration,
      fileLoading:false
     }
    setFileMeta(fileMeta=>[...fileMeta,fMeta])

  }

  const handleDelete = (e, item) => {
    e.preventDefault();
    const newPreview = previewList;
    const newFileList = fileList;
    delete newPreview[item];
    delete newFileList[item]
    setPreviewList(newPreview);
    setFile(newFileList);
  }

  return (
    <>
    <div className=" d-flex flex-column">
        { previewList && previewList.length > 0 &&  previewList.map((item,index) => {
            return <div>
              {item.file.includes("image") ? (
                  <img
                  onLoad={handleLoadedMetadata}
                    src={item.file}
                    style={{ width: "auto", height: "50px", objectFit: "cover" }}
                    alt="File Preview"
                  />
                  ) : item.file.includes('video') ?<video
                  onLoadedMetadata={handleLoadedMetadata}
                  style={{ width: "auto", height: "50px", objectFit: "cover" }}
                  src={item.file}
                  controls
                />:""}
                <button onClick={(e) => handleDelete(e, index)}>Delete</button>
            </div>
          })
        }
        {isLoading && <CircularProgress />}
    </div>
    <div className="upload-file-container relative d-flex align-items-center justify-content-center flex-column" style={{position:"relative"}}>
          <div className="upload-flie-img">
            <img className="upload-file" src={uploadImg} alt="upload-img" />
          </div>
          <h6>Click here to upload files</h6>
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
