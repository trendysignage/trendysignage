import React, { useEffect, useRef, useState } from "react";
import { createPlugin } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import { toast } from "react-toastify";
import {
  BASE_URL,
  getAllComposition,
  getAllMedia,
  saveSequence,
  getAllDaySequence,
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
  const [events, setEvents] = useState([]);
  const [def, setDef] = useState([]);
  const [sequence, setSequence] = useState([]);
  const [renderTime, setRenderTime] = useState("");
  const history = useHistory();
  const { id, schedulename } = useParams();
  const [sqName, setSqName] = useState("");
  const [dragDef, setDragDef] = useState(null);

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
        let id = eventEl.dataset.id;
        let sourceId = eventEl.getAttribute("sourceId");
        let publicId = eventEl.getAttribute("publicId");
        let title = eventEl.getAttribute("title");
        let color = "#FFE494";
        let custom = eventEl.dataset.custom;

        return {
          id: id,
          sourceId,
          publicId,
          title: title,
          color: color,
          custom: custom,
          create: true,
        };
      },
    });
  }, []);

  const eventFunction = (info) => {
    //const newArray = events;
    const id = info.el.fcSeg.eventRange.def.sourceId;
    const defId = info.event._def.defId;
    let newArr = events.map((item, i) => {
      if (item.defId == defId) {
        return {
          ...item,
          ["timing"]: info.el.innerText.split("\n\n")[1],
          ["startTime"]: info.el.innerText.split("\n\n")[1].split(" - ")[0],
          ["endTime"]: info.el.innerText.split("\n\n")[1].split(" - ")[1],
        };
      } else {
        return item;
      }
    });
    setEvents(newArr);
  };
  // handle event receive

  const handleEventReceive = (eventInfo) => {
    console.log("handleEventR", renderTime);
    const id = eventInfo.event._def.sourceId;
    const [startTime, endTime] = renderTime.split(" - ");
    const formattedStartTime = startTime.padStart(5, "0");
    const formattedEndTime =
      endTime.length === 5 ? endTime : endTime.padStart(5, "0");
    const timeRange = `${formattedStartTime} - ${formattedEndTime}`;
    const checkedItem = events.find((item) => {
      return item.id == eventInfo.event._def.sourceId;
    });
    if (checkedItem) {
      const newArr = events.map((item, i) => {
        console.log("Foundaaaaa", item.id, dragDef, item.timing, renderTime);
        if (item.id == dragDef && item.timing !== renderTime) {
          console.log("Found", item.id, dragDef, item.timing, renderTime);
          return {
            ...item,
            ["timing"]: renderTime,
            ["startTime"]: renderTime.split(" - ")[0],
            ["endTime"]: renderTime.split(" - ")[1],
          };
        } else {
          return item;
        }
      });
      setEvents(newArr);
    } else {
      const newEvent = {
        id: id,
        timing: timeRange,
        defId: eventInfo.event._def.defId,
      };
      setEvents((events) => [...events, newEvent]);
      setDef({ ...def, [eventInfo.event._def.defId]: true });
    }

    setDragDef(null);
  };

  const handleEventClick = (info) => {
    const defId =
      info.event._def.extendedProps.defId != undefined
        ? info.event._def.extendedProps.defId
        : info.event._def.defId;
    setEvents((current) => current.filter((event) => event.defId !== defId));
    info.event.remove();
  };

  const eventDragStartFunc = (info) => {
    console.log("Event Start", info, info.event._def.sourceId);
    setDragDef(info.event._def.sourceId);
  };

  const eventDropStopFunc = (info) => {
    console.log("dfghjrtyu", info);
  };

  const eventDropFunc = (info) => {
    console.log("Dropping Func", info, dragDef, events);
    let newArr = events.map((item, i) => {
      if (item.id == info.event._def.sourceId) {
        if (item.startTime && item.endTime) {
          // console.log("time",info.el.innerText.split("\n\n")[1])
          return {
            ...item,
            ["timing"]: info.el.innerText.split("\n\n")[1],
            ["startTime"]: info.el.innerText.split("\n\n")[1].split(" - ")[0],
            ["endTime"]: info.el.innerText.split("\n\n")[1].split(" - ")[1],
          };
        } else {
          return { ...item, ["timing"]: info.el.innerText.split("\n\n")[1] };
        }
      } else {
        return item;
      }
    });
    setEvents(newArr);
  };

  const renderEventContent = (eventInfo) => {
    console.log("eventInfo", eventInfo);
    const { event } = eventInfo;
    const { title } = event;
    const checkTime = eventInfo.timeText.split(" - ");
    if (!checkTime[1]) {
      const secondTime =
        parseInt(checkTime[0].split(":")[0]) +
        1 +
        ":" +
        checkTime[0].split(":")[1];
      eventInfo.timeText = checkTime[0] + " - " + secondTime;
    }
    if (event._def.extendedProps.defId != undefined) {
      if (!def[eventInfo.event._def.extendedProps.defId]) {
        console.log("Hii");
        setRenderTime(eventInfo.timeText);
      }
    } else {
      if (!def[eventInfo.event._def.defId]) {
        console.log("Byee");
        setRenderTime(eventInfo.timeText);
      }
    }
    console.log(dragDef && eventInfo.event._def.sourceId);
    // if(dragDef && eventInfo.event._def.sourceId == dragDef){
    //   console.log("event Dragging");
    //   setRenderTime(eventInfo.timeText);
    // }

    return (
      <>
        <div
          className={`fullcalendar-main-container`}
          style={{ width: "100%" }}
        >
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
  };
  const checkTime = (time) => {
    const timeSplit = time.split(":");
    return String(timeSplit[0]).padStart(2, "0") + ":" + timeSplit[1];
  };
  async function handleSubmit(e) {
    e.preventDefault();
    const scheduleId = id;
    const timings = events.map((item) => {
      return {
        composition: item.id,
        startTime:
          new Date().toISOString().slice(0, 10) +
          "T" +
          checkTime(item.timing.split(" - ")[0]) +
          ":00Z",
        endTime:
          new Date().toISOString().slice(0, 10) +
          "T" +
          checkTime(item.timing.split(" - ")[1]) +
          ":00Z",
      };
    });
    if (!sqName) {
      toast.error("Please enter sequence name", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      return false;
    }
    if (!id) {
      toast.error("something went wrong", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      return false;
    }
    const payload = {
      scheduleId: scheduleId,
      name: sqName,
      timings,
    };
    await saveSequence(payload).then((res) => {
      console.log(res, "res save schedule");
      if (res.data.statusCode === 200) {
        history.push(`/design-month-schedule/${id}`);
      }
    });
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div className="d-flex justify-content-between align-items-center">
          <input
            type="text"
            className=" schedule-name-input-feild form-control input-default "
            placeholder="Schedule Name"
            value={sqName}
            onChange={(e) => setSqName(e.target.value)}
            required
          />
          {/* {renderTime && ( */}
          <div className="d-flex justify-content-end">
            <Button
              className="mr-2"
              type="submit"
              variant="info add-screen-btn"
              // onClick={(e) => handleSubmit(e)}
            >
              Save Sequence
            </Button>
          </div>
          {/* )} */}
        </div>
      </form>

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
            fixedMirrorParent={true}
            slotEventOverlap={false}
            slotLabelInterval={{ hours: 1 }}
            allDaySlot={false}
            eventTimeFormat={timeFormet}
            editable={true}
            selectable={false}
            selectMirror={false}
            dayMaxEvents={false}
            droppable={true}
            eventReceive={handleEventReceive}
            eventAdd={(arg) => {
              console.log("add", arg);
            }}
            eventOverlap={false}
            eventContent={renderEventContent}
            contentHeight="700px"
            events={events}
            eventResize={eventFunction}
            eventDragStart={eventDragStartFunc}
            eventDragStop={eventDropStopFunc}
            eventDrop={eventDropFunc}
          ></FullCalendar>
        </div>
      </div>
    </div>
  );
}
