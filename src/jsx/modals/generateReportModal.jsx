import { Button, Modal, Row, Col, Badge } from "react-bootstrap";
import cancelIcon from "../../img/cancel-icon.png";

import Select from "react-select";
import { useEffect, useState } from "react";
import { getReports } from "../../utils/api";
import { useHistory } from "react-router-dom";
import ReportsList from "../components/reports/reportsList";

const GenerateReportModal = ({ close, show, reportType, type }) => {
  console.log(reportType, "kkmkmkk");
  const history = useHistory();
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

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dailyShow, setDailyShow] = useState(false);
  const [monthlyShow, setMonthlyShow] = useState(false);
  const [customShow, setCustomShow] = useState(false);

  const handleClick = (event) => {
    setDailyShow((current) => !current);
    setMonthlyShow(false);
    setCustomShow(false);
  };
  const handleClickMonthly = (event) => {
    setMonthlyShow((current) => !current);
    setDailyShow(false);
    setCustomShow(false);
  };
  const handleClickCustom = (event) => {
    setCustomShow((current) => !current);
    setMonthlyShow(false);
    setDailyShow(false);
  };
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
      setStartDate(startDate);
      setEndDate(endDate);
      console.log(startDate, endDate, "oooooooo");
    }
  }, [selectedOption, selectedOptionaa]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    history.push(
      `/reports-list?startDate=${startDate}&endDate=${endDate}&type=${type}`
    );
    close();
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
              <div onClick={() => handleClick()}>
                {" "}
                <label>Daily</label>
                <input
                  type="date"
                  className="  form-control "
                  placeholder="App Name"
                  onChange={(e) => setDailyDate(e.target.value)}
                  required
                  disabled={customShow || monthlyShow}
                />
              </div>

              <div onClick={() => handleClickMonthly()}>
                <>
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
                        isDisabled={dailyShow || customShow}
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
                        isDisabled={dailyShow || customShow}
                      />
                    </div>
                  </div>
                </>
              </div>
              <div onClick={() => handleClickCustom()}>
                <label className="mt-3">Custom</label>
                <div className="row">
                  <div className="col-6">
                    <input
                      type="date"
                      className="  form-control "
                      onChange={(e) => setStartDate(e.target.value)}
                      disabled={dailyShow || monthlyShow}
                    />
                  </div>
                  <div className="col-6">
                    <input
                      type="date"
                      className="form-control "
                      onChange={(e) => setEndDate(e.target.value)}
                      disabled={dailyShow || monthlyShow}
                    />
                  </div>
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
