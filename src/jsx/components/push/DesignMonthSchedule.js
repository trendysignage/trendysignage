import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Button } from "react-bootstrap";
import moment from "moment";
import { getAllDaySequence, pushAddDates } from "../../../utils/api";
import { useParams, useHistory } from "react-router-dom";
import edit from "../../../img/edit-composition.png";
import deleteIcon from "../../../img/delete-icon.png";
export default function DesignMonthSchedule() {
  const history = useHistory();
  const { id } = useParams();
  console.log(id, "monthhhhh");
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);
  const [daySequence, setDaySequence] = useState([]);
  console.log(daySequence, "daySequence");
  const monthList = ["Jan", "Feb", "March"];
  var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const externalEvent = [
    { id: 1, title: "Event 1", start: "2023-06-01", end: "2023-06-02" },
    { id: 2, title: "Event 2", start: "2023-06-03", end: "2023-06-04" },
    { id: 3, title: "Event 3", start: "2023-06-05", end: "2023-06-06" },
    { id: 4, title: "Event 4", start: "2023-06-07", end: "2023-06-08" },
  ];

  const callAllDaySequence = async (id) => {
    // setLoading(true);
    const list = await getAllDaySequence(id);
    // setLoading(false);
    // setAllScreens(list);
    console.log(list, "uuuuuuu");
    setDaySequence(list.sequence);
  };
  useEffect(() => {
    callAllDaySequence(id);
  }, [id]);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [isEventSelected, setIsEventSelected] = useState(false);

  useEffect(() => {}, [selectedCheckboxes]);

  const handleEventClick = (event) => {
    console.log(event, "handleEventClick");
    setEvents([]);
    setSelectedEvent(event);
    setSelectedDate(null); // Reset selected date
    setSelectedCheckboxes([]);
    setIsEventSelected(true); // Set isEventSelected to true
  };

  function handleDateCellChange(dateInfo, isWk) {
    const checkboxKey = dateInfo;
    const dt = new Date(dateInfo);
    const isChecked = selectedCheckboxes[checkboxKey];
    if (isWk) {
      if (!isChecked) {
        // Unselecting the checkbox
        setSelectedCheckboxes((prevSelectedCheckboxes) => {
          const updatedCheckboxes = { ...prevSelectedCheckboxes };
          delete updatedCheckboxes[checkboxKey];
          return updatedCheckboxes;
        });
        setEvents((current) =>
          current.filter((event) => event.start !== dateInfo)
        );
      } else {
        // Selecting the checkbox
        setSelectedCheckboxes({ ...selectedCheckboxes, [checkboxKey]: true });
        const existingEvent = events.find((event) => event.start === dateInfo);

        if (!existingEvent) {
          const event = {
            id: selectedEvent._id,
            title: selectedEvent.name,
            start: dateInfo,
          };
          setEvents((prevEvents) => [...prevEvents, event]);
        }
      }
    } else {
      if (isChecked) {
        setSelectedCheckboxes((prevSelectedCheckboxes) => {
          const updatedCheckboxes = { ...prevSelectedCheckboxes };
          delete updatedCheckboxes[checkboxKey];
          updatedCheckboxes[days[dt.getDay()]] = false;
          return updatedCheckboxes;
        });
        //setSelectedCheckboxes({...selectedCheckboxes,[days[dt.getDay()]] : false})

        const filteredEvents = events.filter(
          (event) => event.start !== dateInfo
        );
        setEvents(filteredEvents);
      } else {
        const dayList = getSundays(days[dt.getDay()], dt.getDay());
        let ct = false;

        dayList.forEach((item) => {
          if (
            selectedCheckboxes[item.format("YYYY-MM-DD")] &&
            selectedCheckboxes[item.format("YYYY-MM-DD")] !== undefined
          ) {
            ct = true;
          } else {
            ct = false;
          }
        });
        setSelectedCheckboxes({
          ...selectedCheckboxes,
          [checkboxKey]: true,
          [days[dt.getDay()]]:
            ct == true ? true : selectedCheckboxes[dt.getDay()],
        });
        const existingEvent = events.find((event) => event.start === dateInfo);

        if (!existingEvent) {
          const event = {
            id: selectedEvent._id,
            title: selectedEvent.name,
            start: dateInfo,
          };
          setEvents((prevEvents) => [...prevEvents, event]);
        }
      }
    }
  }

  const handleWeek = async (e, day, dayInfo, iswk = true) => {
    const dayList = getSundays(days[day], day);
    const newArray = selectedCheckboxes;
    if (e.target.checked) {
      dayList.forEach((item) => {
        if (
          moment(item._d).format("YYYY-MM-DD") >=
          moment(new Date()).format("YYYY-MM-DD")
        ) {
          newArray[item.format("YYYY-MM-DD")] = true;
          handleDateCellChange(item.format("YYYY-MM-DD"), iswk);
          newArray[days[day]] = true;
        }
      });
    } else {
      dayList.forEach((item) => {
        if (newArray[item.format("YYYY-MM-DD")] !== undefined) {
          delete newArray[item.format("YYYY-MM-DD")];
        }
        handleDateCellChange(item.format("YYYY-MM-DD"), iswk);
        newArray[days[day]] = false;
      });
    }
    setSelectedCheckboxes(newArray);
  };

  const getSundays = (dayName, dayId) => {
    const result = [];
    var startDate = new Date();
    const cMonth = startDate.getMonth();
    const cYear = startDate.getFullYear();
    var endDate = new Date(cYear, cMonth, 31);
    console.log(startDate, endDate);
    var day = dayId;
    for (var i = 0; i <= 7; i++) {
      if (startDate.toString().indexOf(dayName) !== -1) {
        break;
      }
      startDate = new Date(cYear, cMonth, i);
      console.log(startDate, i);
    }
    startDate = moment(startDate);
    endDate = moment(endDate);
    result.push(startDate);
    var current = startDate.clone();
    while (current.day(7 + day).isBefore(endDate)) {
      result.push(current.clone());
    }
    return result;
  };

  const renderDayHeader = (dayInfo) => {
    const { date } = dayInfo;
    const checkboxKey = dayInfo.date.toISOString();
    //const isChecked = selectedCheckboxes[checkboxKey];

    if (isEventSelected) {
      return (
        <div>
          <input
            className={`day-checkbox checkbox-day-${dayInfo.date.getDay()}`}
            name={`checkbox-${checkboxKey}`}
            type="checkbox"
            id={`checkbox-${checkboxKey}`}
            checked={selectedCheckboxes[days[dayInfo.date.getDay()]]}
            onChange={(e) => {
              handleWeek(e, dayInfo.date.getDay(), dayInfo);
            }}
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
      const checkDate = checkboxKey.split("T")[0];
      const lastDate = moment(checkDate, "YYYY-MM-DD")
        .add("days", 1)
        .format("YYYY-MM-DD");
      let disablePrp = false;
      if (moment(checkDate, "YYYY-MM-DD").add("days", 2) < moment()) {
        console.log(
          "Make Disable",
          moment(checkDate, "YYYY-MM-DD").add("days", 2),
          moment()
        );
        disablePrp = true;
      } else {
        console.log("Make enable");
      }

      return (
        <div className="month-schedule-checkbox">
          <input
            name={`checkbox-${lastDate}`}
            className={`${disablePrp == true ? "disabled-checkbox" : ""}`}
            type="checkbox"
            //disabled={disablePrp}
            checked={isSelected || selectedCheckboxes[lastDate]}
            onChange={() => handleDateCellChange(lastDate, false)}
          />
          {dateInfo.dayNumberText}
        </div>
      );
    }
    return dateInfo.dayNumberText;
  };

  const handlePublish = async (e) => {
    console.log(selectedEvent, "inside handle publish");
    e.preventDefault();
    const dates = Object.keys(selectedCheckboxes).filter(
      (i) =>
        i !== "Sun" &&
        i !== "Mon" &&
        i !== "Tue" &&
        i !== "Wed" &&
        i !== "Thu" &&
        i !== "Fri" &&
        i !== "Sat"
    );
    const payload = {
      scheduleId: id,
      sequenceId: selectedEvent._id,
      dates,
    };
    const res = await pushAddDates(payload);
    console.log(res);
  };

  return (
    <div className="fullcalendar-box">
      <div className="d-flex justify-content-end">
        <Button
          className="mr-2"
          onClick={(e) => {
            handlePublish(e);
          }}
          variant="info add-screen-btn"
        >
          Publish
        </Button>
      </div>

      <div className="event-list">
        <h3>Day Sequence</h3>
        {daySequence.map((event, i) => (
          <div
            key={i}
            className="month-schedule-list mt-4"
            onClick={() => handleEventClick(event)}
          >
            <div className="d-flex align-items-center px-2 py-4 justify-content-between">
              <span>
                {event.name?.length > 4
                  ? event.name.slice(0, 4) + "..."
                  : event.name}
              </span>

              <span className="total-composition">
                Contains {event.timings.length} compositions
              </span>
              <span>
                <img
                  src={edit}
                  className="dropdown-list-img img-fluid"
                  height="25px"
                  width="25px"
                />
              </span>
              <span>
                <img
                  src={deleteIcon}
                  className="dropdown-list-img img-fluid"
                  height="30px"
                  width="30px"
                />
              </span>
              <span className="add-btn">Add to Calendar </span>
            </div>
          </div>
        ))}
      </div>
      <div className="calendar" style={{ float: "left", width: "55%" }}>
        <FullCalendar
          className="month-schedule"
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          selectable={true}
          events={events}
          dayHeaderContent={renderDayHeader}
          dayCellContent={renderDateCell}
          //validRange={{"start":moment().format('YYYY-MM-DD'),'end':null}}
          eventContent={(info) => (
            <div className="month-schedule-event">
              <div>
                {info.event.title.length > 5
                  ? info.event.title.slice(0, 5) + "..."
                  : info.event.title}
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
}
