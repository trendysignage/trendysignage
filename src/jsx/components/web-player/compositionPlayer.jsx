import React, { useEffect, useState, useRef } from "react";

import WebVideoPlayer from "./WebVideoPlayer";
import { BASE_URL } from "../../../utils/api";
import ReactPlayer from "react-player";
import Iframe from "react-iframe";
import { fontSize } from "@material-ui/system";
import Zone1 from "./Zone1";
import Zone2 from "./Zone2";
import Zone3 from "./Zone3";
import { getWeather } from "../../../utils/api";
const CompositionPlayer = ({ contents, content, referenceUrl }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [current1Index, setCurrent1Index] = useState(0);
  const [current2Index, setCurrent2Index] = useState(0);
  const timeout1Ref = useRef("");
  const timeoutRef = useRef("");

  useEffect(() => {
    if (contents && contents.zones.length == 1) {
      if (contents.zones[0].content[currentIndex]) {
        const timeoutDuration =
          contents.zones[0].content[currentIndex].duration * 1000;
        timeoutRef.current = setTimeout(() => {
          if (currentIndex === contents.zones[0].content.length - 1) {
            setCurrentIndex(0);
          } else {
            setCurrentIndex((currentIndex) => currentIndex + 1);
          }
        }, timeoutDuration);
      }
    } else if (contents && contents.zones.length == 2) {
      if (contents.zones[0].content[currentIndex]) {
        const timeoutDuration =
          contents.zones[0].content[currentIndex].duration * 1000;
        timeoutRef.current = setTimeout(() => {
          if (currentIndex === contents.zones[0].content.length - 1) {
            setCurrentIndex(0);
          } else {
            setCurrentIndex((currentIndex) => currentIndex + 1);
          }
        }, timeoutDuration);
      }
      if (contents.zones[1].content[current1Index]) {
        const timeout1Duration =
          contents.zones[1].content[current1Index].duration * 1000;
        timeout1Ref.current = setTimeout(() => {
          if (current1Index === contents.zones[1].content.length - 1) {
            setCurrent1Index(0);
          } else {
            setCurrent1Index((current1Index) => current1Index + 1);
          }
        }, timeout1Duration);
      }
    } else if (contents && contents.zones.length == 3) {
      if (contents.zones[0].content[currentIndex]) {
        const timeoutDuration =
          contents.zones[0].content[currentIndex].duration * 1000;
        timeoutRef.current = setTimeout(() => {
          if (currentIndex === contents.zones[0].content.length - 1) {
            setCurrentIndex(0);
          } else {
            setCurrentIndex((currentIndex) => currentIndex + 1);
          }
        }, timeoutDuration);
      }
      if (contents.zones[1].content[current1Index]) {
        const timeout1Duration =
          contents.zones[1].content[current1Index].duration * 1000;
        timeout1Ref.current = setTimeout(() => {
          if (current1Index === contents.zones[1].content.length - 1) {
            setCurrent1Index(0);
          } else {
            setCurrent1Index((current1Index) => current1Index + 1);
          }
        }, timeout1Duration);
      }
      if (contents.zones[2].content[current2Index]) {
        const timeout1Duration =
          contents.zones[2].content[current2Index].duration * 1000;
        timeout1Ref.current = setTimeout(() => {
          if (current2Index === contents.zones[2].content.length - 1) {
            setCurrent2Index(0);
          } else {
            setCurrent2Index((current2Index) => current2Index + 1);
          }
        }, timeout1Duration);
      }
    }

    return () => clearTimeout(timeoutRef.current);
  }, [currentIndex, current1Index]);
  const viewImage = content[currentIndex]?.fitToScreen
    ? "fitScreen"
    : content[currentIndex]?.crop
    ? "crop"
    : "aspectRation";

  return (
    <>
      {" "}
      {contents && contents.zones.length == 1 ? (
        <Zone1
          contents={contents}
          currentIndex={currentIndex}
          current1Index={current1Index}
          current2Index={current2Index}
          viewImage={viewImage}
        />
      ) : contents.zones.length == 2 ? (
        <Zone2
          contents={contents}
          currentIndex={currentIndex}
          current1Index={current1Index}
          current2Index={current2Index}
          viewImage={viewImage}
        />
      ) : contents.zones.length == 3 ? (
        <Zone3
          contents={contents}
          currentIndex={currentIndex}
          current1Index={current1Index}
          current2Index={current2Index}
          viewImage={viewImage}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default CompositionPlayer;
