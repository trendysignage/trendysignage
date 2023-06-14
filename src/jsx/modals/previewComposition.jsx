import { Button, Modal } from "react-bootstrap";
import cancelIcon from "../../img/cancel-icon.png";
import { useEffect, useRef, useState } from "react";
import WebVideoPlayer from "../components/web-player/WebVideoPlayer";
import { BASE_URL } from "../../utils/api";
import { isBlobUrl } from "../../utils/UtilsService";
const PreviewComposition = ({
  setShowPreview,
  content,
  contentnew,
  layout,
  referenceUrl,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [current1Index, setCurrent1Index] = useState(0);
  const [current2Index, setCurrent2Index] = useState(0);
  const timeoutRef = useRef("");
  const timeout1Ref = useRef("");
  const divRef = useRef(null);
  useEffect(() => {
    console.log("contentnew",contentnew)
    if(layout && layout.zones.length == 1){
      if (contentnew.Zone1[currentIndex]) {
        const timeoutDuration = contentnew.Zone1[currentIndex].duration * 1000;
        timeoutRef.current = setTimeout(() => {
          if(currentIndex === (contentnew.Zone1.length -1) ){
            setCurrentIndex(0);
          } else {
            setCurrentIndex((currentIndex) => currentIndex + 1);
          }
        }, timeoutDuration);
      }
    }else if(layout && layout.zones.length == 2){
      if (contentnew.Zone1[currentIndex]) {
        const timeoutDuration = contentnew.Zone1[currentIndex].duration * 1000;
        timeoutRef.current = setTimeout(() => {
          if(currentIndex === (contentnew.Zone1.length -1) ){
            setCurrentIndex(0);
          } else {
            setCurrentIndex((currentIndex) => currentIndex + 1);
          }
        }, timeoutDuration);
      }
      if (contentnew.Zone2 && contentnew.Zone2[current1Index]) {
        const timeout1Duration = contentnew.Zone2[current1Index].duration * 1000;
        timeout1Ref.current = setTimeout(() => {
          if(current1Index === (contentnew.Zone2.length -1) ){
            setCurrent1Index(0);
          } else {
            setCurrent1Index((current1Index) => current1Index + 1);
          }
        }, timeout1Duration);
      }
    }else if(layout && layout.zones.length == 3){
      if (contentnew.Zone1[currentIndex]) {
        const timeoutDuration = contentnew.Zone1[currentIndex].duration * 1000;
        timeoutRef.current = setTimeout(() => {
          if(currentIndex === (contentnew.Zone1.length -1) ){
            setCurrentIndex(0);
          } else {
            setCurrentIndex((currentIndex) => currentIndex + 1);
          }
        }, timeoutDuration);
      }
      if (contentnew.Zone2 && contentnew.Zone2[current1Index]) {
        const timeout1Duration = contentnew.Zone2[current1Index].duration * 1000;
        timeout1Ref.current = setTimeout(() => {
          if(current1Index === (contentnew.Zone2.length -1) ){
            setCurrent1Index(0);
          } else {
            setCurrent1Index((current1Index) => current1Index + 1);
          }
        }, timeout1Duration);
      }
      if (contentnew.Zone3 && contentnew.Zone3[current1Index]) {
        const timeout1Duration = contentnew.Zone3[current2Index].duration * 1000;
        timeout1Ref.current = setTimeout(() => {
          if(current2Index === (contentnew.Zone3.length -1) ){
            setCurrent2Index(0);
          } else {
            setCurrent2Index((current2Index) => current2Index + 1);
          }
        }, timeout1Duration);
      }
    }
     
    return () => clearTimeout(timeoutRef.current);
  }, [currentIndex, current1Index]);

  const onFullScreen = () => {
    const element = document.getElementsByClassName("custom-modal-preview")[0]
    if (element) {
      // divRef.current.requestFullscreen();
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    }
  };

  const viewImage = content[currentIndex].fitToScreen
    ? "fitScreen"
    : content[currentIndex].crop
    ? "crop"
    : "aspectRation";
  const url = isBlobUrl(referenceUrl[currentIndex])
    ? referenceUrl[currentIndex]
    : `${BASE_URL}${referenceUrl[currentIndex]}`;


  return (
    <Modal
      className={`fade bd-example-modal-lg mt-4 custom-modal custom-modal-large custom-modal-preview ${layout.screenType}-view`}
      show={true}
      size="xl"
    >
      <Modal.Header>
        <Modal.Title className="mr-auto">Preview</Modal.Title>

        <Button
          variant=""
          className="close "
          onClick={() => onFullScreen()}
        >
          <i class="fa fa-expand fullscreenbtn"></i>
        </Button>
        <Button
          variant=""
          className="close"
          onClick={() => setShowPreview(false)}
        >
          <img className="cancel-icon" src={cancelIcon} alt="cancel-icon" />
        </Button>


      </Modal.Header>
      <Modal.Body ref={divRef}>
        {
          layout && layout.zones.length == 1
          ?
          <>
            {content[currentIndex] && content[currentIndex].type === "image" && (
            <div className="basic-list-group image-preview-container media-content">
              <img
                className="webplayer-preview-img"
                style={{
                  objectFit: `${viewImage === "fitScreen" ? "fill" : "contain"}`,
                }}
                src={url}
                alt="media-img"
              />
            </div>
          )}
          {content[currentIndex] && content[currentIndex].type === "video" && (
            <div
              className={`basic-list-group video-container media-content ${viewImage} ${
                viewImage === "fitScreen" ? "fitImage" : "containImage"
              }`}
            >
              <WebVideoPlayer src={url}></WebVideoPlayer>
            </div>
          )}
          </> 
          :
          layout.zones.length == 2
          ?
          <div>
            <div style={{width:"50%",height:"100%",display:"inline-block"}}>
              {contentnew.Zone1[currentIndex] && contentnew.Zone1[currentIndex].type === "image" && (
              <div className="basic-list-group image-preview-container media-content">
                <img
                  className="webplayer-preview-img"
                  style={{
                    objectFit: `${viewImage === "fitScreen" ? "fill" : "contain"}`,
                  }}
                  src={`http://144.126.143.140:5000/${contentnew.Zone1[currentIndex].url}`}
                  alt="media-img"
                />
              </div>
              )}
              {contentnew.Zone2 && contentnew.Zone1[currentIndex] && contentnew.Zone1[currentIndex].type === "video"  && (
                <div
                  className={`basic-list-group video-container media-content ${viewImage} ${
                    viewImage === "fitScreen" ? "fitImage" : "containImage"
                  }`}
                >
                  <WebVideoPlayer src={`http://144.126.143.140:5000/${contentnew.Zone1[currentIndex].url}`}></WebVideoPlayer>
                </div>
              )}
            </div>
            <div style={{width:"50%",height:"100%",display:"inline-block"}}>
              {contentnew.Zone2 && contentnew.Zone2[current1Index] && contentnew.Zone2[current1Index].type === "image" && (
              <div className="basic-list-group image-preview-container media-content">
                <img
                  className="webplayer-preview-img"
                  style={{
                    objectFit: `${viewImage === "fitScreen" ? "fill" : "contain"}`,
                  }}
                  src={`http://144.126.143.140:5000/${contentnew.Zone2[current1Index].url}`}
                  alt="media-img"
                />
              </div>
              )}
              {contentnew.Zone2 && contentnew.Zone2[current1Index] && contentnew.Zone2[current1Index].type === "video"  && (
                <div
                  className={`basic-list-group video-container media-content ${viewImage} ${
                    viewImage === "fitScreen" ? "fitImage" : "containImage"
                  }`}
                >
                  <WebVideoPlayer src={`http://144.126.143.140:5000/${contentnew.Zone2[current1Index].url}`}></WebVideoPlayer>
                </div>
              )}
            </div>
          </div>
          :
          layout.zones.length == 3
          ?
          <div>
            <div style={{width:"50%",height:"70%",display:"inline-block"}}>
              {contentnew.Zone1[currentIndex] && contentnew.Zone1[currentIndex].type === "image" && (
              <div className="basic-list-group image-preview-container media-content">
                <img
                  className="webplayer-preview-img"
                  style={{
                    objectFit: `${viewImage === "fitScreen" ? "fill" : "contain"}`,
                  }}
                  src={`http://144.126.143.140:5000/${contentnew.Zone1[currentIndex].url}`}
                  alt="media-img"
                />
              </div>
              )}
              {contentnew.Zone1[currentIndex] && contentnew.Zone1[currentIndex].type === "video"  && (
                <div
                  className={`basic-list-group video-container media-content ${viewImage} ${
                    viewImage === "fitScreen" ? "fitImage" : "containImage"
                  }`}
                >
                  <WebVideoPlayer src={`http://144.126.143.140:5000/${contentnew.Zone1[currentIndex].url}`}></WebVideoPlayer>
                </div>
              )}
            </div>
            <div style={{width:"50%",height:"70%",display:"inline-block"}}>
              {contentnew.Zone2[current1Index] && contentnew.Zone2[current1Index].type === "image" && (
              <div className="basic-list-group image-preview-container media-content">
                <img
                  className="webplayer-preview-img"
                  style={{
                    objectFit: `${viewImage === "fitScreen" ? "fill" : "contain"}`,
                  }}
                  src={`http://144.126.143.140:5000/${contentnew.Zone2[current1Index].url}`}
                  alt="media-img"
                />
              </div>
              )}
              {contentnew.Zone2[current1Index] && contentnew.Zone2[current1Index].type === "video"  && (
                <div
                  className={`basic-list-group video-container media-content ${viewImage} ${
                    viewImage === "fitScreen" ? "fitImage" : "containImage"
                  }`}
                >
                  <WebVideoPlayer src={`http://144.126.143.140:5000/${contentnew.Zone2[current1Index].url}`}></WebVideoPlayer>
                </div>
              )}
            </div>
            <div style={{width:"100%",height:"18%", minHeight:"18%"}}>
              {contentnew.Zone3[current2Index] && contentnew.Zone3[current2Index].type === "image" && (
              <div className="basic-list-group image-preview-container media-content">
                <img
                  className="webplayer-preview-img"
                  style={{
                    objectFit: `${viewImage === "fitScreen" ? "fill" : "contain"}`,
                  }}
                  src={`http://144.126.143.140:5000/${contentnew.Zone3[current2Index].url}`}
                  alt="media-img"
                />
              </div>
              )}
              {contentnew.Zone3[current2Index] && contentnew.Zone3[current2Index].type === "video"  && (
                <div
                  className={`basic-list-group video-container media-content ${viewImage} ${
                    viewImage === "fitScreen" ? "fitImage" : "containImage"
                  }`}
                >
                  <WebVideoPlayer src={`http://144.126.143.140:5000/${contentnew.Zone3[current2Index].url}`}></WebVideoPlayer>
                </div>
              )}
            </div>
          </div>
          :
          <></>
        }
        
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};

export default PreviewComposition;
