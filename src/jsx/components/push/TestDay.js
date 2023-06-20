import React, { useEffect, useRef, useState } from "react";
import { createPlugin } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import defaultComparisonIcon from "../../../img/default-comparison-icon.png";
import { BASE_URL, getAllComposition, getAllMedia } from "../../../utils/api";
import {
  getDatetimeIn12Hours,
  humanReadableFormattedDateString,
} from "../../../utils/UtilsService";
import useSWR from "swr";
import { Table, Dropdown } from "react-bootstrap";
import downArrow from "../../../img/down-arrow.png";
import { useParams, useHistory } from "react-router-dom";

const MyCustomPlugin = createPlugin({
  ...timeGridPlugin,
  ...interactionPlugin,
  // other plugin options
});

export default function TestDay() {
  const history = useHistory();
  const { id } = useParams();
  console.log(id, "testday id");
  const { data: allMedia, mutate } = useSWR(
    "/vendor/display/media",
    getAllMedia
  );
  const { data: allComposition, mutatej } = useSWR(
    "/vendor/layouts/compositions",
    getAllComposition
  );
  console.log(allComposition, "compotision");

  // initial state

  const [state, setState] = useState({
    weekendsVisible: true,
    externalEvents: [
      {
        title: "Art 1",
        color: "#0097a7",
        id: 34432,
        custom: defaultComparisonIcon,
      },
      {
        title: "Art 2",
        color: "#f44336",
        id: 323232,

        custom: defaultComparisonIcon,
      },
      {
        title: "Art 3",
        color: "#f57f17",
        id: 1111,

        custom: defaultComparisonIcon,
      },
      {
        title: "Art 4",
        color: "#90a4ae",
        id: 432432,

        custom: defaultComparisonIcon,
      },
    ],
  });
  // const [getMedia, setGetMedia] = useState(allMedia);
  const [composition, setComposition] = useState(allComposition);
  const parseMeta = (media) => {
    const meta = JSON.parse(media.properties);
    return (
      <span className="td-content">
        {media?.type === "image" && (
          <strong>
            {meta?.height} x {meta?.width}
          </strong>
        )}
        {media?.type === "video" && meta?.length && (
          <strong>{(meta.length / 60).toFixed(0)} Sec</strong>
        )}
        {meta?.size && <span>{meta.size} MB</span>}
      </span>
    );
  };
  const videoMetaDuration = (media) => {
    const properties = JSON.parse(media?.properties);
    if (properties && properties.length) {
      return (properties.length.toFixed(0) / 60).toFixed(0);
    }
    return null;
  };
  // load external events
  useEffect(() => {
    let draggableEl = document.getElementById("external-events");
    new Draggable(draggableEl, {
      itemSelector: ".fc-event",
      eventData: function (eventEl) {
        let id = eventEl.dataset.id;
        let title = eventEl.getAttribute("title");
        let color = "#FFE494";
        let custom = eventEl.dataset.custom;

        return {
          id: id,
          title: title,
          color: color,
          custom: custom,
          create: true,
        };
      },
    });
  }, []);

  // handle event receive
  const handleEventReceive = (eventInfo) => {
    const newEvent = {
      id: eventInfo.draggedEl.getAttribute("data-id"),
      title: eventInfo.draggedEl.getAttribute("title"),
      color: eventInfo.draggedEl.getAttribute("data-color"),
      start: eventInfo.date,
      end: eventInfo.date,
      custom: eventInfo.draggedEl.getAttribute("data-custom"),
      showDeleteButton: true,
    };
  };

  // handle deletion of an event

  const handleEventClick = (info) => {
    console.log(info, "sssss");
    info.event.remove();
  };

  function renderEventContent(eventInfo) {
    console.log(eventInfo, "eventInfo inside renderEventContent");
    const { event } = eventInfo;
    const { title, timeText } = event;
    return (
      <>
        <div className="fullcalendar-main-container">
          <img
            src={event.extendedProps.custom}
            className="day-schedule-fullcalendar-img"
            alt="Event"
          />
          <p className="m-0 fullcalendar-title">{title}</p>
          <p className="fullcalendar-time">{eventInfo.timeText}</p>

          <h5
            className="fullcalendar-delete-btn"
            onClick={() => handleEventClick(eventInfo)}
          >
            de
          </h5>
        </div>
      </>
    );
  }
  return (
    <div className="App">
      <div style={{ float: "left", width: "50%", height: "100vh" }}>
        {/* <Table
                    responsive
                    className="custom-table"
                    id="external-events"
                    style={{ height: "100%" }}
                >
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Uploaded Date</th>
                            <th>Properties</th>
                            <th>Tags</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allMedia?.map((media) => {
                            return (
                                <tr
                                    key={media._id}
                                    className="fc-event fc-h-event  fc-daygrid-event fc-daygrid-block-event "
                                    title={media.title}
                                    data-id={media.id}
                                    // data-color={"yellow"}
                                    data-custom={`${BASE_URL}${media.title}`}
                                    style={{
                                        backgroundColor: "#fff",
                                        // borderColor: "blue",
                                        cursor: "pointer",
                                    }}
                                >
                                    <td>
                                        <span className="td-content d-flex name-td-content">
                                            <span
                                                className={`name-img mr-2  ${media.type === "video" && "videotableName"
                                                    }`}
                                            >
                                                {media.type === "image" && (
                                                    <img
                                                        className="media-img img-fluid"
                                                        src={`${BASE_URL}${media.title}`}
                                                        alt="media-img"
                                                    />
                                                )}
                                                {media.type === "video" && videoMetaDuration(media)}
                                            </span>
                                            <span className="name-content d-flex flex-column flex-grow-1">
                                                <strong>
                                                    {
                                                        media.title.split("/")[
                                                        media.title.split("/").length - 1
                                                        ]
                                                    }
                                                </strong>
                                                <span>{media.createdBy.name}</span>
                                            </span>
                                        </span>
                                    </td>
                                    <td>
                                        {media.type.slice(0, 1).toUpperCase() + media.type.slice(1)}
                                    </td>
                                    <td>
                                        <span className="td-content">
                                            <strong>
                                                {humanReadableFormattedDateString(media.createdAt)}
                                            </strong>
                                            <span>{getDatetimeIn12Hours(media.createdAt)}</span>
                                        </span>
                                    </td>
                                    <td>{parseMeta(media)}</td>
                                    <td>
                                        {media.tags.map((tag) => {
                                            return (
                                                <span className="my-phone-tag text-truncate ml-1">
                                                    {tag}
                                                </span>
                                            );
                                        })}
                                        <span
                                            className="down-arrow"
                                        // onClick={() => {
                                        //     setSelectedMedia(media)
                                        //     setNewTagModal(true);
                                        // }}
                                        >
                                            <img
                                                className="down-arrow-img img-fluid"
                                                src={downArrow}
                                                alt="arrow"
                                            />
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table> */}

        <Table
          responsive
          className="custom-table screen-table"
          style={{ height: "100%" }}
          id="external-events"
        >
          <thead>
            <tr>
              <th>Composition</th>
              <th>Date Added</th>
              <th>Duration</th>
              <th>Associated Schedule</th>
              <th>Tags</th>
            </tr>
          </thead>

          <tbody>
            {allComposition &&
              allComposition.map((composition) => {
                const content = composition.zones[0].content[0];
                return (
                  <tr
                    key={composition._id}
                    className="fc-event  fc-daygrid-event fc-daygrid-block-event "
                    title={composition.name}
                    data-id={composition._id}
                    // data-color={"yellow"}
                    data-custom={`${BASE_URL}${content.url}`}
                    style={{
                      backgroundColor: "#fff",
                      // borderColor: "blue",
                      cursor: "pointer",
                    }}
                    // id={composition._id}
                  >
                    <td>
                      <span className="td-content d-flex name-td-content">
                        <span
                          className={`name-img mr-2  ${
                            content.type === "video" && "videotableName"
                          }`}
                        >
                          {content.type === "image" && (
                            <img
                              className="media-img img-fluid"
                              src={`${BASE_URL}${content.url}`}
                              alt="media-img"
                            />
                          )}
                          {content.type === "video" &&
                            content.duration.toFixed(0) / 60}
                        </span>
                        <span className="name-content d-flex flex-column flex-grow-1">
                          <strong>{composition.name}</strong>
                          <span>{composition.createdBy}</span>
                        </span>
                      </span>
                    </td>
                    <td>
                      <span className="td-content">
                        <strong>
                          {humanReadableFormattedDateString(
                            composition.createdAt
                          )}
                        </strong>
                        <span>
                          {getDatetimeIn12Hours(composition.createdAt)}
                        </span>
                      </span>
                    </td>
                    <td> {composition.duration} Sec</td>
                    <td>No Schedule</td>
                    <td style={{ width: "180px" }}>
                      <span className="tag-container">
                        {composition.tags &&
                          composition.tags.map((tag) => {
                            return (
                              <span className="my-phone-tag text-truncate ml-1 mr-1 mb-1">
                                {tag}
                              </span>
                            );
                          })}
                      </span>

                      <span
                        className="down-arrow"
                        // onClick={() => {
                        //     setSelected(composition);
                        //     setNewTagModal(true);
                        // }}
                      >
                        <img
                          className="down-arrow-img img-fluid"
                          src={downArrow}
                          alt="arrow"
                        />
                      </span>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>

      <div style={{ float: "left", width: "50%" }}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={false}
          initialView="timeGridDay"
          slotDuration="00:10:00"
          slotLabelInterval={{ hours: 1 }}
          allDaySlot={false}
          editable={true}
          selectable={false}
          selectMirror={true}
          dayMaxEvents={false}
          weekends={state.weekendsVisible}
          droppable={true}
          eventReceive={handleEventReceive}
          slotEventOverlap={false}
          eventOverlap={false}
          eventContent={renderEventContent}
          contentHeight="700px"
        ></FullCalendar>
      </div>
    </div>
  );
}
