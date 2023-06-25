import React, { useState } from "react";
import { Table } from "react-bootstrap";

import editBtnImg from "../../../../img/edit-btn.png";
import deleteBtnImg from "../../../../img/delete-btn.png";
import { BASE_URL } from "../../../../utils/api";
import EditSelectedComposition from "../../../modals/editSelectedComposition";

const ZoneInfoTable = ({
  content,
  setContent,
  setReferenceUrl,
  layout,
  handleLayout,
}) => {
  const [editSelected, setEditSelected] = useState(null);
  const [selectedZone, setSelectedZone] = useState("Zone1");
  const [activeClass, setActiveClass] = useState(false);
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(null);

  const handleChange = (event, index) => {
    const newValue = event.target.value.replace(/[^\d]/g, "");
    setContent((prev) => {
      const updateMedia = prev.map((val, key) => {
        if (key === index) {
          val.duration = newValue;
        }
        return val;
      });
      return [...updateMedia];
    });
  };
  const makeZoneColor = (zones) => {
    const data = {};
    zones.forEach((item, index) => {
      data[item.name] = index == 0 ? true : false;
    });
    return data;
  };
  const [zoneColor, setZoneColor] = useState(makeZoneColor(layout.zones));

  const handleZoneButton = (zone1) => {
    setZoneColor({ ...zoneColor, [selectedZone]: false, [zone1]: true });
    setSelectedZone(zone1);
    handleLayout(zone1);
  };

  const Duration = (composition, index) => {
    return (
      <div className="tag-container mediaDUrationTag">
        {" "}
        <input
          onChange={(event) => {
            handleChange(event, index);
          }}
          value={Number(composition.duration).toFixed(0)}
          disabled={composition.type === "video"}
        />
        <span>sec</span>
      </div>
    );
  };
  const TotalDuration = () => {
    let total = 0;
    content.forEach((composition) => {
      total += Number(composition.duration);
    });
    return total.toFixed(0);
  };

  const removeComposition = (index) => {
    setContent((prev) => {
      const updateMedia = prev.filter((val, key) => key !== index);
      return [...updateMedia];
    });

    setReferenceUrl((prev) => {
      const updateUrl = prev.filter((val, key) => key !== index);
      return [...updateUrl];
    });
  };

  const editComposition = (index) => {
    setEditSelected(index);
  };

  const updateViewType = (data, viewImage, ImgUrl) => {
    setContent((prev) => {
      const updateMedia = prev.map((val, key) => {
        if (key === editSelected) {
          val.fitToScreen = viewImage === "fitScreen";
          val.maintainAspectRatio = viewImage === "aspectRation";
          val.crop = viewImage === "crop" ? true : false;
        }
        return val;
      });
      return [...updateMedia];
    });

    setReferenceUrl((prev) => {
      const updateMedia = prev.map((val, key) => {
        if (key === editSelected) {
          return ImgUrl+"**"+selectedZone;
        } else {
          return val;
        }
      });
      return [...updateMedia];
    });
  };

  const handleButtonClick = (index) => {
    setSelectedButtonIndex(index);
    // Perform any other logic specific to the clicked button
  };

  return (
    <>
      <Table
        responsive
        className="custom-table screen-table layout-table h-100"
      >
        <thead>
          <tr>
            <th colSpan={4}>
              <span className="d-flex flex-wrap">
                {layout && (layout.title === 'Single Zone Potrait' || layout.title === 'Two Zone Potrait') ?
                    <span
                      className={`yellow-box-portrait ${layout.title}`}
                      style={{
                        backgroundColor:
                          layout &&
                          (layout.zones.length == 2
                            ? "#fff"
                            : "#ffc12b"),
                      }}
                    >
                      {layout && layout.zones.length == 2 ? (
                        <>
                          <div
                            className="zone-layout2"
                            style={{
                              backgroundColor: zoneColor["Zone1"] ? "#ffc12b" : "",
                            }}
                          ></div>
                          <div
                            className="zone-layout22"
                            style={{
                              backgroundColor: zoneColor["Zone2"] ? "#ffc12b" : "",
                            }}
                          ></div>
                        </>
                      ) : (
                        <></>
                      )}
                    </span> : 
                    <span
                      className={`yellow-box ${layout.title}`}
                      style={{
                        backgroundColor:
                          layout &&
                          (layout.zones.length == 2 || layout.zones.length == 3
                            ? "#fff"
                            : "#ffc12b"),
                      }}
                    >
                      {layout && layout.zones.length == 2 ? (
                        <>
                          <div
                            className="zone-layout2"
                            style={{
                              backgroundColor: zoneColor["Zone1"] ? "#ffc12b" : "",
                            }}
                          ></div>
                          <div
                            className="zone-layout22"
                            style={{
                              backgroundColor: zoneColor["Zone2"] ? "#ffc12b" : "",
                            }}
                          ></div>
                        </>
                      ) : (
                        <></>
                      )}
                      {layout && layout.zones.length == 3 ? (
                        <>
                          <div
                            className="zone-layout31"
                            style={{
                              backgroundColor: zoneColor["Zone1"] ? "#ffc12b" : "",
                            }}
                          ></div>
                          <div
                            className="zone-layout32"
                            style={{
                              backgroundColor: zoneColor["Zone2"] ? "#ffc12b" : "",
                            }}
                          ></div>
                          <div
                            className="zone-layout33"
                            style={{
                              backgroundColor: zoneColor["Zone3"] ? "#ffc12b" : "",
                            }}
                          ></div>
                        </>
                      ) : (
                        <></>
                      )}
                    </span>
                    }
                
                {layout &&
                  layout.zones.map((item, i) => {
                    return (
                      <button
                        key={i}
                        onClick={() => {
                          handleZoneButton(item.name);
                          handleButtonClick(i);
                          // setActiveClass(true);
                        }}
                        // className="zone"
                        // className={activeClass ? "zone zone-active " : "zone"}
                        className={
                          selectedButtonIndex === i
                            ? "zone zone-active "
                            : "zone"
                        }
                      >
                        {item.name}
                      </button>
                    );
                  })}
                <span className="duration">
                  Duration : {TotalDuration()} sec
                </span>
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {content.map((composition, index) => {
            return composition.zone == selectedZone ? (
              <tr key={composition.id}>
                <td>{index + 1}.</td>
                <td>
                  <span className="td-content d-flex name-td-content">
                    <span
                      className={`name-img mr-2  ${
                        composition.type === "video" && "videotableName"
                      }`}
                    >
                      {composition.type === "image" && (
                        <img
                          className="media-img img-fluid"
                          src={`${BASE_URL}${composition.url}`}
                          alt="media-img"
                        />
                      )}
                      {composition.type === "video" &&
                        composition.duration.toFixed(0) / 60}
                    </span>
                    <span className="name-content d-flex flex-column flex-grow-1">
                      <strong>
                        {
                          composition.url.split("/")[
                            composition.url.split("/").length - 1
                          ]
                        }
                      </strong>
                      <span>{composition.createdBy}</span>
                    </span>
                  </span>
                </td>
                <td style={{ width: "180px" }}>
                  {Duration(composition, index)}
                </td>
                <td>
                  <span className="layout-edit-btn mr-2 ">
                    <img
                      className="edit-icon cursorPointer"
                      src={editBtnImg}
                      alt="search"
                      onClick={() => {
                        // if(composition.type === "image"){
                        editComposition(index);
                        // }
                      }}
                    />
                  </span>
                  <span
                    className="layout-edit-btn"
                    onClick={() => {
                      removeComposition(index);
                    }}
                  >
                    <img
                      className="edit-icon cursorPointer"
                      src={deleteBtnImg}
                      alt="search"
                    />
                  </span>
                </td>
              </tr>
            ) : (
              <></>
            );
          })}
        </tbody>
      </Table>

      {editSelected !== null && (
        <EditSelectedComposition
          composition={content[editSelected]}
          setEditSelected={setEditSelected}
          updateViewType={updateViewType}
        />
      )}
    </>
  );
};

export default ZoneInfoTable;
