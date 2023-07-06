import React, { useState } from "react";
import { useEffect } from "react";
import { Col } from "react-bootstrap";
import VideoThumbnail from "react-video-thumbnail";
import emptyMediaImg from "../../../images/card/1.png";
import { BASE_URL, getAllComposition, vendorProfile } from "../../../utils/api";
import DefaultCompositionModal from "../../modals/DefaultCompositionModal";

const DefaultComposition = () => {
  const defaultMediaUrl = `${BASE_URL}/default/file_1681896290177.png`;
  const [defaultCompositionShow, setDefaultCompositionShow] = useState(false);
  const [compositionList, setCompositionList] = useState();
  const [showDefaultComposition, setShowDefaultComposition] = useState("");

  async function getComPosition() {
    await getAllComposition().then((res) => {
      console.log(res, "res push screen, DefaultComposition");
      setCompositionList(res);
    });
  }
  async function getVendorProfile() {
    await vendorProfile().then((res) => {
      console.log(res, "res push screen, vendorProfile");
      setShowDefaultComposition(res.data.data.defaultComposition);
    });
  }
  const content = showDefaultComposition?.media?.zones[0].content[0];
  useEffect(() => {
    getComPosition();
    getVendorProfile();
  }, []);
  return (
    <>
      <div className="row settings-default">
        <Col xl="6">
          <div className="default-composition-preview">
            <div className="thumbnail">
              {content?.type === "image" && (
                <img
                  className=" imgContent"
                  src={`${BASE_URL}${content.url}`}
                  alt="media-img"
                />
              )}
              {content?.type !== "image" && content?.type !== "video" && (
                <img
                  className="imgContent"
                  src={defaultMediaUrl}
                  alt="Card cap"
                />
              )}
              {content?.type === "video" && (
                <VideoThumbnail
                  videoUrl={`${BASE_URL}/vendor/display/mediaFile?path=${content.url}`}
                  thumbnailHandler={(thumbnail) =>
                    console.log(thumbnail, "pppppp")
                  }
                  width={426}
                  height={240}
                />
              )}
            </div>
          </div>
        </Col>
        <Col xl="6">
          <div className="mb-4">
            <h4 className="card-title card-intro-title">
              Organisation default composition
            </h4>
            <p>
              The composition will be applied to all newly added displays in the
              organization
            </p>
            <p className="font-weight-bold">
              Default Composition: Screenshot 2 - Composition
              <span
                className="btn-icon-right text-info"
                onClick={() => {
                  setDefaultCompositionShow(true);
                }}
              >
                <i className="fa fa-pencil" />
              </span>
            </p>
            {showDefaultComposition?.duration && (
              <p className="font-weight-bold">
                Duration: {showDefaultComposition?.duration} seconds
              </p>
            )}
          </div>
        </Col>
      </div>
      <DefaultCompositionModal
        close={() => setDefaultCompositionShow(false)}
        show={defaultCompositionShow}
        compositionList={compositionList}
        getVendorProfile={() => getVendorProfile()}
      />
    </>
  );
};

export default DefaultComposition;
