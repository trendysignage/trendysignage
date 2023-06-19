// import React, { useEffect, useState } from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin, { Draggable } from "@fullcalendar/interaction";

// export default function CopyMonthSchedule() {
//   // initial state
//   const [selectedEvent, setSelectedEvent] = useState(null);
// const [assignedDates, setAssignedDates] = useState([]);
// const [selectedDate, setSelectedDate] = useState(null);

//   const [state, setState] = useState({
//     weekendsVisible: true,
//     externalEvents: [
//       { title: "Art 1", color: "#0097a7", id: 34432, custom: "fdsfdsfds" },
//       { title: "Art 2", color: "#f44336", id: 323232 },
//       { title: "Art 3", color: "#f57f17", id: 1111 },
//       { title: "Art 4", color: "#90a4ae", id: 432432 }
//     ],
//     calendarEvents: [
//       {
//         id: 1,
//         title: "All-day event",
//         color: "#388e3c",
//         start: "2020-12-12",
//         end: "2020-12-12",
//         custom: "questo è un campo custom"
//       },
//       {
//         id: 2,
//         title: "Timed event",
//         color: "#0097a7",
//         start: "2020-12-07",
//         end: "2020-12-10",
//         custom: "custom stuff"
//       }
//     ]
//   });

//   // load external events
//   useEffect(() => {
//     let draggableEl = document.getElementById("external-events");
//     new Draggable(draggableEl, {
//       itemSelector: ".fc-event",
//       eventData: function (eventEl) {
//         let id = eventEl.dataset.id;
//         let title = eventEl.getAttribute("title");
//         let color = eventEl.dataset.color;
//         let custom = eventEl.dataset.custom;

//         return {
//           id: id,
//           title: title,
//           color: color,
//           custom: custom,
//           create: true
//         };
//       }
//     });
//   });

//   // add external events
//   const addEvent = () => {
//     let newEvent = {
//       id: 3433,
//       title: "Timed event",
//       color: "#333333",
//       start: "2020-12-31",
//       end: "2020-12-31",
//       custom: "custom stuff"
//     };

//     setState((state) => {
//       return {
//         ...state,
//         externalEvents: state.externalEvents.concat(newEvent)
//       };
//     });
//   };

//   // handle event receive
//   const handleEventReceive = (eventInfo) => {
//     const newEvent = {
//       id: eventInfo.draggedEl.getAttribute("data-id"),
//       title: eventInfo.draggedEl.getAttribute("title"),
//       color: eventInfo.draggedEl.getAttribute("data-color"),
//       start: eventInfo.date,
//       end: eventInfo.date,
//       custom: eventInfo.draggedEl.getAttribute("data-custom")
//     };

//     setSelectedEvent(null);

//     setState((state) => ({
//       ...state,
//       calendarEvents: state.calendarEvents.concat(newEvent)
//     }));
//   };
// //   const handleExternalEventClick = (event) => {
// //     const eventId = event.currentTarget.getAttribute("data-id");
// //     const eventTitle = event.currentTarget.getAttribute("title");
// //     const eventColor = event.currentTarget.getAttribute("data-color");
// //     const eventCustom = event.currentTarget.getAttribute("data-custom");

// //     if (selectedEvent && selectedEvent.id === eventId) {
// //       // Uncheck the selected event
// //       setSelectedEvent(null);
// //       setAssignedDates([]);
// //     } else {
// //       // Check a new event
// //       setSelectedEvent({
// //         id: eventId,
// //         title: eventTitle,
// //         color: eventColor,
// //         custom: eventCustom
// //       });
// //       setAssignedDates(
// //         state.calendarEvents
// //           .filter((event) => event.title === eventTitle)
// //           .map((event) => event.start)
// //       );
// //     }
// //   };

//   const handleExternalEventClick = (event) => {
//     const eventId = event.currentTarget.getAttribute("data-id");
//     const eventTitle = event.currentTarget.getAttribute("title");
//     const eventColor = event.currentTarget.getAttribute("data-color");
//     const eventCustom = event.currentTarget.getAttribute("data-custom");

//     if (selectedEvent && selectedEvent.id === eventId && selectedDate) {
//       // Uncheck the selected event and clear the selected date
//       setSelectedEvent(null);
//       setSelectedDate(null);
//     } else {
//       // Check a new event and set the selected date to the current date
//       setSelectedEvent({
//         id: eventId,
//         title: eventTitle,
//         color: eventColor,
//         custom: eventCustom
//       });
//       setSelectedDate(new Date());
//     }
//   };

//   const handleDateSelect = (selectInfo) => {
//     setSelectedDate(selectInfo.startStr);
//   };
//   // Define handleEventRadioChange function
// const handleEventRadioChange = (selectedEvent, selectedDate) => {
//     if (selectedEvent && selectedDate) {
//       setState((prevState) => {
//         // Check if the event is already assigned to the selected date
//         const isEventAssigned = prevState.calendarEvents.some(
//           (event) =>
//             event.id === selectedEvent.id &&
//             event.start.toDateString() === selectedDate.toDateString()
//         );

//         if (isEventAssigned) {
//           // Remove the event from the selected date
//           const updatedEvents = prevState.calendarEvents.filter(
//             (event) =>
//               event.id !== selectedEvent.id ||
//               event.start.toDateString() !== selectedDate.toDateString()
//           );

//           return {
//             ...prevState,
//             calendarEvents: updatedEvents
//           };
//         } else {
//           // Add the event to the selected date
//           const newEvent = {
//             id: selectedEvent.id,
//             title: selectedEvent.title,
//             color: selectedEvent.color,
//             start: selectedDate,
//             end: selectedDate,
//             custom: selectedEvent.custom
//           };

//           return {
//             ...prevState,
//             calendarEvents: prevState.calendarEvents.concat(newEvent)
//           };
//         }
//       });
//     }
//   };

//   const renderEventContent = (eventInfo) => {
//     return (
//       <>
//         <div>{eventInfo.timeText}</div>
//         <div>
//           <input
//             type="radio"
//             checked={
//               selectedEvent &&
//               selectedEvent.id === eventInfo.event.extendedProps.id &&
//               selectedDate &&
//               selectedDate.toDateString() === eventInfo.event.start.toDateString()
//             }
//             onChange={() => handleEventRadioChange(eventInfo.event)}
//           />
//           {eventInfo.event.title}
//         </div>
//       </>
//     );
//   };

//   return (
//     <div className="App">
//       <div style={{ float: "left", width: "25%" }}>
//         <div style={{ margin: "0 0 20px" }}>
//           <input
//             type="submit"
//             name="name"
//             onClick={addEvent}
//             value="add external event"
//           />
//         </div>
//         <div id="external-events" style={{width:"100%"}}>
//           {/* {state.externalEvents.map((event) => (
//             <div
//               className="fc-event fc-h-event mb-1 fc-daygrid-event fc-daygrid-block-event p-2"
//               title={event.title}
//               data-id={event.id}
//               data-color={event.color}
//               data-custom={event.custom}
//               key={event.id}
//               style={{
//                 backgroundColor: event.color,
//                 borderColor: event.color,
//                 cursor: "pointer"
//               }}
//             >
//               <div className="fc-event-main" >
//                 <div>
//                   <strong>{event.title}</strong>
//                 </div>
//                 {event.custom}
//               </div>
//             </div>
//           ))} */}
//    {/* {state.externalEvents.map((event) => (
//   <div
//     className={`fc-event fc-h-event mb-1 fc-daygrid-event fc-daygrid-block-event p-2 ${
//       selectedEvent && selectedEvent.id === event.id ? "selected" : ""
//     }`}
//     title={event.title}
//     data-id={event.id}
//     data-color={event.color}
//     data-custom={event.custom}
//     key={event.id}
//     onClick={handleExternalEventClick}
//     style={{
//       backgroundColor: event.color,
//       borderColor: event.color,
//       cursor: "pointer"
//     }}
//   >
//     <div className="fc-event-main">
//       <div>
//         <strong>{event.title}</strong>
//       </div>
//       {event.custom}
//     </div>
//     {selectedEvent && selectedEvent.id === event.id && (
//       <div>
//         {state.calendarEvents.some(
//           (calendarEvent) =>
//             calendarEvent.title === selectedEvent.title &&
//             assignedDates.includes(calendarEvent.start)
//         ) ? (
//           <span>Assigned</span>
//         ) : (
//           <input
//             type="checkbox"
//             checked={assignedDates.length > 0}
//             onChange={() => handleExternalEventClick(event)}
//           />
//         )}
//       </div>
//     )}
//   </div>
// ))} */}

// {state.externalEvents.map((event) => (
//   <div
//     className={`fc-event fc-h-event mb-1 fc-daygrid-event fc-daygrid-block-event p-2 ${
//       selectedEvent && selectedEvent.id === event.id ? "selected" : ""
//     }`}
//     title={event.title}
//     data-id={event.id}
//     data-color={event.color}
//     data-custom={event.custom}
//     key={event.id}
//     onClick={handleExternalEventClick}
//     style={{
//       backgroundColor: event.color,
//       borderColor: event.color,
//       cursor: "pointer"
//     }}
//   >
//     <div className="fc-event-main">
//       <div>
//         <strong>{event.title}</strong>
//       </div>
//       {event.custom}
//     </div>
//     {selectedEvent && selectedEvent.id === event.id && (
//       <div>
//         {state.calendarEvents.some(
//           (calendarEvent) =>
//             calendarEvent.title === selectedEvent.title &&
//             calendarEvent.start.getDate() === selectedDate?.getDate()
//         ) ? (
//           <span>Assigned</span>
//         ) : (
//           <input
//             type="checkbox"
//             checked={selectedDate && selectedDate.getDate() === new Date().getDate()}
//             onChange={() => handleExternalEventClick(event)}
//           />
//         )}
//       </div>
//     )}
//   </div>
// ))}

//         </div>
//       </div>
//       <div style={{ float: "left", width: "75%" }}>
//         {/* <FullCalendar
//           plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}

//         headerToolbar={false}
//           initialView="dayGridMonth"
//           editable={true}
//           selectable={true}
//           selectMirror={true}
//           dayMaxEvents={true}
//           weekends={state.weekendsVisible}
//           events={state.calendarEvents}
//           droppable={true}
//           eventReceive={handleEventReceive}
//         /> */}

// <FullCalendar
//   plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//   headerToolbar={{
//     left: "prev,next today",
//     center: "title",
//     right: "dayGridMonth,timeGridWeek,timeGridDay"
//   }}
//   initialView="dayGridMonth"
//   editable={true}
//   selectable={true}
//   selectMirror={true}
//   dayMaxEvents={true}
//   weekends={state.weekendsVisible}
//   events={state.calendarEvents}
//   droppable={true}
//   eventReceive={handleEventReceive}
//   eventContent={renderEventContent} // Add this line
// />

//       </div>
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin, { Draggable } from "@fullcalendar/interaction";

// export default function CopyMonthSchedule() {
//   // initial state
//   const [state, setState] = useState({
//     weekendsVisible: true,
//     externalEvents: [
//       { title: "Art 1", color: "#0097a7", id: 34432, custom: "fdsfdsfds" },
//       { title: "Art 2", color: "#f44336", id: 323232 },
//       { title: "Art 3", color: "#f57f17", id: 1111 },
//       { title: "Art 4", color: "#90a4ae", id: 432432 }
//     ],
//     calendarEvents: []
//   });

//   // load external events
//   useEffect(() => {
//     let draggableEl = document.getElementById("external-events");
//     new Draggable(draggableEl, {
//       itemSelector: ".fc-event",
//       eventData: function (eventEl) {
//         let id = eventEl.dataset.id;
//         let title = eventEl.getAttribute("title");
//         let color = eventEl.dataset.color;
//         let custom = eventEl.dataset.custom;

//         return {
//           id: id,
//           title: title,
//           color: color,
//           custom: custom,
//           create: true
//         };
//       }
//     });
//   });

//   // handle external event selection
//   const handleExternalEventSelect = (event) => {
//     setState((prevState) => {
//       // Clear any previously selected events
//       const calendarEvents = prevState.calendarEvents.map((event) => ({
//         ...event,
//         selected: false
//       }));

//       // Find the selected event
//       const selectedEvent = calendarEvents.find(
//         (ev) => ev.id === event.id && ev.selected
//       );

//       if (selectedEvent) {
//         // Unselect the event if already selected
//         selectedEvent.selected = false;
//       } else {
//         // Select the event
//         event.selected = true;
//       }

//       return {
//         ...prevState,
//         calendarEvents: calendarEvents
//       };
//     });
//   };

//   // handle date click
//   const handleDateClick = (arg) => {
//     const selectedDate = arg.date;

//     setState((prevState) => {
//       const selectedEvent = prevState.calendarEvents.find(
//         (event) => event.selected
//       );

//       if (selectedEvent) {
//         // Add the selected event to the selected date
//         const newEvent = {
//           id: selectedEvent.id,
//           title: selectedEvent.title,
//           color: selectedEvent.color,
//           start: selectedDate,
//           end: selectedDate,
//           custom: selectedEvent.custom
//         };

//         return {
//           ...prevState,
//           calendarEvents: prevState.calendarEvents.concat(newEvent)
//         };
//       }

//       return prevState;
//     });
//   };

//   return (
//     <div className="App">
//       <div style={{ float: "left", width: "25%" }}>
//         <div id="external-events" style={{ width: "100%" }}>
//           {state.externalEvents.map((event) => (
//             <div
//               className={`fc-event fc-h-event mb-1 fc-daygrid-event fc-daygrid-block-event p-2${
//                 event.selected ? " selected" : ""
//               }`}
//               title={event.title}
//               data-id={event.id}
//               data-color={event.color}
//               data-custom={event.custom}
//               key={event.id}
//               onClick={() => handleExternalEventSelect(event)}
//               style={{
//                 backgroundColor: event.color,
//                 borderColor: event.color,
//                 cursor: "pointer"
//               }}
//             >
//               <div className="fc-event-main">
//                 <div>
//                   <strong>{event.title}</strong>
//                 </div>
//                 {event.custom}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       <div style={{ float: "left", width: "75%" }}>
//         <FullCalendar
//           plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//           headerToolbar={false}
//           initialView="dayGridMonth"
//           editable={true}
//           selectable={true}
//           selectMirror={true}
//           dayMaxEvents={true}
//           weekends={state.weekendsVisible}
//           events={state.calendarEvents}
//           dateClick={handleDateClick}
//           eventRender={({ event, el }) => {
//             // Add radio button to each date
//             const inputEl = document.createElement("input");
//             inputEl.type = "radio";
//             inputEl.addEventListener("change", () =>
//               handleExternalEventSelect(event)
//             );

//             el.prepend(inputEl);
//           }}
//         />
//       </div>
//     </div>
//   );
// }

// -----------------------------------

// import React, { useState } from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";

// export default function CalendarWithRadioButtons() {
//   const [selectedDate, setSelectedDate] = useState(null);

//   const handleDateClick = (dateClickInfo) => {
//     setSelectedDate(dateClickInfo.date);
//   };

//   const renderDateCell = (dateInfo) => {
//     const isSelected = selectedDate && dateInfo.date.valueOf() === selectedDate.valueOf();

//     return (
//       <div>
//         <input
//           type="radio"
//           checked={isSelected}
//           onChange={() => setSelectedDate(dateInfo.date)}
//         />
//         {dateInfo.dayNumberText}
//       </div>
//     );
//   };

//   return (
//     <div className="calendar">
//       <FullCalendar
//         plugins={[dayGridPlugin]}
//         initialView="dayGridMonth"
//         selectable={true}
//         dateClick={handleDateClick}
//         dayCellContent={renderDateCell}
//       />
//     </div>
//   );
// }

// -----------------------------------

//******************************* */
import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function CalendarWithEventList() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([
    { id: 1, title: "Event 1", start: "2023-05-01", end: "2023-05-02" },
    { id: 2, title: "Event 2", start: "2023-05-03", end: "2023-05-04" },
    { id: 3, title: "Event 3", start: "2023-05-05", end: "2023-05-06" },
    { id: 4, title: "Event 4", start: "2023-05-07", end: "2023-05-08" },
  ]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  console.log(selectedEvent, "lllllllloooooo");
  const [selectedCheckboxes, setSelectedCheckboxes] = useState({});

  const renderDateCell = (dateInfo) => {
    const selectedDateValue = selectedDate ? selectedDate.valueOf() : null;
    const isSelected = selectedDateValue === dateInfo.date.valueOf();
    const isEventSelected = selectedEvent;

    if (isEventSelected) {
      const checkboxKey = dateInfo.date.toISOString();
      const hasEvent = events.some(
        (event) => event.start.valueOf() === dateInfo.date.valueOf()
      );

      return (
        <div>
          <input
            name={`checkbox-${checkboxKey}`}
            type="checkbox"
            checked={isSelected || selectedCheckboxes[checkboxKey]}
            onChange={() => handleDateCellChange(dateInfo)}
          />
          {dateInfo.dayNumberText}
        </div>
      );
    }

    return dateInfo.dayNumberText;
  };

  // const handleDateCellChange = (dateInfo) => {
  //   if (selectedEvent) {
  //     const checkboxKey = dateInfo.date.toISOString();
  //     const selectedDateValue = dateInfo.date.valueOf();
  //     const filteredEvents = events.filter(
  //       (event) => event.start.valueOf() !== selectedDateValue
  //     );

  //     const hasEvent = filteredEvents.some(
  //       (event) => event.start.valueOf() === selectedDateValue
  //     );

  //     if (hasEvent) {
  //       setSelectedEvent(null);
  //       setSelectedDate(null);
  //       setEvents(filteredEvents);
  //       setSelectedCheckboxes((prevSelectedCheckboxes) => {
  //         const updatedCheckboxes = { ...prevSelectedCheckboxes };
  //         delete updatedCheckboxes[checkboxKey];
  //         return updatedCheckboxes;
  //       });
  //     } else {
  //       setSelectedDate(dateInfo.date);

  //       const event = {
  //         title: selectedEvent.title,
  //         start: dateInfo.date,
  //       };

  //       setEvents([...filteredEvents, event]);

  //       setSelectedCheckboxes((prevSelectedCheckboxes) => ({
  //         ...prevSelectedCheckboxes,
  //         [checkboxKey]: true,
  //       }));
  //     }
  //   } else {
  //     setSelectedDate(dateInfo.date);
  //   }
  // };

  // const handleDateCellChange = (dateInfo) => {
  //   console.log(dateInfo, "iiiiiiiiiii");
  //   const checkboxKey = dateInfo.date.toISOString();
  //   const selectedDateValue = dateInfo.date.valueOf();
  //   const filteredEvents = events.filter(
  //     (event) => event.start.valueOf() !== selectedDateValue
  //   );

  //   const date = new Date(dateInfo.date);
  //   const formattedDate = date.toLocaleDateString("en-GB", {
  //     year: "numeric",
  //     month: "2-digit",
  //     day: "2-digit",
  //   });

  //   const [day, month, year] = formattedDate.split("/");
  //   const desiredFormat = `${year}-${month}-${day}`;
  //   // console.log(filteredEvents, "cgvjhjghgk");
  //   let hasEvent = false;
  //   console.log(dateInfo, "arti");
  //   console.log(Object.keys(dateInfo), "dj");
  //   // console.log(example, "test");
  //   // if (dateInfo.event) {
  //   //   hasEvent = filteredEvents.some((event) =>
  //   //     console.log(event, "ttttttttt")
  //   //   );
  //   // }
  //   console.log(events.id);

  //   if (dateInfo.event && dateInfo.event.id === dateInfo.id) {
  //     hasEvent = filteredEvents.some((ev) => ev.id === dateInfo.event.id);
  //   }
  //   // console.log(hasEvent, "pppppp");
  //   if (hasEvent) {
  //     setSelectedEvent(null);
  //     setSelectedDate(null);
  //     setEvents(filteredEvents);
  //     setSelectedCheckboxes((prevSelectedCheckboxes) => {
  //       const updatedCheckboxes = { ...prevSelectedCheckboxes };
  //       delete updatedCheckboxes[checkboxKey];
  //       return updatedCheckboxes;
  //     });
  //   } else {
  //     setSelectedDate(dateInfo.date);

  //     if (selectedEvent) {
  //       // console.log(selectedEvent, "pppppppp");
  //       dateInfo.kkk = selectedEvent;
  //       // var example = dateInfo.kkk;
  //       // console.log(dateInfo, "eeeeeee");
  //       const event = {
  //         title: selectedEvent.title,
  //         start: dateInfo.date,
  //       };

  //       setEvents([...filteredEvents, event]);

  //       setSelectedCheckboxes((prevSelectedCheckboxes) => ({
  //         ...prevSelectedCheckboxes,
  //         [checkboxKey]: true,
  //       }));
  //     }
  //   }
  // };

  function handleDateCellChange(dateInfo) {
    console.log(dateInfo, "handleDateCellChange top console");
    const checkboxKey = dateInfo.date.toISOString();
    const selectedDateValue = dateInfo.date.valueOf();
    if (selectedEvent !== null) {
      let testObj = JSON.parse(JSON.stringify(dateInfo));
      testObj.event = selectedEvent;
      dateInfo.kkk = selectedEvent;
      console.log(dateInfo, testObj, "dateInfo -> testObj");
      console.log(dateInfo.kkk, testObj.event, "dateInfo -> testObj");

      const event = {
        title: selectedEvent.title,
        start: dateInfo.date,
      };
    }
    const filteredEvents = events.filter(
      (event) => event.start.valueOf() !== selectedDateValue
    );

    const date = new Date(dateInfo.date);
    const formattedDate = date.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    const [day, month, year] = formattedDate.split("/");
    const desiredFormat = `${year}-${month}-${day}`;

    let hasEvent = false;
    console.log(dateInfo, "arti");

    if (dateInfo.event && dateInfo.event.id) {
      hasEvent = filteredEvents.some((ev) => ev.id === dateInfo.event.id);
    }

    if (hasEvent) {
      setSelectedEvent(null);
      setSelectedDate(null);
      setEvents(filteredEvents);
      setSelectedCheckboxes((prevSelectedCheckboxes) => {
        const updatedCheckboxes = { ...prevSelectedCheckboxes };
        delete updatedCheckboxes[checkboxKey];
        return updatedCheckboxes;
      });
    } else {
      setSelectedDate(dateInfo.date);

      if (
        selectedEvent &&
        dateInfo.event &&
        selectedEvent.id === dateInfo.event.id
      ) {
        const eventToRemove = events.find(
          (event) => event.id === selectedEvent.id
        );
        const updatedEvents = events.filter(
          (event) => event.id !== selectedEvent.id
        );
        setSelectedEvent(null);
        setSelectedDate(null);
        setEvents(updatedEvents);
        setSelectedCheckboxes((prevSelectedCheckboxes) => {
          const updatedCheckboxes = { ...prevSelectedCheckboxes };
          delete updatedCheckboxes[checkboxKey];
          return updatedCheckboxes;
        });
      } else if (selectedEvent) {
        const event = {
          id: selectedEvent.id,
          title: selectedEvent.title,
          start: dateInfo.date,
        };
        setEvents([...filteredEvents, event]);

        setSelectedCheckboxes((prevSelectedCheckboxes) => ({
          ...prevSelectedCheckboxes,
          [checkboxKey]: true,
        }));
      }
    }
  }

  const getDatesBetween = (start, end) => {
    const dates = [];
    let currentDate = new Date(start);

    while (currentDate <= end) {
      dates.push(currentDate.toISOString().split("T")[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  const addCheckboxesToDates = (event) => {
    const allDates = getDatesBetween(event.start, event.end);

    const calendarEl = document.querySelector(".calendar-container");
    allDates.forEach((date) => {
      const dateCell = calendarEl.querySelector(`[data-date="${date}"]`);
      dateCell.classList.add("selected-date");
    });
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setSelectedDate(null); // Reset selected date
    addCheckboxesToDates(event);
  };

  // const events = [
  //   { id: 1, title: "Event 1", start: "2023-05-01", end: "2023-05-02" },
  //   { id: 2, title: "Event 2", start: "2023-05-03", end: "2023-05-04" },
  //   { id: 3, title: "Event 3", start: "2023-05-05", end: "2023-05-06" },
  //   { id: 4, title: "Event 4", start: "2023-05-07", end: "2023-05-08" },
  // ];
  return (
    <div className="containe">
      <div className="event-list" style={{ float: "left", width: "25%" }}>
        <h2>Event List</h2>
        <ul>
          {events.map((event) => (
            <li
              key={event.id}
              onClick={() => handleEventClick(event)}
              style={{
                cursor: "pointer",
                fontWeight:
                  selectedEvent && selectedEvent.id === event.id
                    ? "bold"
                    : "normal",
              }}
            >
              {event.title}
            </li>
          ))}
        </ul>
      </div>
      <div className="calendar" style={{ float: "left", width: "75%" }}>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          selectable={true}
          events={events}
          dayCellContent={renderDateCell}
          eventContent={(info) => {
            return (
              <div>
                <div>{info.event.title}</div>
              </div>
            );
          }}
        />
      </div>
    </div>
  );
}
//*********************************** */

// import React, { useState } from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import interactionPlugin from "@fullcalendar/interaction";

// export default function CalendarWithEventList() {
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [events, setEvents] = useState([]);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [selectedRadio, setSelectedRadio] = useState({});

//   const handleDateCellChange = (dateInfo) => {
//     if (selectedEvent) {
//       const selectedDateValue = dateInfo.date.valueOf();
//       const filteredEvents = events.filter(
//         (event) => event.start.valueOf() !== selectedDateValue
//       );

//       const hasEvent = filteredEvents.some(
//         (event) => event.start.valueOf() === selectedDateValue
//       );

//       if (hasEvent) {
//         setSelectedEvent(null);
//         setSelectedDate(null);
//         setEvents(filteredEvents);
//         setSelectedRadio({}); // Clear the selected radio state for the date
//       } else {
//         setSelectedDate(dateInfo.date);

//         const event = {
//           title: selectedEvent.title,
//           start: dateInfo.date,
//         };

//         setEvents([...filteredEvents, event]);
//         setSelectedRadio((prevSelectedRadio) => ({
//           ...prevSelectedRadio,
//           [dateInfo.date.toISOString()]: true, // Set the selected radio state for the date
//         }));
//       }
//     } else {
//       setSelectedDate(dateInfo.date);
//       setSelectedRadio((prevSelectedRadio) => ({
//         ...prevSelectedRadio,
//         [dateInfo.date.toISOString()]: true, // Set the selected radio state for the date
//       }));
//     }
//   };

//   const renderDateCell = (dateInfo) => {
//     const isSelected = selectedDate
//       ? selectedDate.valueOf() === dateInfo.date.valueOf()
//       : false;
//     const isEventSelected = selectedEvent;
//     const radioKey = dateInfo.date.toISOString();

//     if (isEventSelected) {
//       const radioButtonName = `radio-${radioKey}`;
//       const hasEvent = events.some(
//         (event) => event.start.valueOf() === dateInfo.date.valueOf()
//       );

//       return (
//         <div>
//           <input
//             name={radioButtonName}
//             type="radio"
//             checked={isSelected && selectedRadio[radioKey]}
//             onChange={() => handleDateCellChange(dateInfo)}
//           />
//           {dateInfo.dayNumberText}
//         </div>
//       );
//     }

//     return dateInfo.dayNumberText;
//   };

//   const getDatesBetween = (start, end) => {
//     const dates = [];
//     let currentDate = new Date(start);

//     while (currentDate <= end) {
//       dates.push(currentDate.toISOString().split("T")[0]);
//       currentDate.setDate(currentDate.getDate() + 1);
//     }

//     return dates;
//   };

//   const addRadioButtonsToDates = (event) => {
//     const allDates = getDatesBetween(event.start, event.end);

//     const calendarEl = document.querySelector(".calendar-container");
//     allDates.forEach((date) => {
//       const dateCell = calendarEl.querySelector(`[data-date="${date}"]`);
//       dateCell.classList.add("selected-date");
//     });
//   };

//   const handleEventClick = (event) => {
//     setSelectedEvent(event);
//     setSelectedDate(null); // Reset selected date
//     addRadioButtonsToDates(event);
//   };

//   const eventsa = [
//     { id: 1, title: "Event 1", start: "2023-05-01", end: "2023-05-02" },
//     { id: 2, title: "Event 2", start: "2023-05-03", end: "2023-05-04" },
//     { id: 3, title: "Event 3", start: "2023-05-05", end: "2023-05-06" },
//     { id: 4, title: "Event 4", start: "2023-05-07", end: "2023-05-08" },
//   ];

//   return (
//     <div className="container">
//       <div className="event-list" style={{ float: "left", width: "25%" }}>
//         <h2>Event List</h2>
//         <ul>
//           {eventsa.map((event) => (
//             <li
//               key={event.id}
//               onClick={() => handleEventClick(event)}
//               style={{
//                 cursor: "pointer",
//                 fontWeight:
//                   selectedEvent && selectedEvent.id === event.id
//                     ? "bold"
//                     : "normal",
//               }}
//             >
//               {event.title}
//             </li>
//           ))}
//         </ul>
//       </div>
//       <div className="calendar" style={{ float: "left", width: "75%" }}>
//         <FullCalendar
//           plugins={[dayGridPlugin, interactionPlugin]}
//           initialView="dayGridMonth"
//           selectable={true}
//           events={events}
//           dayCellContent={renderDateCell}
//           eventContent={(info) => {
//             return (
//               <div>
//                 <div>{info.event.title}</div>
//               </div>
//             );
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// second month

// import React, { useState } from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import interactionPlugin from "@fullcalendar/interaction";

// export default function SecondMonth() {
//     const [selectedDate, setSelectedDate] = useState(null);
//     const [events, setEvents] = useState([
//         { id: 1, title: "Event 1", start: "2023-05-01", end: "2023-05-02" },
//         { id: 2, title: "Event 2", start: "2023-05-03", end: "2023-05-04" },
//         { id: 3, title: "Event 3", start: "2023-05-05", end: "2023-05-06" },
//         { id: 4, title: "Event 4", start: "2023-05-07", end: "2023-05-08" },
//     ]);
//     const [selectedEvent, setSelectedEvent] = useState(null);
//     console.log(selectedEvent, "lllllllloooooo");
//     const [selectedCheckboxes, setSelectedCheckboxes] = useState({});

//     function handleDateCellChange(dateInfo) {
//         console.log(dateInfo, "oooooo")
//         console.log(dateInfo, "handleDateCellChange top console");
//         const checkboxKey = dateInfo.date.toISOString();
//         const selectedDateValue = dateInfo.date.valueOf();
//         const isChecked = selectedCheckboxes[checkboxKey];

//         if (isChecked) {
//             // Unselecting the checkbox
//             setSelectedCheckboxes((prevSelectedCheckboxes) => {
//                 const updatedCheckboxes = { ...prevSelectedCheckboxes };
//                 delete updatedCheckboxes[checkboxKey];
//                 return updatedCheckboxes;
//             });

//             const filteredEvents = events.filter(
//                 (event) => event.start.valueOf() !== selectedDateValue
//             );

//             setSelectedEvent(null);
//             setSelectedDate(null);
//             setEvents(filteredEvents);
//         } else {
//             // Selecting the checkbox
//             setSelectedCheckboxes((prevSelectedCheckboxes) => ({
//                 ...prevSelectedCheckboxes,
//                 [checkboxKey]: true,
//             }));

//             const event = {
//                 id: selectedEvent.id,
//                 title: selectedEvent.title,
//                 start: dateInfo.date,
//             };
//             setEvents((prevEvents) => [...prevEvents, event]);
//         }
//     }

//     // function handleDateCellChange(dateInfo) {
//     //     console.log(dateInfo, "handleDateCellChange top console");
//     //     const checkboxKey = dateInfo.date.toISOString();
//     //     const isChecked = selectedCheckboxes[checkboxKey];

//     //     if (isChecked) {
//     //         // Unselecting the checkbox
//     //         setSelectedCheckboxes((prevSelectedCheckboxes) => {
//     //             const updatedCheckboxes = { ...prevSelectedCheckboxes };
//     //             delete updatedCheckboxes[checkboxKey];
//     //             return updatedCheckboxes;
//     //         });

//     //         const eventToRemove = events.find(
//     //             (event) => event.start.valueOf() === dateInfo.date.valueOf()
//     //         );

//     //         if (eventToRemove) {
//     //             const updatedEvents = events.filter(
//     //                 (event) => event.id !== eventToRemove.id
//     //             );
//     //             setEvents(updatedEvents);
//     //         }
//     //     } else {
//     //         // Selecting the checkbox
//     //         setSelectedCheckboxes((prevSelectedCheckboxes) => ({
//     //             ...prevSelectedCheckboxes,
//     //             [checkboxKey]: true,
//     //         }));

//     //         const event = {
//     //             id: selectedEvent.id,
//     //             title: selectedEvent.title,
//     //             start: dateInfo.date,
//     //         };

//     //         setEvents((prevEvents) => [...prevEvents, event]);
//     //     }
//     // }

//     const renderDateCell = (dateInfo) => {
//         console.log(dateInfo, "ppppp")
//         const selectedDateValue = selectedDate ? selectedDate.valueOf() : null;
//         const isSelected = selectedDateValue === dateInfo.date.valueOf();
//         const isEventSelected = selectedEvent;

//         if (isEventSelected) {
//             const checkboxKey = dateInfo.date.toISOString();

//             return (
//                 <div>
//                     <input
//                         name={`checkbox-${checkboxKey}`}
//                         type="checkbox"
//                         checked={isSelected || selectedCheckboxes[checkboxKey]}
//                         onChange={() => handleDateCellChange(dateInfo)}
//                     />
//                     {dateInfo.dayNumberText}
//                 </div>
//             );
//         }

//         return dateInfo.dayNumberText;
//     };

//     // function handleDateCellChange(dateInfo) {
//     //     console.log(dateInfo, "handleDateCellChange top console");
//     //     const checkboxKey = dateInfo.date.toISOString();
//     //     const selectedDateValue = dateInfo.date.valueOf();
//     //     if (selectedEvent !== null) {
//     //         let testObj = JSON.parse(JSON.stringify(dateInfo));
//     //         testObj.event = selectedEvent;
//     //         dateInfo.kkk = selectedEvent;
//     //         console.log(dateInfo, testObj, "dateInfo -> testObj");
//     //         console.log(dateInfo.kkk, testObj.event, "dateInfo -> testObj");

//     //         const event = {
//     //             title: selectedEvent.title,
//     //             start: dateInfo.date,
//     //         };
//     //     }
//     //     const filteredEvents = events.filter(
//     //         (event) => event.start.valueOf() !== selectedDateValue
//     //     );

//     //     const date = new Date(dateInfo.date);
//     //     const formattedDate = date.toLocaleDateString("en-GB", {
//     //         year: "numeric",
//     //         month: "2-digit",
//     //         day: "2-digit",
//     //     });

//     //     const [day, month, year] = formattedDate.split("/");
//     //     const desiredFormat = `${year}-${month}-${day}`;

//     //     let hasEvent = false;
//     //     console.log(dateInfo, "arti");

//     //     if (dateInfo.event && dateInfo.event.id) {
//     //         hasEvent = filteredEvents.some((ev) => ev.id === dateInfo.event.id);
//     //     }

//     //     if (hasEvent) {
//     //         setSelectedEvent(null);
//     //         setSelectedDate(null);
//     //         setEvents(filteredEvents);
//     //         setSelectedCheckboxes((prevSelectedCheckboxes) => {
//     //             const updatedCheckboxes = { ...prevSelectedCheckboxes };
//     //             delete updatedCheckboxes[checkboxKey];
//     //             return updatedCheckboxes;
//     //         });
//     //     } else {
//     //         setSelectedDate(dateInfo.date);

//     //         if (
//     //             selectedEvent &&
//     //             dateInfo.event &&
//     //             selectedEvent.id === dateInfo.event.id
//     //         ) {
//     //             const eventToRemove = events.find(
//     //                 (event) => event.id === selectedEvent.id
//     //             );
//     //             const updatedEvents = events.filter(
//     //                 (event) => event.id !== selectedEvent.id
//     //             );
//     //             setSelectedEvent(null);
//     //             setSelectedDate(null);
//     //             setEvents(updatedEvents);
//     //             setSelectedCheckboxes((prevSelectedCheckboxes) => {
//     //                 const updatedCheckboxes = { ...prevSelectedCheckboxes };
//     //                 delete updatedCheckboxes[checkboxKey];
//     //                 return updatedCheckboxes;
//     //             });
//     //         } else if (selectedEvent) {
//     //             const event = {
//     //                 id: selectedEvent.id,
//     //                 title: selectedEvent.title,
//     //                 start: dateInfo.date,
//     //             };
//     //             setEvents([...filteredEvents, event]);

//     //             setSelectedCheckboxes((prevSelectedCheckboxes) => ({
//     //                 ...prevSelectedCheckboxes,
//     //                 [checkboxKey]: true,
//     //             }));
//     //         }
//     //     }
//     // }

//     // const getDatesBetween = (start, end) => {
//     //     const dates = [];
//     //     let currentDate = new Date(start);

//     //     while (currentDate <= end) {
//     //         dates.push(currentDate.toISOString().split("T")[0]);
//     //         currentDate.setDate(currentDate.getDate() + 1);
//     //     }

//     //     return dates;
//     // };

//     // const addCheckboxesToDates = (event) => {
//     //     const allDates = getDatesBetween(event.start, event.end);

//     //     const calendarEl = document.querySelector(".calendar-container");
//     //     allDates.forEach((date) => {
//     //         const dateCell = calendarEl.querySelector(`[data-date="${date}"]`);
//     //         dateCell.classList.add("selected-date");
//     //     });
//     // };

//     const handleEventClick = (event) => {
//         setSelectedEvent(event);
//         setSelectedDate(null); // Reset selected date
//         // addCheckboxesToDates(event);
//     };

//     return (
//         <div className="containe">
//             <div className="event-list" style={{ float: "left", width: "25%" }}>
//                 <h2>Event List</h2>
//                 <ul>
//                     {events.map((event, i) => (
//                         <li
//                             key={i}
//                             onClick={() => handleEventClick(event)}
//                             style={{
//                                 cursor: "pointer",
//                                 fontWeight:
//                                     selectedEvent && selectedEvent.id === event.id
//                                         ? "bold"
//                                         : "normal",
//                             }}
//                         >
//                             {event.title}
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//             <div className="calendar" style={{ float: "left", width: "75%" }}>
//                 <FullCalendar
//                     plugins={[dayGridPlugin, interactionPlugin]}
//                     initialView="dayGridMonth"
//                     selectable={true}
//                     events={events}
//                     dayCellContent={renderDateCell}
//                     eventContent={(info) => {
//                         return (
//                             <div>
//                                 <div>{info.event.title}</div>
//                             </div>
//                         );
//                     }}
//                 />
//             </div>
//         </div>
//     );
// }
