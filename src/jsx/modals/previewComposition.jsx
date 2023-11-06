import { Button, Modal } from "react-bootstrap";
import cancelIcon from "../../img/cancel-icon.png";
import { useEffect, useRef, useState } from "react";
import WebVideoPlayer from "../components/web-player/WebVideoPlayer";
import { BASE_URL } from "../../utils/api";
import { isBlobUrl } from "../../utils/UtilsService";
import PreviewZone1 from "../components/web-player/previewZone1";
import PreviewZone2 from "../components/web-player/PreviewZone2";
import PreviewZone3 from "../components/web-player/PreviewZone3";
const PreviewComposition = ({
  setShowPreview,
  content,
  contentnew,
  layout,
  referenceUrl,
  referenceUrlArray,
}) => {
  console.log(content, contentnew);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [current1Index, setCurrent1Index] = useState(0);
  const [current2Index, setCurrent2Index] = useState(0);
  const timeoutRef = useRef("");
  const timeout1Ref = useRef("");
  const divRef = useRef(null);
  useEffect(() => {
    if (layout && layout.zones.length == 1) {
      if (contentnew.Zone1[currentIndex]) {
        const timeoutDuration = contentnew.Zone1[currentIndex].duration * 1000;
        timeoutRef.current = setTimeout(() => {
          if (currentIndex === contentnew.Zone1.length - 1) {
            setCurrentIndex(0);
          } else {
            setCurrentIndex((currentIndex) => currentIndex + 1);
          }
        }, timeoutDuration);
      }
    } else if (layout && layout.zones.length == 2) {
      if (contentnew.Zone1[currentIndex]) {
        const timeoutDuration = contentnew.Zone1[currentIndex].duration * 1000;
        timeoutRef.current = setTimeout(() => {
          if (currentIndex === contentnew.Zone1.length - 1) {
            setCurrentIndex(0);
          } else {
            setCurrentIndex((currentIndex) => currentIndex + 1);
          }
        }, timeoutDuration);
      }
      if (contentnew.Zone2 && contentnew.Zone2[current1Index]) {
        const timeout1Duration =
          contentnew.Zone2[current1Index].duration * 1000;
        timeout1Ref.current = setTimeout(() => {
          if (current1Index === contentnew.Zone2.length - 1) {
            setCurrent1Index(0);
          } else {
            setCurrent1Index((current1Index) => current1Index + 1);
          }
        }, timeout1Duration);
      }
    } else if (layout && layout.zones.length == 3) {
      if (contentnew.Zone1[currentIndex]) {
        const timeoutDuration = contentnew.Zone1[currentIndex].duration * 1000;
        timeoutRef.current = setTimeout(() => {
          if (currentIndex === contentnew.Zone1.length - 1) {
            setCurrentIndex(0);
          } else {
            setCurrentIndex((currentIndex) => currentIndex + 1);
          }
        }, timeoutDuration);
      }
      if (contentnew.Zone2 && contentnew.Zone2[current1Index]) {
        const timeout1Duration =
          contentnew.Zone2[current1Index].duration * 1000;
        timeout1Ref.current = setTimeout(() => {
          if (current1Index === contentnew.Zone2.length - 1) {
            setCurrent1Index(0);
          } else {
            setCurrent1Index((current1Index) => current1Index + 1);
          }
        }, timeout1Duration);
      }
      if (contentnew.Zone3 && contentnew.Zone3[current2Index]) {
        const timeout1Duration =
          contentnew.Zone3[current2Index]?.duration * 1000;
        timeout1Ref.current = setTimeout(() => {
          if (current2Index === contentnew.Zone3.length - 1) {
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
    const element = document.getElementsByClassName(
      "modal-priview-composition"
    )[0];
    // if (element.classList.contains("fullscreen-mode")) {
    //   element.classList.remove("fullscreen-mode");
    // }

    if (element) {
      // divRef.current.requestFullscreen();
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
      element.classList.add("fullscreen-mode");
    }
  };

  const viewImage = content[currentIndex].fitToScreen
    ? "fitScreen"
    : content[currentIndex].crop
    ? "crop"
    : "aspectRation";

  // const url = isBlobUrl(referenceUrl[currentIndex])
  //   ? referenceUrl[currentIndex]
  //   : `${BASE_URL}${referenceUrl[currentIndex]}`;

  const url =
    referenceUrlArray.Zone1 && referenceUrlArray.Zone1[currentIndex]
      ? isBlobUrl(referenceUrlArray.Zone1[currentIndex])
        ? referenceUrlArray.Zone1[currentIndex]
        : `${BASE_URL}${referenceUrlArray.Zone1[currentIndex]}`
      : "";

  const url1 =
    referenceUrlArray.Zone2 && referenceUrlArray.Zone2[current1Index]
      ? isBlobUrl(referenceUrlArray.Zone2[current1Index])
        ? referenceUrlArray.Zone2[current1Index]
        : `${BASE_URL}${referenceUrlArray.Zone2[current1Index]}`
      : "";

  const url2 =
    referenceUrlArray.Zone3 && referenceUrlArray.Zone3[current2Index]
      ? isBlobUrl(referenceUrlArray.Zone3[current2Index])
        ? referenceUrlArray.Zone3[current2Index]
        : `${BASE_URL}${referenceUrlArray.Zone3[current2Index]}`
      : "";

  return (
    <Modal
      className={`fade bd-example-modal-lg mt-4 custom-modal custom-modal-large custom-modal-preview ${layout.screenType}-view`}
      show={true}
      size="xl"
    >
      <Modal.Header style={{ paddingBottom: "0px" }}>
        <Modal.Title className="mr-auto">Preview</Modal.Title>

        <Button variant="" className="close " onClick={() => onFullScreen()}>
          <i className="fa fa-expand fullscreenbtn"></i>
        </Button>
        <Button
          variant=""
          className="close"
          onClick={() => setShowPreview(false)}
        >
          <img className="cancel-icon" src={cancelIcon} alt="cancel-icon" />
        </Button>
      </Modal.Header>
      <Modal.Body ref={divRef} style={{ padding: "15px" }}>
        {layout && layout.zones.length == 1 ? (
          <>
            <PreviewZone1 
              layout={layout}
              content={content}
              contentnew={contentnew}
              viewImage={viewImage}
              currentIndex={currentIndex}

            />
          </>
        ) : layout.zones.length == 2 ? (
            <PreviewZone2 
              layout={layout}
              content={content}
              contentnew={contentnew}
              viewImage={viewImage}
              currentIndex={currentIndex}
              current1Index={current1Index}

            />
        ) : layout.zones.length == 3 ? (
            <PreviewZone3
              layout={layout}
              content={content}
              contentnew={contentnew}
              viewImage={viewImage}
              currentIndex={currentIndex}
              current1Index={current1Index}
              current2Index={current2Index}

            />
        ) : (
          <></>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default PreviewComposition;
