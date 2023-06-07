import React, { useEffect, useRef, useState } from "react";
import { createPlugin } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import defaultComparisonIcon from "../../../img/default-comparison-icon.png";

const MyCustomPlugin = createPlugin({
  ...timeGridPlugin,
  ...interactionPlugin,
  // other plugin options
});

export default function CopyTestDay() {
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
    // calendarEvents: [
    //     {
    //         id: 1,
    //         title: "All-day event",
    //         color: "#388e3c",
    //         start: "2020-12-12",
    //         end: "2020-12-12",
    //         custom: "questo è un campo custom"
    //     },
    //     {
    //         id: 2,
    //         title: "Timed event",
    //         color: "#0097a7",
    //         start: "2020-12-07",
    //         end: "2020-12-10",
    //         custom: "custom stuff"
    //     }
    // ].map((event) => ({
    //     ...event,
    //     showDeleteButton: true,
    //     extendedProps: {
    //         ...event.extendedProps,
    //         imageUrl: defaultComparisonIcon, // Add the image URL here
    //     },
    // }))
  });

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

    // setState((prevState) => ({
    //     ...prevState,
    //     calendarEvents: prevState.calendarEvents.concat(newEvent)
    // }));
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
    console.log(eventInfo.timeText, "ooooo");
    return (
      <>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            height: "-webkit-fill-available",
          }}
        >
          <img
            src={event.extendedProps.custom}
            className="day-schedule-fullcelender-img"
            alt="Event"
          />
          <p className="m-0 fullcalender-title">{title}</p>
          <p className="m-0 fullcalender-time">{eventInfo.timeText}</p>

          <h5 className="m-0" onClick={() => handleEventClick(eventInfo)}>
            de
          </h5>
        </div>
      </>
    );
  }
  useEffect(() => {
    const calendarEl = document.getElementById("fullCalendar-table");
    if (calendarEl) {
      calendarEl.style.backgroundColor = "#fff"; // Set your desired background color here
    }
  }, []);
  useEffect(() => {
    const calendarContainer = document.querySelector(".fullcalendar-container");
    if (calendarContainer) {
      calendarContainer.style.backgroundColor = "#f0f0f0"; // Set the desired background color here
    }
  }, []);
  return (
    <div className="App">
      <div style={{ float: "left", width: "25%" }}>
        <div id="external-events">
          {state.externalEvents.map((event) => (
            <div
              className="fc-event fc-h-event mb-1 fc-daygrid-event fc-daygrid-block-event p-2"
              title={event.title}
              data-id={event.id}
              data-color={event.color}
              data-custom={event.custom}
              key={event.id}
              style={{
                backgroundColor: event.color,
                borderColor: event.color,
                cursor: "pointer"
              }}
            >
              <div className="fc-event-main">
                <div>
                  <strong>{event.title}</strong>
                </div>
                <img src={event.custom} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ float: "left", width: "75%" }}>
        <FullCalendar
            id="fullCalendar-table"
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          // headerToolbar={{
          //     left: "",
          //     center: "",
          //     right: ""
          // }}
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
          // events={state.calendarEvents}
          droppable={true}
          eventReceive={handleEventReceive}
          slotEventOverlap={false}
          eventOverlap={false}
          // select={handleSelect}
          // eventClick={handleEventClick}
          // eventRender={handleEventRender}
          eventContent={renderEventContent}
         
        ></FullCalendar>
      </div>
    </div>
  );
}
