import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Button } from "react-bootstrap";
import moment from "moment";
import { Link } from 'react-router-dom'
import {
  deleteSequence,
  getAllDaySequence,
  pushAddDates,
} from "../../../utils/api";
import { useParams, useHistory } from "react-router-dom";
import edit from "../../../img/edit-composition.png";
import deleteIcon from "../../../img/delete-icon.png";
import da from "date-fns/locale/da/index.js";
import { toast } from "react-toastify";
export default function DesignMonthSchedule() {
  const history = useHistory();
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);
  const [daySequence, setDaySequence] = useState([]);
  const [activeCard, setActiveCard] = useState(false);
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [isEventSelected, setIsEventSelected] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(0);

  var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handleEventClick = (event) => {
    //setEvents([]);
    setSelectedEvent(event);
    setSelectedDate(null); // Reset selected date
    //setSelectedCheckboxes([]);
    setIsEventSelected(true);
  };

  const callAllDaySequence = async (id) => {
    const list = await getAllDaySequence(id);
    setDaySequence(list.sequence);
    console.log("list.sequence",list.sequence);
    list.sequence.forEach((item) => {
      if(item.dates && item.dates.length > 0){
        console.log("isLoading:true")
        const datesList = [];
        item.dates.forEach((item2) => {
          datesList.push(item2.split("T")[0]+"*****"+item._id)
        })
        //console.log("selectedEvent",selectedEvent)
        handlCustomeWeek(datesList, item, true);
        }
    });
    console.log("isLoading:false")
  };
  useEffect(() => {
    callAllDaySequence(id);
  }, [id]);


  useEffect(() => {}, [selectedCheckboxes,selectedEvent]);

  

  function handleDateCellChange(dateInfo, isWk, isCustom=false,ev={}) {
    if(!isCustom){
      const checkboxKey = dateInfo + "*****" + selectedEvent._id;
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
    }else{
      const checkboxKey = dateInfo;
      setSelectedCheckboxes({ ...selectedCheckboxes, [checkboxKey]: true });
      const existingEvent = events.find((event) => event.start === dateInfo.split("*****")[0]);
      if (!existingEvent) {
        const event = {
          id: ev._id,
          title: ev.name,
          start: dateInfo.split("*****")[0],
        };
        setEvents((prevEvents) => [...prevEvents, event]);
      }
    }
  }

  const handlCustomeWeek = async (dayList,ev,iswk = true) => {
    const newArray = selectedCheckboxes;
    dayList.forEach((item) => {
      const checkboxKey = item;
      if (
        moment(item.split("*****")[0]).format("YYYY-MM-DD") >=
        moment(new Date()).format("YYYY-MM-DD")
      ) {
        newArray[checkboxKey] = true;
        handleDateCellChange(item, true, true, ev);
      }
    });
    setSelectedCheckboxes(newArray);
    handleEventClick(ev)
  };

  const handleWeek = async (e, day, dayInfo, iswk = true) => {
    const dayList = getSundays(days[day], day);
    const newArray = selectedCheckboxes;
    if (e.target.checked) {
      dayList.forEach((item) => {
        const checkboxKey =
          item.format("YYYY-MM-DD") + "*****" + selectedEvent._id;
        if (
          moment(item._d).format("YYYY-MM-DD") >=
          moment(new Date()).format("YYYY-MM-DD")
        ) {
          newArray[checkboxKey] = true;
          handleDateCellChange(item.format("YYYY-MM-DD"), iswk);
          newArray[days[day]] = true;
        }
      });
    } else {
      dayList.forEach((item) => {
        const checkboxKey =
          item.format("YYYY-MM-DD") + "*****" + selectedEvent._id;
        if (newArray[checkboxKey] !== undefined) {
          delete newArray[checkboxKey];
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
    const cMonth = currentMonth;
    const cYear = startDate.getFullYear();
    var endDate = new Date(cYear, cMonth, 31);
    var day = dayId;
    for (var i = 0; i <= 7; i++) {
      if (startDate.toString().indexOf(dayName) !== -1) {
        break;
      }
      startDate = new Date(cYear, cMonth, i);
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
        <div className="month-schedule-header-checkbox">
          <input
            className={`day-checkbox checkbox-day-${dayInfo.date.getDay()} month--${currentMonth}`}
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
        disablePrp = true;
      }
      let checker = false;
      daySequence.forEach((i) => {
        if (selectedCheckboxes[lastDate + "*****" + i._id] !== undefined) {
          checker = true;
        }
      });

      return (
        <div className="month-schedule-checkbox">
          <input
            name={`checkbox-${lastDate}`}
            className={`${disablePrp == true ? "disabled-checkbox" : ""}`}
            type="checkbox"
            //disabled={disablePrp}
            checked={isSelected || selectedCheckboxes[lastDate] || checker}
            onChange={() => handleDateCellChange(lastDate, false)}
          />
          {dateInfo.dayNumberText}
        </div>
      );
    }
    return dateInfo.dayNumberText;
  };

  const makePublishData = (data) => {
    const result = [];
    daySequence.forEach((item) => {
      const newA = [];
      data.forEach((items, i) => {
        const spl = items.split("*****");
        const dt = spl[0];
        const sq = spl[1];
        if (sq === item._id) {
          newA.push(dt);
        }
      });
      if (newA.length > 0) {
        result.push({
          sequenceId: item._id,
          dates: newA,
        });
      }
    });
    return result;
  };

  const handlePublish = async (e) => {
    e.preventDefault();

    //console.log("selectedCheckboxes",selectedCheckboxes);

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
    const publishData = makePublishData(dates);
    if (!publishData || publishData.length == 0) {
      toast.error("Please select at least one date", {
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
      scheduleId: id,
      scheduleArray: publishData,
    };
    await pushAddDates(payload).then((res) => {
      if (res.data.statusCode === 200) {
        history.push(`/push`);
      }
    });
  };

  const getCurrentMonth = (arg) => {
    const startDate = arg.view.activeStart;
    if (arg.view.type === "dayGridMonth") {
      setCurrentMonth(startDate.getMonth() + 1);
      return;
    }
    if (arg.view.type === "dayGridDay") {
      startDate.setDate(startDate.getDate() + 8);
      setCurrentMonth(startDate.getMonth() + 1);
      return;
    }
  };

  const handleDeleteSequesce = async (sequenceId, id) => {
    await deleteSequence(sequenceId, id).then((res) => {
      if (res.data.statusCode === 200) {
        callAllDaySequence(id);
      }
    });
  };

  const handleButtonClick = (index) => {
    setSelectedButtonIndex(index);
    // Perform any other logic specific to the clicked button
  };
  return (
    <>
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
          <div className="d-flex align-items-center justify-content-between pb-4">
            <h3 className="p-0">Day Sequence</h3>
            <Link to={`/testday/${id}/hasd`} className="mr-2" variant="info add-screen-btn">
              Create New
            </Link>
          </div>

          {daySequence.map((event, i) => {
            return (
              <div
                key={i}
                className="month-schedule-list mt-4"
                onClick={() => {
                  handleButtonClick(i);
                  handleEventClick(event);
                  // setActiveCard(true);
                }}
              >
                <div
                  className="d-flex align-items-center px-2 py-4 justify-content-between"
                  style={{
                    boxShadow:
                    selectedEvent && selectedEvent._id && selectedEvent._id === event._id
                        ? "rgba(0, 0, 0, 0.5) 0px 10px 6px"
                        : "",
                  }}
                  // className={
                  //   selectedButtonIndex === i
                  //     ? "zone zone-active "
                  //     : "zone"
                  // }
                >
                  <span>
                    {event.name?.length > 6
                      ? event.name.slice(0, 6) + "..."
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
                  <span onClick={() => handleDeleteSequesce(event._id, id)}>
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
            );
          })}
        </div>
        <div className="calendar" style={{ float: "left", width: "55%" }}>
          <FullCalendar
            className="month-schedule"
            weekends={true}
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            selectable={true}
            events={events}
            dayHeaderContent={renderDayHeader}
            dayCellContent={renderDateCell}
            //validRange={{"start":moment().format('YYYY-MM-DD'),'end':null}}
            datesSet={(arg) => getCurrentMonth(arg)}
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
    </>
  );
}
