import React, { useState } from "react";
import useSWR from "swr";
import { Button, Row, Col } from "react-bootstrap";
import searchIcon from "../../../../img/search.png";
import listIcon from "../../../../img/list-icon.png";
import CompositionTable from "./CompositionTable";
import ZoneInfoTable from "./ZoneInfoTable";

import {
  getAllMedia,
  postComposition,
  putComposition,
  uploadBlob,
} from "../../../../utils/api";

import PreviewComposition from "../../../modals/previewComposition";
import { useHistory } from "react-router-dom";
import SaveCompositionName from "../../../modals/saveCompositionName";
import UploadMediaModal from "../../../modals/UploadMediaFileModal";
import { isBlobUrl } from "../../../../utils/UtilsService";
const CommonComposition = ({ type, composition, layout }) => {
  const [showUploadMediaModal, setUploadMediaModal] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [name, setName] = useState(composition ? composition.name : "");
  const [namePopUp, setOpenNamePopUp] = useState(false);
  const [content, setContent] = useState(
    composition ? composition.zones[0].content : []
  );
  const [referenceUrl, setReferenceUrl] = useState(
    composition ? composition.referenceUrl : []
  );

  const { data: allMedia, mutate } = useSWR(
    "/vendor/display/media",
    getAllMedia
  );

  const history = useHistory();
  const addComposition = (media) => {
    setContent((prev) => {
      const meta = JSON.parse(media.properties);
      const createContent = {
        url: `${media.title}`,
        type: media.type,
        maintainAspectRatio: false,
        fitToScreen: true,
        crop: false,
        duration: meta.length ? meta.length : 10,
        createdBy: media.createdBy.name,
      };
      return [...prev, { ...createContent }];
    });

    setReferenceUrl((prev) => {
      return [...prev, media.title];
    });
  };
  const saveComposition = async () => {
    const updateFiles = referenceUrl.map(async (url) => {
      if (isBlobUrl(url)) {
        return await uploadBlob(url);
      }
      return url;
    });
    const results = await Promise.all(updateFiles);

    let zones = [];
    layout.zones.forEach((zone, index) => {
      zones.push({
        name: zone.name,
        zoneId: zone._id,
        content: removeCreatedBy(index),
      });
    });
    const data = {
      name: name,
      zones: zones,
      duration: TotalDuration(),
      referenceUrl: results,
    };
    if (type === "create") {
      data.layoutId = layout._id;
      await postComposition(data);
    } else {
      data.compositionId = composition._id;
      await putComposition(data);
    }
    history.push("/layout");
  };
  const TotalDuration = () => {
    let total = 0;
    content.forEach((composition) => {
      total += Number(composition.duration);
    });
    return total.toFixed(0);
  };
  function removeCreatedBy() {
    return content.map((item) => {
      delete item["createdBy"];
      delete item["_id"];
      return item;
    });
  }
  return (
    <>
      <div className="custom-content-heading d-flex flex-wrap">
        <h1 className="mr-auto">
          {type === "edit" ? "Edit Compostition" : "Create Compostition"}
        </h1>
        <div className="preview-composition d-flex flex-wrap">
          <Button
            onClick={() => {
              if (content.length) {
                setShowPreview(true);
              }
            }}
            className="mr-2 preview-btn"
            variant="info"
            disabled={!content.length}
          >
            Preview
          </Button>
          <Button
            onClick={() => {
              if (content.length) {
                setOpenNamePopUp(true);
              }
            }}
            className="save-composition-btn"
            variant="info"
          >
            Save Composition
          </Button>
        </div>
      </div>

      <div className="form-head d-flex mb-3 align-items-start">
        <Button
          className="mr-2"
          variant="info add-screen-btn"
          onClick={() => {
            setUploadMediaModal(true);
          }}
        >
          Add Media
          <span className="btn-icon-right">
            <div class="glyph-icon flaticon-381-add-1"></div>
          </span>
        </Button>
        <div className="search-textfield ml-auto d-flex flex-wrap align-items-center">
          <div className="form-group mb-0">
            <input
              type="text"
              className="form-control input-default "
              placeholder="Search..."
            />
            <img className="search-icon" src={searchIcon} alt="search" />
          </div>
          <Button className="ml-2 icon-btn" variant="primary">
            <img className="icon-icon" src={listIcon} alt="list-icon" />
          </Button>
        </div>
      </div>
      <div className="custom-comp-table flex-1 editComposition">
        <Row className="h-100">
          <Col lg="6" md="6" sm="6" xs="12" className="pr-0 border-col">
            <CompositionTable
              allMedia={allMedia}
              addComposition={addComposition}
            />
          </Col>
          <Col lg="6" md="6" sm="6" xs="12" className="pl-0">
            <ZoneInfoTable
              content={content}
              setContent={setContent}
              setReferenceUrl={setReferenceUrl}
            />
          </Col>
        </Row>
        <UploadMediaModal
          showUploadMediaModal={showUploadMediaModal}
          setUploadMediaModal={setUploadMediaModal}
          callAllMediaApi={mutate}
        />
        {showPreview && (
          <PreviewComposition
            setShowPreview={setShowPreview}
            content={content}
            referenceUrl={referenceUrl}
            layout={layout}
          />
        )}
        {namePopUp && (
          <SaveCompositionName
            setModalState={setOpenNamePopUp}
            saveComposition={saveComposition}
            name={name}
            setName={setName}
          />
        )}
      </div>
    </>
  );
};

export default CommonComposition;
