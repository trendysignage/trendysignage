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
import deleteBtnImg from "../../../img/delete-btn.png";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const MyCustomPlugin = createPlugin({
  ...timeGridPlugin,
  ...interactionPlugin,
  // other plugin options
});

export default function TestDay() {
  const [events, setEvents] = useState([]);

  console.log(events, "events events");
  const history = useHistory();
  const { id } = useParams();
  console.log(id, "testday id");

  const { data: allComposition, mutate } = useSWR(
    "/vendor/layouts/compositions",
    getAllComposition
  );

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
    console.log(eventInfo, "handleEventReceivehandleEventReceive");

    const { id } = eventInfo.draggedEl.dataset;
    const timing = eventInfo.draggedEl.getAttribute("data-timing");
    const timeText = eventInfo.timeText; // Store eventInfo.timeText in a variable

    const newEvent = {
      id: id,
      timing: timing,
      start: eventInfo.date,
      end: eventInfo.date,
      timeText: timeText, // Include the timeText property
    };
    setEvents([...events, newEvent]);
  };
  console.log(events, "lllll");
  // handle deletion of an event

  const handleEventClick = (info) => {
    console.log(info, "sssss");
    info.event.remove();
  };
  function moveToMonth() {
    history.push("/design-month-schedule");
  }
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

          <div
            className="fullcalendar-delete-btn"
            onClick={() => handleEventClick(eventInfo)}
          >
            <img className="edit-icon cursorPointer" src={deleteBtnImg} />
          </div>
        </div>
      </>
    );
  }
  return (
    <div className="App">
      <div className="d-flex justify-content-end">
        <Button
          className="mr-2"
          variant="info add-screen-btn"
          onClick={() => moveToMonth()}
        >
          Save Sequence
        </Button>
      </div>
      <div>
        <div style={{ float: "left", width: "50%", height: "100vh" }}>
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
            droppable={true}
            eventReceive={handleEventReceive}
            slotEventOverlap={false}
            eventOverlap={false}
            eventContent={renderEventContent}
            contentHeight="700px"
            events={events}
          ></FullCalendar>
        </div>
      </div>
    </div>
  );
}
