import { useCallback, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import cancelIcon from "../../img/cancel-icon.png";
import WebVideoPlayer from "../components/web-player/WebVideoPlayer";
import { BASE_URL } from "../../utils/api";
import ImageCroper from "../components/cropImage";
import getCroppedImg from "../components/cropImage/cropImage";
import VideoThumbnail from "react-video-thumbnail";
const EditSelectedComposition = ({
  composition,
  setEditSelected,
  updateViewType,
}) => {
  const getDefault = composition.fitToScreen
    ? "fitScreen"
    : composition.crop
    ? "crop"
    : "aspectRation";
  const [viewImage, setViewImage] = useState(getDefault);
  const [isLoading, setIsLoading] = useState(false);
  const [zoom, setZoom] = useState(
    composition.crop ? composition.crop.zoom : 1
  );

  const [croppedAreaPixels, setCroppedAreaPixels] = useState(
    composition.crop ? composition.crop : null
  );
  const handleUpload = async () => {
    const data = {
      ...croppedAreaPixels,
      zoom: zoom,
    };
    let ImgUrl = "";
    if (viewImage === "crop") {
      const getData = await getCroppedImg(
        `${BASE_URL}/vendor/display/mediaFile?path=${composition.url}`,
        croppedAreaPixels
      );
      ImgUrl = getData;
    } else {
      ImgUrl = composition.url;
    }

    updateViewType(data, viewImage, ImgUrl);
    setEditSelected(null);
  };

  const handleOptionChange = (e) => {
    setViewImage(e.target.value);
  };

  return (
    <Modal
      className="fade bd-example-modal-lg mt-4 custom-modal custom-modal-large custom-modal-preview"
      show={true}
      size="xl"
    >
      <Modal.Header>
        <Modal.Title className="mr-auto">Preview</Modal.Title>
        <Button
          variant=""
          className="close"
          onClick={() => setEditSelected(null)}
        >
          <img className="cancel-icon" src={cancelIcon} alt="cancel-icon" />
        </Button>
      </Modal.Header>
      <Modal.Body>
        <div className="custom-container">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="viewImage"
              value="fitScreen"
              id="fitScreen"
              onChange={handleOptionChange}
              defaultChecked={viewImage === "fitScreen"}
            />
            <label className="form-check-label" htmlFor="fitScreen">
              Fit to Screen
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="viewImage"
              value="aspectRation"
              id="aspectRation"
              onChange={handleOptionChange}
              defaultChecked={viewImage === "aspectRation"}
            />
            <label className="form-check-label" htmlFor="aspectRation">
              Maintain Aspect Ratio
            </label>
          </div>
          {composition.type !== "video" && (
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="viewImage"
                value="crop"
                id="crop"
                onChange={handleOptionChange}
                defaultChecked={viewImage === "crop"}
              />
              <label className="form-check-label" htmlFor="crop">
                Crop
              </label>
            </div>
          )}
        </div>
        {composition && composition.type === "image" && (
          <>
            {" "}
            <div
              className="basic-list-group image-preview-container media-content image-preview-editable"
              style={{ border: "1px solid", margin: "1rem" }}
            >
              {viewImage === "crop" && (
                <ImageCroper
                  imgSrc={`${composition.url}`}
                  zoom={zoom}
                  setZoom={setZoom}
                  croppedAreaPixels={croppedAreaPixels}
                  setCroppedAreaPixels={setCroppedAreaPixels}
                />
              )}
              {viewImage !== "crop" && (
                <img
                  className="webplayer-preview-img"
                  style={{
                    objectFit: `${
                      viewImage === "fitScreen" ? "fill" : "contain"
                    }`,
                  }}
                  src={`${BASE_URL}${composition.url}`}
                  alt="media-img"
                />
              )}
            </div>{" "}
            {viewImage === "crop" && ( <div className="controls">
              <input
                type="range"
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby="Zoom"
                onChange={(e) => {
                  setZoom(e.target.value);
                }}
                className="zoom-range"
              />
            </div>)}
          </>
        )}
        {composition && composition.type === "video" && (
          <div
            className={`basic-list-group image-preview-container media-content image-preview-editable ${
              viewImage === "fitScreen" ? "fitImage" : "containImage"
            }`}
            style={{ border: "1px solid", margin: "1rem" }}
          >
            <VideoThumbnail
              videoUrl={`${BASE_URL}/vendor/display/mediaFile?path=${composition.url}`}
              thumbnailHandler={(thumbnail) => console.log(thumbnail)}
              width={1280}
              height={720}
            />
          </div>
        )}
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
            {isLoading ? <div className="loader"></div> : "Apply"}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default EditSelectedComposition;
