import React, { useEffect, useRef, useState } from "react";
import { createPlugin } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import defaultComparisonIcon from "../../../img/default-comparison-icon.png";
import {
  BASE_URL,
  getAllComposition,
  getAllMedia,
  saveSequence,
} from "../../../utils/api";
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
  const [events, setEvents] = useState({});
  const [sequence, setSequence] = useState([]);
  console.log(sequence, "top");
  //   const [mergedArray, setMergedArray] = useState(events);
  //   console.log(mergedArray, "mergedArray");
  const [eventsId, setEventsId] = useState("");
  const [renderTime, setRenderTime] = useState("");
  console.log(events, "eventsevents");
  //   console.log(resizeEvents, "resizeEvents");
  //   console.log(events, "events events");
  const history = useHistory();
  const { id, schedulename } = useParams();

  const { data: allComposition, mutate } = useSWR(
    "/vendor/layouts/compositions",
    getAllComposition
  );
  let timeFormet = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  // load external events
  useEffect(() => {
    let draggableEl = document.getElementById("external-events");
    new Draggable(draggableEl, {
      itemSelector: ".fc-event",
      eventData: function (eventEl) {
        console.log(eventEl, "eventEl eventEl");
        let id = eventEl.dataset.id;
        let sourceId = eventEl.getAttribute("sourceId");
        let title = eventEl.getAttribute("title");
        let color = "#FFE494";
        let custom = eventEl.dataset.custom;

        return {
          id: id,
          sourceId,
          title: title,
          color: color,
          custom: custom,
          create: true,
        };
      },
    });
  }, []);
  function eventFunction(info) {
    console.log(info, "info inside eventFunction");

    const newArray = events;
    const id = info.el.fcSeg.eventRange.def.sourceId;
    const newEvent = {
      id,
      timing: info.el.innerText.split("\n\n")[1],
    };
    newArray[id] = newEvent;
    setEvents(newArray);
    console.log(events, "newEvent newEvent");
  }

  // handle event receive
  const handleEventReceive = (eventInfo) => {
    console.log(eventInfo, "handleEventReceivehandleEventReceive");
    const id = eventInfo.event._def.sourceId;
    const time =
      renderTime +
      " - " +
      "0" +
      (Number(renderTime.split(":")[0]) + 1 + ":" + renderTime.split(":")[1]);
    const newEvent = {
      id: id,
      timing: time,
    };
    setEvents({ ...events, [id]: newEvent });
  };
  // handle deletion of an event

  const handleEventClick = (info) => {
    console.log(info, "sssss");

    const compositionToDelete = info.event._def.sourceId;
    const deleteTiming = events;
    delete deleteTiming[compositionToDelete];
    setEvents(deleteTiming);
    // console.log(compositionToDelete, "compositionToDelete id");
    // sequence.timings = sequence?.timings?.filter(
    //   (timing) => timing.composition !== compositionToDelete
    // );
    console.log(events, "inside delete");

    // console.log(sequence, "when remove");
    // setSequence(sequence);
    info.event.remove();
  };
  async function handleSubmit() {
    const scheduleId = id;
    const name = schedulename;
    const timing = [];

    Object.keys(events).forEach(function (key) {
      timing.push({
        composition: events[key].id,
        startTime:
          new Date().toISOString().slice(0, 10) +
          "T" +
          events[key].timing.split(" - ")[0] +
          ":00Z",
        endTime:
          new Date().toISOString().slice(0, 10) +
          "T" +
          events[key].timing.split(" - ")[1] +
          ":00Z",
      });
    });

    // events.forEach((item, i) =>
    //   timing.push({
    //     composition: item.id,
    //     startTime:
    //       new Date().toISOString().slice(0, 10) +
    //       "T" +
    //       item.timing.split(" - ")[0] +
    //       ":00Z",
    //     endTime:
    //       new Date().toISOString().slice(0, 10) +
    //       "T" +
    //       item.timing.split(" - ")[1] +
    //       ":00Z",
    //   })
    // );
    // console.log(first)
    // const timings = Object.values(events)?.map((composition) => {
    //   const startTime =
    //     new Date().toISOString().slice(0, 10) +
    //     "T" +
    //     composition.timing.split(" - ")[0] +
    //     ":00Z";
    //   const endTime =
    //     new Date().toISOString().slice(0, 10) +
    //     "T" +
    //     composition.timing.split(" - ")[1] +
    //     ":00Z";

    //   return {
    //     composition: composition.id,
    //     startTime: startTime,
    //     endTime: endTime,
    //   };
    // });

    const outputObject = {
      scheduleId: scheduleId,
      name: name,
      timings: timing,
    };

    console.log(outputObject, "yyyy");
    // setSequence(outputObject);
    // console.log(sequence, "outputObject");
    // e.preventDefault();

    // await saveSequence(sequence).then((res) => {
    //   console.log(res, "res save schedule");
    //   //   if (res.data.statusCode === 200) {
    //   //     console.log(res.data.data.name);
    //   //     history.push(`/testday/${res.data.data._id}/${res.data.data.name}`);
    //   //   }
    // });
  }
  function moveToMonth() {
    history.push("/design-month-schedule");
  }
  function renderEventContent(eventInfo) {
    const { event } = eventInfo;
    const { title } = event;

    setRenderTime(eventInfo.timeText);

    return (
      <>
        <div className={`fullcalendar-main-container`}>
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
  //   console.log(allComposition, "allComposition allComposition");
  return (
    <div className="App">
      {renderTime && (
        <div className="d-flex justify-content-end">
          <Button
            className="mr-2"
            variant="info add-screen-btn"
            onClick={() => handleSubmit()}
          >
            Save Sequence
          </Button>
        </div>
      )}

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
                      sourceId={composition._id}
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
            eventTimeFormat={timeFormet}
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
            eventResize={eventFunction}
          ></FullCalendar>
        </div>
      </div>
    </div>
  );
}
