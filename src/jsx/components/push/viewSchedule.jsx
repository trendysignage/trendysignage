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
import da from "date-fns/locale/da/index.js";
import { toast } from 'react-toastify';
export default function ViewSchedule() {
  const history = useHistory();
  const { id } = useParams();
  const [events, setEvents] = useState([]);
  const [daySequence, setDaySequence] = useState([]);
  const [timings, setTimings] = useState([]);
  const [selectedTime, setSelectedTime] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  //var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];


    const callAllDaySequence = async (id) => {
        const list = await getAllDaySequence(id);
        setDaySequence(list.sequence);
        const seqArray = [];
        if(list && list.sequence && list.sequence[0] && list.sequence.length > 0){
            
            var flat = [];
            const datesTiming = [];
            for (var i = 0; i < list.sequence.length; i++) {
                flat = flat.concat(list.sequence[i].dates);
                list.sequence[i].dates.forEach((v) => {
                    datesTiming[v] = list.sequence[i].timings;
                })
                
            }
            setTimings(datesTiming);
            //console.log("seqArray",seqArray,flat);
            setDatesArray(flat);
        }

        console.log(list, datesArray)
    };
    useEffect(() => {
        callAllDaySequence(id);
    }, [id]);

  const [currentMonth, setCurrentMonth] = useState(0);
  const [datesArray, setDatesArray] = useState();

 // useEffect(() => {}, [selectedCheckboxes]);


  const renderDayHeader = (dayInfo) => {
    const { date } = dayInfo;
    const checkboxKey = dayInfo.date.toISOString();
    //const isChecked = selectedCheckboxes[checkboxKey];
    return (
        <div>{date.toLocaleDateString("en-US", { weekday: "short" })}</div>
    );
  };

  const handleDayTime = (e, dateInfo) => {
    e.preventDefault();
    const str = dateInfo+"T00:00:00.000Z";
    setSelectedTime(timings[str]);
    setSelectedDate(dateInfo);
  }

  const renderDateCell = (dateInfo) => {
    const checkboxKey = dateInfo.date.toISOString();
      const lastDate = moment(checkboxKey, "YYYY-MM-DD")
        .add("days", 1)
        .format("YYYY-MM-DD");  
        const isSelected = datesArray && datesArray.length > 0 ? datesArray.find((item) => {
            return item.split("T")[0] === lastDate
        }) : false;
        let disablePrp = false;

        return (
            <div className="month-schedule-checkbox">
                {isSelected ? <button className="btn" onClick = {(e) => {handleDayTime(e, lastDate)}}>{dateInfo.dayNumberText}</button> : <></>}
            {/* <input
                name={`checkbox-${lastDate}`}
                className={`${disablePrp == true ? "disabled-checkbox" : ""}`}
                type="checkbox"
                disabled={true}
                checked={isSelected}
                //onChange={() => handleDateCellChange(lastDate, false)}
                onClick = {() => {console.log("Hello", lastDate)}}
            /> */}
            {dateInfo.dayNumberText}
            </div>
        );
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

  const renderTime = (data) => {
    let d = data.split("T")[1];
    d = d.split(":");
    return d[0]+":"+d[1];
  }

  return (
    <>
      
      <div className="fullcalendar-box">
        <div className="d-flex justify-content-end">
          <Button
            className="mr-2"
            // onClick={(e) => {
            //   handlePublish(e);
            // }}
            variant="info add-screen-btn"
          >
            Publish
          </Button>
        </div>

        <div className="event-list">
          <h3>{selectedDate  && selectedDate}</h3>
          {selectedTime && selectedTime.map((event, i) => (
            <div
              key={i}
              className="month-schedule-list mt-4"
            >
              <div className="d-flex align-items-center px-2 py-4 justify-content-between">
                <span>
                  {event.composition.name?.length > 20
                    ? event.composition.name.slice(0, 20) + "..."
                    : event.composition.name}
                </span>

                <span className="total-composition">
                    {renderTime(event.startTime)}
                </span>
                <span className="total-composition">
                    {renderTime(event.endTime)}
                </span>
                {/* <span>
                  <img
                    src={deleteIcon}
                    className="dropdown-list-img img-fluid"
                    height="30px"
                    width="30px"
                  />
                </span> */}
              </div>
            </div>
          ))}
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
