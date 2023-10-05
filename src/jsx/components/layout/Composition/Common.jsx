import React, { useState } from "react";
import useSWR from "swr";
import { Button, Row, Col } from "react-bootstrap";
import searchIcon from "../../../../img/search.png";
import listIcon from "../../../../img/list-icon.png";
import CompositionTable from "./CompositionTable";
import ZoneInfoTable from "./ZoneInfoTable";

import {
  getAllMedia,
  getAllMediaSWR,
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
  const [zone, setZone] = useState("Zone1");

  // const [content, setContent] = useState(
  //   composition ? composition.zones[0].content : []
  // );
  const makeArray = (data) => {
    const newArray = [];
    data.forEach((item) => {
      if (item.content.length > 0) {
        item.content.forEach((item2) => {
          newArray.push({ ...item2, ["zone"]: item.name });
        });
      }
    });
    return newArray;
  };
  const makeArray2 = (data, size) => {
    const result = data.reduce(function (r, a) {
      r[a.zone] = r[a.zone] || [];
      r[a.zone].push(a);
      return r;
    }, Object.create(null));

    return result;
  };
  const makeArrayReference = (referenceUrl) => {
    const result = [];
    const Zone1 = [];
    const Zone2 = [];
    const Zone3 = [];

    referenceUrl.forEach((i) => {
      const item = i.split("**");

      if (item[1] == "Zone1") {
        Zone1.push(item[0]);
        result["Zone1"] = Zone1;
      }
      if (item[1] == "Zone2") {
        Zone2.push(item[0]);
        result["Zone2"] = Zone2;
      }
      if (item[1] == "Zone3") {
        Zone3.push(item[0]);
        result["Zone3"] = Zone3;
      }
    });

    return result;
  };
  const [content, setContent] = useState(
    composition ? makeArray(composition.zones) : []
  );
  const [referenceUrl, setReferenceUrl] = useState(
    composition ? composition.referenceUrl : []
  );
  console.log(referenceUrl, "referenceUrl");
  const handleLayout = (data) => {
    setZone(data);
  };

  const { data: allMedia, mutate } = useSWR(
    "/vendor/display/media",
    getAllMediaSWR
  );

  const history = useHistory();
  const addComposition = (media) => {
    let url = media.title;
    setContent((prev) => {
      let meta = {};

      if (media.type == "image" || media.type == "video") {
        meta = JSON.parse(media.properties);
      } else {
        const jsonData = JSON.parse(media.appData);
        url = jsonData.url;
        meta = {
          length: 10,
          height: 10,
          duration: 0,
        };
      }

      const dt = prev.find((o) => o.name === zone);
      const createContent = {
        url,
        type: media.type,
        maintainAspectRatio: false,
        fitToScreen: true,
        crop: false,
        duration: meta.length ? meta.length : 10,
        createdBy: media.createdBy.name,
        zone,
        data:media.type !='video' && media.type != 'image' ? media.appData : "",
      };
      const newdata = [...prev, { ...createContent }];
      return newdata;
    });
    setReferenceUrl((prev) => {
      return [...prev, url + "**" + zone];
    });
  };
  const saveComposition = async () => {
    console.log("referenceUrl", referenceUrl);
    const updateFiles = referenceUrl.map(async (url) => {
      if (isBlobUrl(url)) {
        const urlItem = url.split("**");
        const uri = await uploadBlob(urlItem[0]);
        return uri + "**" + urlItem[1];
      }
      return url;
    });
    const results = await Promise.all(updateFiles);

    let zones = [];
    let zoneNew = makeArray2(content, layout.zones.length);
    layout.zones.forEach((zone, index) => {
      const contentData = zoneNew[zone.name].map(({ zone, ...rest }) => {
        return rest;
      });
      zones.push({
        name: zone.name,
        zoneId: zone._id,
        //content: removeCreatedBy(index),
        content: removeCreatedBy(contentData),
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
      console.log(data)
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
  function removeCreatedBy(data) {
    return data.map((item) => {
      delete item["createdBy"];
      delete item["_id"];
      delete item["zone"];
      // if(item['type'] == 'url-apps' || item['type'] == 'youtube-apps'){
      //   item['type'] = 'app';
      // }
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
              console.log(content, "conteettttnnnnn", zone);
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
        {/* <div className="search-textfield ml-auto d-flex flex-wrap align-items-center">
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
        </div> */}
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
              layout={layout}
              handleLayout={handleLayout}
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
            contentnew={makeArray2(content, 2)}
            referenceUrl={referenceUrl}
            referenceUrlArray={makeArrayReference(referenceUrl)}
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
