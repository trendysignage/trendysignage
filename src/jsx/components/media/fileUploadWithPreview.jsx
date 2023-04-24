import React, { useState } from "react";
import uploadImg from "../../../img/cloud-computing-icon.png";
function FileUploadWithPreview({ setShowError, setFile }) {
  const [preview, setPreview] = useState(null);
  
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
   
    if (!selectedFile) {
      setFile(null);
      setPreview(null);
      return;
    }
    setShowError(null)
    setFile(selectedFile);

    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);

    reader.onload = function (e) {
      setPreview(e.target.result);
    };
  };

  return (
    <div className="upload-file-container relative d-flex align-items-center justify-content-center flex-column">
      {!preview && (
        <>
          <div className="upload-flie-img">
            <img className="upload-file" src={uploadImg} alt="upload-img" />
          </div>
          <h6>Click here to upload files</h6>
        </>
      )}
      <div>
        <input
          type="file"
          accept="image/*,video/*"
          className="upload-file-textfield"
          onChange={handleFileChange}
        />

        {preview && (
          <>
            {preview.includes("image") ? (
              <img
                src={preview}
                style={{ width: "auto", height: "200px", objectFit: "cover" }}
                alt="File Preview"
              />
            ) : (
              <video
                style={{ width: "auto", height: "200px", objectFit: "cover" }}
                src={preview}
                controls
              />
            )}
          </>
        )}
        
      </div>
    </div>
  );
}

export default FileUploadWithPreview;
