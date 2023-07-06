import { Button, Modal, Row, Col, Badge } from "react-bootstrap";
import cancelIcon from "../../img/cancel-icon.png";

import Select from "react-select";
import { useEffect, useState } from "react";
import { getReports } from "../../utils/api";

const GenerateReportModal = ({
  close,
  show,

  reportType,
}) => {
  console.log(reportType, "kkmkmkk");

  const monthOptions = [
    { value: "Jan", label: "January" },
    { value: "Feb", label: "February" },
    { value: "Mar", label: "March" },
    { value: "Apr", label: "April" },
    { value: "May", label: "May" },
    { value: "Jun", label: "June" },
    { value: "Jul", label: "July" },
    { value: "Aug", label: "August" },
    { value: "Sep", label: "September" },
    { value: "Oct", label: "October" },
    { value: "Nov", label: "November" },
    { value: "Dec", label: "December" },
  ];
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptionaa, setSelectedOptionaa] = useState(null);
  const [dailyDate, setDailyDate] = useState("");
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  useEffect(() => {
    setStartDate(dailyDate);
    setEndDate(dailyDate);
  }, [dailyDate]);
  console.log(startDate, endDate, "ooooo");
  console.log(dailyDate, "dailyDate");
  console.log(selectedOption?.value, "iiiioo");
  const yearOptions = [];
  const currentYear = new Date().getFullYear();

  for (let i = currentYear - 5; i <= currentYear; i++) {
    yearOptions.push({ value: String(i), label: String(i) });
  }

  // Output the year options

  const colourStyles = {
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      // const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: isFocused ? "#ed9bc7" : null,
        color: "#333333",
      };
    },
  };

  useEffect(() => {
    if (selectedOption !== null && selectedOptionaa !== null) {
      const numberOfDays = new Date(
        selectedOptionaa?.value,
        new Date(
          selectedOption?.value + " 1," + selectedOptionaa?.value
        ).getMonth() + 1,
        0
      ).getDate();

      // Create the start date
      const startDate = new Date(
        selectedOptionaa?.value,
        new Date(
          selectedOption?.value + " 1," + selectedOptionaa?.value
        ).getMonth(),
        2
      )
        .toISOString()
        .split("T")[0];

      // Create the end date
      const endDate = new Date(
        selectedOptionaa?.value,
        new Date(
          selectedOption?.value +
            " " +
            numberOfDays +
            "," +
            selectedOptionaa?.value
        ).getMonth(),
        numberOfDays + 1
      )
        .toISOString()
        .split("T")[0];
      console.log(startDate, endDate, "oooooooo");
    }
  }, [selectedOption, selectedOptionaa]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await getReports(startDate, endDate).then((res) => {
      console.log(res, "res schedule getReports");
      //   if (res.data.statusCode === 200) {
      //     console.log(res.data.data.name);
      //     history.push(`/testday/${res.data.data._id}/${res.data.data.name}`);
      //   }
    });
  };
  return (
    <>
      <Modal
        className="fade bd-example-modal-lg mt-4 app-modal"
        show={show}
        size="md"
      >
        <Modal.Header className="border-0 d-flex justify-content-between align-items-center">
          <div>
            <Modal.Title className="mr-auto">Report</Modal.Title>

            <p>How would you like to generate your report?</p>
          </div>

          <Button variant="" className="close" onClick={() => close(false)}>
            <img
              className="cancel-icon"
              src={cancelIcon}
              alt="cancel-icon"
              height="25px"
              width="25px"
            />
          </Button>
        </Modal.Header>
        <Modal.Body style={{ paddingBottom: "15px" }}>
          <form onSubmit={handleSubmit} className="row">
            <div className="form-group col-12 mb-0  url-app-form border-0">
              <label>Daily</label>
              <input
                type="date"
                className="  form-control "
                placeholder="App Name"
                onChange={(e) => setDailyDate(e.target.value)}
                required
              />

              <label className="mt-3">Monthly</label>
              <div className="row">
                <div className="col-6">
                  <Select
                    defaultValue={selectedOption}
                    onChange={setSelectedOption}
                    options={monthOptions}
                    styles={colourStyles}
                    placeholder="month"
                    className="app-option"
                  />
                </div>
                <div className="col-6">
                  <Select
                    defaultValue={selectedOptionaa}
                    onChange={setSelectedOptionaa}
                    options={yearOptions}
                    styles={colourStyles}
                    placeholder="year"
                    className="app-option"
                  />
                </div>
              </div>

              <label className="mt-3">Custom</label>
              <div className="row">
                <div className="col-6">
                  <input
                    type="date"
                    className="  form-control "
                    onChange={(e) => setCustomStartDate(e.target.value)}
                  />
                </div>
                <div className="col-6">
                  <input
                    type="date"
                    className="form-control "
                    onChange={(e) => setCustomEndDate(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="w-100 mt-3">
              <Button
                variant=""
                type="submit"
                className="btn btn-primary btn-block primary-btn"
                //   onClick={() => setNewTagModal(false)}
              >
                Continue
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default GenerateReportModal;
