import WebVideoPlayer from './WebVideoPlayer'
import {BASE_URL} from '../../../utils/api';
const PreviewZone2 = ({layout, content, currentIndex, current1Index, viewImage, contentnew}) => {
console.log("content",content);
console.log("contentnew",contentnew);
console.log("currentIndex",currentIndex);
  return (
        <div className="modal-priview-composition" style={{ height: "80vh" }}>
            <div className="top-div">
              {contentnew['Zone1'][currentIndex] &&
                contentnew['Zone1'][currentIndex].type === "image" && (
                  <div className="basic-list-group image-preview-container media-content">
                    <img
                      className="webplayer-preview-img"
                      style={{
                        objectFit: `${
                          viewImage === "fitScreen" ? "fill" : "contain"
                        }`,
                      }}
                      //src={`https://ssapi.trendysignage.com/${contentnew.Zone1[currentIndex].url}`}
                      src={`${BASE_URL}/${contentnew['Zone1'][currentIndex].url}`}
                      alt="media-img"
                    />
                  </div>
                )}
              {contentnew.Zone2 &&
                contentnew['Zone1'][currentIndex] &&
                contentnew['Zone1'][currentIndex].type === "video" && (
                  <div
                    className={`basic-list-group video-container media-content ${viewImage} ${
                      viewImage === "fitScreen" ? "fitImage" : "containImage"
                    }`}
                    style={{ height: "100%" }}
                  >
                    <WebVideoPlayer
                      //src={`https://ssapi.trendysignage.com/${contentnew.Zone1[currentIndex].url}`}
                      src={`${BASE_URL}/${contentnew['Zone1'][currentIndex].url}`}
                    ></WebVideoPlayer>
                  </div>
                )}
            </div>
            <div className="bottom-div">
              {contentnew['Zone2'] &&
                contentnew['Zone2'][current1Index] &&
                contentnew['Zone2'][current1Index].type === "image" && (
                  <div
                    className="basic-list-group image-preview-container media-content"
                    style={{ height: "100%" }}
                  >
                    <img
                      className="webplayer-preview-img"
                      style={{
                        objectFit: `${
                          viewImage === "fitScreen" ? "fill" : "contain"
                        }`,
                      }}
                      src={`${BASE_URL}/${contentnew['Zone2'][current1Index].url}`}
                      alt="media-img"
                    />
                  </div>
                )}
              {contentnew['Zone2'] &&
                contentnew['Zone2'][current1Index] &&
                contentnew['Zone2'][current1Index].type === "video" && (
                  <div
                    className={`basic-list-group video-container media-content ${viewImage} ${
                      viewImage === "fitScreen" ? "fitImage" : "containImage"
                    }`}
                    style={{ height: "100%" }}
                  >
                    <WebVideoPlayer
                      src={`${BASE_URL}/${contentnew['Zone2'][current1Index].url}`}
                    ></WebVideoPlayer>
                  </div>
                )}
            </div>
        </div>
  );
};

export default PreviewZone2;
