import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Button } from "react-bootstrap";
import moment from 'moment'
export default function DesignMonthSchedule() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);
  const monthList = ['Jan', 'Feb', 'March'];
  var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const externalEvent = [
    { id: 1, title: "Event 1", start: "2023-06-01", end: "2023-06-02" },
    { id: 2, title: "Event 2", start: "2023-06-03", end: "2023-06-04" },
    { id: 3, title: "Event 3", start: "2023-06-05", end: "2023-06-06" },
    { id: 4, title: "Event 4", start: "2023-06-07", end: "2023-06-08" },
  ];

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [isEventSelected, setIsEventSelected] = useState(false);

  useEffect(() => {
    console.log("Dsd");
  },[selectedCheckboxes])
  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setSelectedDate(null); // Reset selected date
    setSelectedCheckboxes({});
    setIsEventSelected(true); // Set isEventSelected to true
  };

  function handleDateCellChange(dateInfo) {
    const checkboxKey = dateInfo;
    const isChecked = selectedCheckboxes[checkboxKey];
    if (isChecked) {
      // Unselecting the checkbox
      setSelectedCheckboxes((prevSelectedCheckboxes) => {
        const updatedCheckboxes = { ...prevSelectedCheckboxes };
        delete updatedCheckboxes[checkboxKey];
        return updatedCheckboxes;
      });

      const filteredEvents = events.filter(
        (event) => event.start !== dateInfo
      );

      // setSelectedEvent(null);
      // setSelectedDate(null);
      setEvents(filteredEvents);
    } else {
      // Selecting the checkbox
      setSelectedCheckboxes({...selectedCheckboxes,[checkboxKey]: true})
      // setSelectedCheckboxes((prevSelectedCheckboxes) => ({
      //   [checkboxKey]: true,
      // }));

      const existingEvent = events.find(
        (event) => event.start === dateInfo
      );

      if (!existingEvent) {
        const event = {
          id: selectedEvent.id,
          title: selectedEvent.title,
          start: dateInfo,
        };
        setEvents((prevEvents) => [...prevEvents, event]);
      }
    }
  }

  // const handleWeekCellChange = (day) => {
  //   function getDatesForDayOfWeek(year, month, dayOfWeek) {
  //     const dates = [];
  //     const date = new Date(year, month, 1); // Subtract 1 from month since JavaScript months are zero-based
  //     const targetDay = dayOfWeek % 7; // Normalize dayOfWeek to 0-6 range (Sunday is 0)
  //     while (date.getMonth() === month) {
  //       if (date.getDay() === targetDay) {
  //         dates.push(new Date(date)); // Push a new Date object to the array
  //       }
  //       date.setDate(date.getDate() + 1);
  //     }
  //     return dates;
  //   }

  //   const dates = getDatesForDayOfWeek(year, month, dayOfWeek);

  //   dates.forEach((date) => {
  //     console.log(date, "kkkkkk");

  //     // const checkboxKey = inputdate.replace(/\//g, "-");
  //     const checkboxKey = date;

  //     console.log(checkboxKey, "unitqkjn");

  //     setSelectedCheckboxes((prevSelectedCheckboxes) => ({
  //       ...prevSelectedCheckboxes,
  //       [checkboxKey]: true,
  //     }));
  //     console.log(selectedCheckboxes, "sgvyhjmffgbhnj");

  //     // Check if the event already exists for the selected date
  //     const existingEvent = events.find(
  //       (event) => event.start === date.toISOString().split("T")[0]
  //     );

  //     if (!existingEvent) {
  //       // Add event to the selected date
  //       const eventToAdd = {
  //         id: selectedEvent.id,
  //         title: selectedEvent.title,
  //         start: date.toISOString().split("T")[0],
  //       };
  //       setEvents((prevEvents) => [...prevEvents, eventToAdd]);
  //     }
  //   });
  // };

  const handleWeek = async (day, dayInfo) => {
    const dayList = getSundays(days[day], day);
    const newArray = selectedCheckboxes;
    dayList.forEach((item) => {
      if(newArray[item.format('YYYY-MM-DD')] !== undefined){
        delete newArray[item.format('YYYY-MM-DD')];
      }else{
        newArray[item.format('YYYY-MM-DD')] = true;
      }
      
      handleDateCellChange(item.format('YYYY-MM-DD'))
    })
    setSelectedCheckboxes(newArray);
  }

  function getMonthFromString(mon) {
    return new Date(Date.parse(mon + " 1, 2012")).getMonth() + 1;
  }

  function getSundays(dayName, dayId) {
    var startDate = new Date(2023, 5, 1);
    var endDate = new Date(2023,5, 31);
    var day = dayId;  
    for (var i = 0; i <= 7; i++) { 
        if(startDate.toString().indexOf(dayName) !== -1){
          break;
        }
        startDate =  new Date(2023, 5, i);
    }
    const result = [];
    
    startDate = moment(startDate);
    endDate = moment(endDate);
    result.push(startDate);
    var current = startDate.clone();
    while (current.day(7 + day).isBefore(endDate)) {
      result.push(current.clone());
    }
    return result
  }

  const renderDayHeader = (dayInfo) => {
    
    const { date } = dayInfo;
    const checkboxKey = dayInfo.date.toISOString();
    const isChecked = selectedCheckboxes[checkboxKey];

    if (isEventSelected) {
      return (
        <div>
          <input
            className="day-checkbox"
            name={`checkbox-${checkboxKey}`}
            type="checkbox"
            checked={isChecked}
            onChange={() => {handleWeek(dayInfo.date.getDay(), dayInfo)}}
          />
          {date.toLocaleDateString("en-US", { weekday: "short" })}
        </div>
      );
    } else {
      return (
        <div>{date.toLocaleDateString("en-US", { weekday: "short" })}</div>
      );
    }
  };

  const renderDateCell = (dateInfo) => {
    const selectedDateValue = selectedDate ? selectedDate.valueOf() : null;
    const isSelected = selectedDateValue === dateInfo.date.valueOf();
    const isEventSelected = selectedEvent;
    if (isEventSelected) {
      const checkboxKey = dateInfo.date.toISOString();
      const checkDate = checkboxKey.split('T')[0];
      const lastDate = moment(checkDate, 'YYYY-MM-DD').add("days",1).format('YYYY-MM-DD');

      return (
        <div className="month-schedule-checkbox">
          <input
            name={`checkbox-${lastDate}`}
            type="checkbox"
            checked={isSelected || selectedCheckboxes[lastDate] || selectedCheckboxes[lastDate]}
            onChange={() => handleDateCellChange(lastDate)}
          />
          {dateInfo.dayNumberText}
        </div>
      );
    }
    return dateInfo.dayNumberText;
  };

  const handlePublish = (e) => {
    e.preventDefault();
    console.log(selectedCheckboxes)
  }

  return (
    <div className="fullcalendar-box">
      <div className="d-flex justify-content-end">
        <Button className="mr-2" 
          onClick={(e)=>{handlePublish(e)}}
          variant="info add-screen-btn">
          Publish
        </Button>
      </div>

      <div className="event-list">
        <h3>Day Sequence</h3>
        {externalEvent.map((event, i) => (
          <div
            key={i}
            className="month-schedule-list mt-4"
            onClick={() => handleEventClick(event)}
          >
            <div className="d-flex align-items-center px-2 py-4 justify-content-between">
              <span>{event.title}</span>
              <span className="total-composition">Contains 1 compositions</span>
              <span>E</span>
              <span>D</span>
              <span className="add-btn">Add to Calendar </span>
            </div>
          </div>
        ))}
      </div>
      <div className="calendar" style={{ float: "left", width: "60%" }}>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          selectable={true}
          events={events}
          dayHeaderContent={renderDayHeader}
          dayCellContent={renderDateCell}
          eventContent={(info) => (
            <div className="month-schedule-event">
              <div>{info.event.title}</div>
            </div>
          )}

        />
      </div>
    </div>
  );
}
