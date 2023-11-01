import WebVideoPlayer from './WebVideoPlayer'
import {BASE_URL} from '../../../utils/api';
const PreviewZone3 = ({layout, content, currentIndex,current1Index, current2Index, viewImage, contentnew}) => {
  return (
    <>
        <div className="modal-priview-composition" style={{ height: "560px" }}>
            <div className="third-compoition-container">
              <div className="third-composition-top-div">
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
                        src={`${BASE_URL}/${contentnew['Zone1'][currentIndex].url}`}
                        alt="media-img"
                      />
                    </div>
                  )}
                    {contentnew['Zone1'][currentIndex] &&
                        contentnew['Zone1'][currentIndex].type === "video" && ( 
                    <div
                      className={`basic-list-group video-container media-content ${viewImage} ${
                        viewImage === "fitScreen" ? "fitImage" : "containImage"
                      }`}
                    >
                      <WebVideoPlayer
                        src={`${BASE_URL}/${contentnew['Zone1'][currentIndex].url}`}
                      ></WebVideoPlayer>
                    </div>
                  )}
              </div>
              <div className="third-composition-second-div">
              {contentnew['Zone2'][current1Index] &&
                contentnew['Zone2'][current1Index].type === "image" && (
                    <div className="basic-list-group image-preview-container media-content">
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
                {contentnew['Zone2'][current1Index] &&
                    contentnew['Zone2'][current1Index].type === "video" && (
                    <div
                      className={`basic-list-group video-container media-content ${viewImage} ${
                        viewImage === "fitScreen" ? "fitImage" : "containImage"
                      }`}
                    >
                      <WebVideoPlayer
                        src={`${BASE_URL}/${contentnew['Zone2'][current1Index].url}`}
                      ></WebVideoPlayer>
                    </div>
                  )}
              </div>
            </div>

            <div className="third-composition-third-div">
                {contentnew['Zone3'][current2Index] &&
                    contentnew['Zone3'][current2Index].type === "image" && (
                  <div className="basic-list-group image-preview-container media-content">
                    <img
                      className="webplayer-preview-img"
                      style={{
                        objectFit: `${
                          viewImage === "fitScreen" ? "fill" : "contain"
                        }`,
                      }}
                      src={`${BASE_URL}/${contentnew['Zone3'][current2Index].url}`}
                      alt="media-img"
                    />
                  </div>
                )}
                    {contentnew['Zone3'][current2Index] &&
                        contentnew['Zone3'][current2Index].type === "video" && (
                  <div
                    className={`basic-list-group video-container media-content ${viewImage} ${
                      viewImage === "fitScreen" ? "fitImage" : "containImage"
                    }`}
                  >
                    <WebVideoPlayer
                      src={`${BASE_URL}/${contentnew['Zone3'][current2Index].url}`}
                    ></WebVideoPlayer>
                  </div>
                )}
            </div>
          </div>
    </>
  );
};

export default PreviewZone3;
