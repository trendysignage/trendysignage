import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@mui/material";
import moment from "moment";
import Moment from "react-moment";
import Clock from "../jsx/components/Clock";
import { getWeather } from "./api";
import Parser from "rss-parser";
import img from "../../src/img/moderate.png";
import weathericon from "../../src/img/other-weather.svg";
import imgexample from "../../src/img/hh.jpeg";
import yellow from "../../src/img/push-pin 1.svg";
import orange from "../../src/img/push-pin 2.svg";
import blue from "../../src/img/push-pin 3.svg";
import person from "../../src/img/Ellipse 154.png";
import Celsius from "../../src/img/thermometer 1.svg";
import { BASE_URL } from "./api";
import Iframe from "react-iframe";
import Slide from "@mui/material/Slide";
import QRCode from "react-qr-code";
import { Table } from "react-bootstrap";
import quote from "../../src/img/quote.svg";
import newsimg from "../../src/img/news-image.webp";

export const isValidDate = (d) => {
  return d instanceof Date && !isNaN(d);
};

export const formattedDateString = (d) => {
  d = new Date(d);
  const yyyy = d.getFullYear();
  const mm = dateDigits(d.getMonth() + 1);
  const dd = dateDigits(d.getDate());
  return yyyy + "-" + mm + "-" + dd;
};

export const humanReadableFormattedDateString = (date) => {
  date = new Date(date);
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let day = dateDigits(date.getDate());
  let month = months[date.getMonth()];
  let year = date.getFullYear();
  return day + " " + month + ", " + year;
};

export const formattedTimeString = (d) => {
  d = new Date(d);
  return dateDigits(d.getHours()) + ":" + dateDigits(d.getMinutes()) + ":00";
};

export const getHOrMFromLocalTimeString = (localTimeString, hOrM = "h") => {
  const localTimeArr = localTimeString.split(":");
  if (localTimeArr.length > 1) {
    if (hOrM === "h") {
      return +localTimeString.split(":")[0];
    } else {
      return +localTimeString.split(":")[1];
    }
  } else {
    return 0;
  }
};

export const dateDigits = (v, digits = 2) => {
  let str = "";
  for (let i = digits; i > 1; i--) {
    str += "0";
  }

  return (str + v).slice(-digits);
};

export const currencyFormat = (num, toFixed = 2) => {
  num = num ? +num : 0;
  return "$" + num.toFixed(toFixed).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

export const numberThFormat = (num) => {
  switch (num) {
    case 1:
      return num + "st";
      break;
    case 2:
      return num + "nd";
      break;
    case 3:
      return num + "rd";
      break;
    default:
      return num + "th";
      break;
  }
};

export const priceValue = (formattedPrice = "$0.00") => {
  formattedPrice = formattedPrice ? formattedPrice + "" : "$0.00";
  return +formattedPrice
    .split(",")
    .join("")
    .split(" ")
    .join("")
    .split("$")
    .join("");
};

export const isMobile = () => {
  return window.innerWidth < 768;
};

export const randomStr = (length) => {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const defaultPeriods = [
  {
    dayOfWeek: "SUN",
    startLocalTime: "7:00:00",
    endLocalTime: "20:00:00",
    closed: false,
  },
  {
    dayOfWeek: "MON",
    startLocalTime: "7:00:00",
    endLocalTime: "20:00:00",
    closed: false,
  },
  {
    dayOfWeek: "TUE",
    startLocalTime: "7:00:00",
    endLocalTime: "20:00:00",
    closed: false,
  },
  {
    dayOfWeek: "WED",
    startLocalTime: "7:00:00",
    endLocalTime: "20:00:00",
    closed: false,
  },
  {
    dayOfWeek: "THU",
    startLocalTime: "7:00:00",
    endLocalTime: "20:00:00",
    closed: false,
  },
  {
    dayOfWeek: "FRI",
    startLocalTime: "7:00:00",
    endLocalTime: "20:00:00",
    closed: false,
  },
  {
    dayOfWeek: "SAT",
    startLocalTime: "7:00:00",
    endLocalTime: "20:00:00",
    closed: false,
  },
];

export const getDatetimeIn12Hours = (datetimeString) => {
  const date = new Date(datetimeString);
  const options = { hour: "numeric", minute: "numeric", hour12: true };
  return date.toLocaleTimeString("en-US", options);
};
export const isBlobUrl = (url) => {
  return url.startsWith("blob:");
};

export const sliceIntoChunks = (arr, chunkSize) => {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    res.push(chunk);
  }
  return res;
};

export const handleBulletinApps = (data) => {
  const prp = JSON.parse(data);
  const newArray = sliceIntoChunks(prp.bulletin, 3);
  return (
    <div
      className="basic-list-group image-preview-container media-content  bulletin-bg text-black"
      style={{ color: "white", textAlign: "center" }}
    >
      {prp.bulletin && prp.bulletin.length > 0 ? (
        <>
          {newArray.length > 0 && (
            <>
              <div className=" h-100" style={{ margin: "2%" }}>
                <Carousel
                  interval={5000}
                  indicators={false}
                  animation={"slide"}
                  className="h-100"
                >
                  {newArray.map((item, i) => {
                    return (
                      <div className="h-100">
                        <div className="row h-100">
                          {item.map((item1, index1) => {
                            return (
                              <>
                                <div
                                  className="bg-white text-center d-flex "
                                  style={{
                                    borderRadius: "18px",
                                    margin: "20px",
                                    flexDirection: "column",
                                    width: "30%",
                                  }}
                                >
                                  <div>
                                    <img src={imgexample} alt="image" />
                                  </div>
                                  <div className="mt-2" key={i + "dd" + index1}>
                                    <strong>{item1.title}</strong>
                                    <p>{item1.content}</p>
                                  </div>
                                </div>
                              </>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </Carousel>
              </div>
            </>
          )}
        </>
      ) : (
        <div className="single-bulletin-app d-flex">
          <div className="d-flex w-100">
            <div className="w-50">
              <img src={imgexample} alt="image" style={{ objectFit: "fill" }} />
            </div>
            <div className="flex-1 text-start single-bulletin-text">
              <div style={{ width: "40px" }} className="mb-3">
                {/* <img src={yellow} alt="icon" />
                <img src={blue} alt="icon" /> */}
                <img src={orange} alt="icon" />
              </div>
              <strong>title</strong>
              <p>content</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const monthName = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "June",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
export const dayName = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const handleScrollerApps = (data) => {
  const prp = JSON.parse(data);
  console.log("prp", prp, prp.speed.value, "high");
  const speed =
    prp.speed.value === "high" ? 20 : prp.speed.value === "medium" ? 10 : 5;
  let allignment = "left";

  if (prp.allign.value == "rightToLeft") {
    allignment = "right";
  }
  let txt = "";
  console.log("Speed", speed, allignment);
  if (prp.style.value == "italic") {
    txt = (
      <i>
        <marquee
          direction={allignment}
          scrollAmount={speed}
          style={{ color: prp.textColor, fontSize: "150px" }}
        >
          {prp.text}
        </marquee>
      </i>
    );
  } else if (prp.style.value == "bold") {
    txt = (
      <b>
        <marquee
          direction={allignment}
          scrollAmount={speed}
          style={{ color: prp.textColor, fontSize: "150px" }}
        >
          {prp.text}
        </marquee>
      </b>
    );
  } else {
    txt = (
      <marquee
        direction={allignment}
        scrollAmount={speed}
        style={{ color: prp.textColor, fontSize: "150px" }}
      >
        {prp.text}
      </marquee>
    );
  }
  return (
    <div
      className="basic-list-group image-preview-container media-content"
      style={{ backgroundColor: prp.backGroundColor }}
    >
      {txt}
    </div>
  );
};

export const handleTextApps = (data) => {
  const prp = JSON.parse(data);
  console.log("text app ", data);
  let txt = "";
  if (prp.style == "Italic") {
    return (
      <div
        className="basic-list-group image-preview-container media-content"
        style={{
          backgroundColor: prp.backGroundColor,
          color: prp.textColor,
          fontWeight: prp.weight,
          textAlign: prp.allign,
          fontSize: "22px",
          padding: "15px",
        }}
      >
        <i>{prp.content}</i>
      </div>
    );
  } else if (prp.style == "Bold") {
    return (
      <div
        className="basic-list-group image-preview-container media-content"
        style={{
          backgroundColor: prp.backGroundColor,
          color: prp.textColor,
          fontWeight: prp.weight,
          textAlign: prp.allign,
          fontSize: "22px",
          padding: "15px",
        }}
      >
        <b>{prp.content}</b>
      </div>
    );
  } else {
    return (
      <div
        className="basic-list-group image-preview-container media-content"
        style={{
          backgroundColor: prp.backGroundColor,
          color: prp.textColor,
          fontWeight: prp.weight,
          textAlign: prp.allign,
          fontSize: "22px",
          padding: "15px",
        }}
      >
        {prp.content}
      </div>
    );
  }
};

export const handleClockApps = (data) => {
  const prp = JSON.parse(data);
  let tF = "";
  Moment.globalLocale = "fr";
  const cdate = new Date();
  let timeZ = prp.timeZone ? prp.timeZone.value : "Asia/Kolkata";
  let chicago_datetime_str = new Date().toLocaleString("en-US", {
    timeZone: timeZ,
  });
  let date_chicago = new Date(chicago_datetime_str);
  //prp.timeFormat = "Analogue - 12 hourt";
  console.log("timeFormat", prp);

  if (
    prp.timeFormat == "Analogue - 12 hour" ||
    prp.timeFormat == "lefAnalogue - 12 hourt"
  ) {
    return (
      <div
        className={`basic-list-group image-preview-container media-content ${
          prp.color
        } ${prp.roundCorner ? "border-bg" : ""}`}
        style={{ fontSize: "50px", color: "#000", textAlign: "center" }}
        // border-bg
      >
        <div style={{ position: "relative", paddingTop: "20px" }}>
          <Clock />
        </div>
        {!prp.hideDate ? (
          <p
            style={{ fontSize: "20px", marginTop: "20px" }}
          >{`${cdate.getDate()} ${monthName[cdate.getDay()]} ${
            dayName[cdate.getDay()]
          } Indian Standard Time`}</p>
        ) : (
          ""
        )}
      </div>
    );
  } else {
    if (prp.timeFormat == "Digital - 12 hour") {
      tF = "hh:mm A";
    } else if (prp.timeFormat == "Digital - 24hour") {
      tF = "HH:MM A";
    }

    return (
      <div
        className={`basic-list-group image-preview-container media-content ${
          prp.color
        } ${prp.roundCorner ? "border-bg" : ""}`}
        style={{ fontSize: "100px", color: "#000", textAlign: "center" }}
      >
        <Moment format={tF} date={date_chicago} locale={"fr"} />
        {/* <Moment>{date_chicago}</Moment> */}
        {!prp.hideDate ? (
          <p style={{ fontSize: "20px" }}>{`${cdate.getDate()} ${
            monthName[cdate.getDay()]
          } ${dayName[cdate.getDay()]} ${timeZ}`}</p>
        ) : (
          ""
        )}
      </div>
    );
  }
};

export const handleWeatherApps = (data, weatherInfo) => {
  //console.log("Hi this is weather", data, weatherInfo)
  const prp = JSON.parse(data);
  console.log("data", prp);
  const theme = prp.theme.value;
  // getWeather('Noida').then((resp) => {
  //   console.log("weatherDetail",resp)
  // });
  return (
    <div
      className="basic-list-group image-preview-container media-content "
      style={{ color: "white" }}
    >
      <div
        className={`classic-bg w-100 h-100 weather-app-bg ${
          prp.isCorner ? "border-bg" : ""
        }`}
      >
        {/* weather-app-bg border-bg */}
        <div className="place-date-time d-flex align-items-center justify-content-between ">
          <div className="place-date">
            <h1>{weatherInfo && weatherInfo.city && weatherInfo.city.name}</h1>
            <p>
              <Moment
                format={"D MMM YYYY"}
                date={new Date()}
                interval={10000}
              />
            </p>
          </div>
          <div className="time">
            <p className="mb-0">
              <Moment format={"HH:MM A"} date={new Date()} interval={10000} />
            </p>
          </div>
        </div>
        <div className="row temperature-box">
          <div className="col-6 temperature text-white">
            <div className="d-flex align-items-center">
              <h1 className="text-white mb-0">
                {weatherInfo &&
                  weatherInfo.list &&
                  weatherInfo.list[1] &&
                  (prp && prp.temp === "Celsius"
                    ? (weatherInfo.list[1].main.temp / 10).toFixed(1)
                    : ((weatherInfo.list[1].main.temp * 9) / 50 + 32).toFixed(
                        1
                      ) + " F")}
              </h1>{" "}
              <span className="Celsius ml-2">
                <img src={Celsius} />
              </span>
            </div>

            <h2 className="text-white">
              {weatherInfo &&
                weatherInfo.list &&
                weatherInfo.list[1] &&
                weatherInfo.list[1].weather[0].description}
            </h2>
          </div>
          <div className="col-6">
            <div className="row other-day-weather">
              {prp &&
                prp.isForcast &&
                weatherInfo &&
                weatherInfo.list &&
                weatherInfo.list.map((item, index) => {
                  return (
                    (index == 15 ||
                      index == 22 ||
                      index == 29 ||
                      index == 36) && (
                      <div className="col-6">
                        <p className="day">
                          <Moment
                            format={"D MMM YYYY"}
                            date={new Date(item.dt_txt)}
                          />
                        </p>
                        <div className="d-flex align-items-center">
                          <h2>
                            {prp.temp === "Celsius"
                              ? (item.main.temp / 10).toFixed(1)
                              : ((item.main.temp * 9) / 50 + 32).toFixed(1) +
                                " F"}
                          </h2>
                          <span className="Celsius ml-2">
                            <img src={Celsius} />
                          </span>
                        </div>

                        <p>{item.weather[0].description}</p>
                      </div>
                    )
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const handleQrApps = (data) => {
  const prp = JSON.parse(data);
  console.log(prp, "utilsservice");
  return (
    <div
      className={`qr-app-container ${prp.color ? prp.color.value : "orange"}`}
    >
      <div className="qr-box">
        <div className=" qr">
          <QRCode size={150} value={prp.url} viewBox={`0 0 256 256`} />
        </div>
        <div className="text">
          {prp.image && prp.image !== undefined ? (
            <img style={{ width: "200px" }} src={BASE_URL + prp.image} />
          ) : (
            ""
          )}
          <h3>{prp.appTitle}</h3>
          <p className="mb-3">{prp.appTitle}</p>
          <p
            className={`mb-0 url ${prp.color ? prp.color.value : "orange"}Url`}
          >
            {prp.appDesc}
          </p>
        </div>
      </div>
    </div>
  );
};

export const handleRssApps = (data) => {
  console.log("data rss", data);
  //const prp = JSON.parse(data);
  return (
    <div
      className="basic-list-group image-preview-container media-content"
      style={{ color: "white", textAlign: "center" }}
    >
      {data.urlLink.items.length > 0 && (
        <>
          <div
          // className={`h-100 ${
          //   data.theame.value == "White Background" ? "bg-white" : "bg-black"
          // } `}
          // style={{ padding: "5% 2% 2% 2%" }}
          >
            <Carousel
              interval={data.slideDuration * 1000}
              indicators={false}
              animation={"slide"}
              className="h-100 aaa"
            >
              {data.urlLink.items.map((item, i) => {
                return (
                  <div
                    className="h-100 "
                    style={{
                      background: `url(${newsimg})`,
                      backgroundColor: "rgba(248, 247, 216, 0.7)",
                      backgroundPosition: "bottom center",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                    }}
                  >
                    <div className=" h-100 uuuuu">
                      <div
                        className="text-center  "
                        // style={{
                        //   borderRadius: "18px",
                        //   margin: "20px",
                        //   flexDirection: "column",
                        //   width: "30%",
                        // }}
                      >
                        {/* <div>
                            <img src={imgexample} alt="image" />
                          </div> */}
                        <div className="mt-2 hhhhhh" key={i}>
                          <h1
                            className={`${
                              data.theame.value == "White Background"
                                ? "text-black"
                                : "text-white"
                            } `}
                          >
                            {/* text-white */}

                            {item["title"]}
                          </h1>
                          <p
                            className={`${
                              data.theame.value == "White Background"
                                ? "text-black"
                                : "text-white"
                            } `}
                          >
                            {item["content"]}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Carousel>
          </div>
        </>
      )}
    </div>
  );
};

export const handleStockApps = (data, stock) => {
  const prp = JSON.parse(data);
  console.log(prp, "kkkk");
  return (
    <div
      className="basic-list-group image-preview-container media-content"
      style={{ color: "white", textAlign: "center" }}
    >
      <div className="bg-black text-white h-100">
        <Table
          responsive
          className="custom-table screen-table mb-5 text-center stock-table"
        >
          <thead>
            <tr>
              <th>STOCK</th>
              <th>PRICE</th>
              <th>% CHANGE</th>
              {prp.isPriceChange ? <th>CHANGE</th> : ""}
              {prp.volume ? <th>VOLUMES</th> : ""}
              {prp.isHigh ? <th>52 Wk HIGH</th> : ""}
              {prp.isLow ? <th>52 Wk LOW</th> : ""}
            </tr>
          </thead>

          <tbody>
            {stock &&
              stock.length > 0 &&
              stock.map((item, index) => {
                return (
                  index < 10 && (
                    <tr>
                      <td className="stockTd">{item.ticker}</td>
                      <td className="stockTd">{item.price}</td>
                      <td
                        className={`${item.changes < 0 ? "losers" : "gainers"}`}
                      >
                        {item.changesPercentage}
                      </td>
                      {prp.isPriceChange ? (
                        <td className="stockTd">{item.changes} %</td>
                      ) : (
                        ""
                      )}
                      {prp.volume ? <td>--</td> : ""}
                      {prp.isHigh ? <td>--</td> : ""}
                      {prp.isLow ? <td>--</td> : ""}
                    </tr>
                  )
                );
              })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export const handleAqiApps = (data, weatherInfo) => {
  const prp = JSON.parse(data);
  return (
    <div className="basic-list-group image-preview-container media-content text-black bg-color-air-app">
      <div className="air-quality-app-container d-flex  justify-content-center align-items-center h-100 bg-white">
        <div className="d-flex text-black justify-content-evenly  w-100">
          <div className="air-quality text-center ">
            <div>
              <p className="mb-0">AQI Value</p>
              <h1 className="text-black">
                {weatherInfo &&
                  weatherInfo.list &&
                  weatherInfo.list[1] &&
                  weatherInfo.list[1].main.humidity}
              </h1>
              <p className="mb-0 moderate">MODERATE</p>
            </div>
          </div>
          <div className="d-flex ">
            <div>
              <h2>
                {weatherInfo && weatherInfo.city && weatherInfo.city.name}
              </h2>
              <p>
                <Moment
                  format={"D MMM YYYY"}
                  date={new Date()}
                  interval={10000}
                />
              </p>
              <div className="d-flex other-detail text-center gap-1">
                {weatherInfo &&
                  weatherInfo.list &&
                  weatherInfo.list.map((item, index) => {
                    return (
                      (index == 15 ||
                        index == 22 ||
                        index == 29 ||
                        index == 36) && (
                        <div>
                          <img
                            src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                            alt=""
                          />
                          <p className="mb-0">Weather</p>
                          <h4>{item.main.humidity}</h4>
                        </div>
                      )
                    );
                  })}
              </div>
            </div>
          </div>

          <div>
            <img src={img} alt="icon" style={{ height: "220px" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export const handleQuoteApps = (data, quoteData) => {
  const prp = JSON.parse(data, quoteData);
  return (
    <div
      className={`basic-list-group image-preview-container media-content  bulletin-bg text-black ${prp.color.value}`}
      style={{ color: "white", textAlign: "center" }}
    >
      <Carousel
        interval={10000}
        indicators={false}
        animation={"slide"}
        className="h-100"
      >
        {quoteData &&
          quoteData.length > 0 &&
          quoteData.map((item1, index1) => {
            {
              console.log(item1, item1.quote);
            }
            return (
              <>
                <div
                  key={index1}
                  className="text-center d-flex "
                  style={{
                    borderRadius: "18px",
                    margin: "20px",
                    marginTop: "25%",
                    flexDirection: "column",
                  }}
                >
                  <div>
                    <img
                      src={quote}
                      style={{ height: "50px" }}
                      alt="quote-icon"
                    />
                  </div>
                  <div className="mt-2">
                    {prp.fontStyle.value == "italic" ? (
                      <>
                        <strong>
                          <i>{item1["quote"]}</i>
                        </strong>
                        <p>
                          <i>- {item1.author}</i>
                        </p>
                      </>
                    ) : (
                      ""
                    )}
                    {prp.fontStyle.value == "regular" ? (
                      <>
                        <strong>{item1["quote"]}</strong>
                        <p>{item1.author}</p>
                      </>
                    ) : (
                      ""
                    )}

                    {prp.fontStyle.value == "bold" ? (
                      <>
                        <strong>
                          <b>{item1["quote"]}</b>
                        </strong>
                        <p>
                          <b>{item1.author}</b>
                        </p>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </>
            );
          })}
      </Carousel>
    </div>
  );
};

export const handleNewsApps = (data, newsData) => {
  const prp = JSON.parse(data);
  console.log("news", newsData);
  return (
    <>
      {/* <div className="bg-white h-100">
        <div
          className={`${
            prp.theame.value == "white" ? "news-app-bg" : "bg-black"
          } p-3 h-100`}
        >
          <div
            className="basic-list-group image-preview-container media-content "
            style={{ color: "white", textAlign: "center" }}
          >
            <h2
              className={`${
                prp.theame.value == "white" ? "" : "text-white"
              } mb-0`}
            >
              News About {prp.topic.value}
            </h2>
            <Carousel
              interval={10000}
              indicators={false}
              animation={"slide"}
              className="h-100"
            >
              {newsData &&
                newsData.items.map((item, i) => {
                  {
                    console.log(item.title);
                  }
                  return (
                    <>
                      <Slide direction="right" in={true} timeout={1000}>
                        <div
                          style={{
                            maxWidth: "100%",
                            minWidth: "70%",
                            height: "5px",
                            background: "#fff",
                            margin: "2rem 0",
                            display: "inline-block",
                          }}
                        ></div>
                      </Slide>
                      <div className=" h-100" key={i}>
                        <div className="text-center  ">
                          <h1
                            className={`${
                              prp.theame.value == "white"
                                ? "text-black"
                                : "text-white"
                            } `}
                          >
                            {item.title}
                          </h1>
                          <p
                            className={`${
                              prp.theame.value == "white"
                                ? "text-black"
                                : "text-white"
                            } `}
                          >
                            {item.publisher}
                          </p>
                        </div>
                      </div>
                    </>
                  );
                })}
            </Carousel>
          </div>
        </div>
      </div> */}

      {/* potrait mode */}
      {/* ......................................... */}
      {/* <div className="bg-white h-100">
        <div className="d-flex justify-content-center h-100">
          <div className="bg-black p-3 h-100">
            // news-app-bg
            <div
              className="basic-list-group image-preview-container media-content "
              style={{ color: "white", textAlign: "center" }}
            >
              <h2 className="text-white mb-0">News About {prp.topic.value}</h2>
              <Carousel
                interval={10000}
                indicators={false}
                animation={"slide"}
                className="h-100"
              >
                {newsData &&
                  newsData.items.map((item, i) => {
                    {
                      console.log(item.title);
                    }
                    return (
                      <>
                        <Slide direction="right" in={true} timeout={1000}>
                          <div
                            style={{
                              maxWidth: "100%",
                              minWidth: "70%",
                              height: "5px",
                              background: "#fff",
                              margin: "2rem 0",
                              display: "inline-block",
                            }}
                          ></div>
                        </Slide>
                        <div className=" h-100" key={i}>
                          <div className="text-center  ">
                            <h1
                              className={`${
                                prp.theame.value == "White Background"
                                  ? "text-black"
                                  : "text-white"
                              } `}
                            >
                              {item.title}
                            </h1>
                            <p
                              className={`${
                                prp.theame.value == "White Background"
                                  ? "text-black"
                                  : "text-white"
                              } `}
                            >
                              {item.publisher}
                            </p>
                          </div>
                        </div>
                      </>
                    );
                  })}
              </Carousel>
            </div>
          </div>
        </div>
      </div> */}

      {/* footer mode */}
      {/* ............................................ */}
      <div className="bg-white h-100">
        <div className=" h-100" style={{ position: "relative" }}>
          <div
            className="bg-black p-3 w-100"
            style={{ position: "absolute", bottom: "0" }}
          >
            // news-app-bg
            <div
              className="basic-list-group image-preview-container media-content "
              style={{ color: "white", textAlign: "center" }}
            >
              <h2 className="text-white mb-0" style={{ fontSize: "20px" }}>
                News About {prp.topic.value}
              </h2>
              <Carousel
                interval={10000}
                indicators={false}
                animation={"slide"}
                className="h-100"
              >
                {newsData &&
                  newsData.items.map((item, i) => {
                    {
                      console.log(item.title);
                    }
                    return (
                      <>
                        <Slide direction="right" in={true} timeout={1000}>
                          <div
                            style={{
                              maxWidth: "100%",
                              minWidth: "70%",
                              height: "5px",
                              background: "#fff",
                              margin: "10px 0",
                              display: "inline-block",
                            }}
                          ></div>
                        </Slide>
                        <div className=" h-100" key={i}>
                          <div className="text-center  ">
                            <h1
                              className={`${
                                prp.theame.value == "White Background"
                                  ? "text-black"
                                  : "text-white"
                              } `}
                              style={{ fontSize: "20px" }}
                            >
                              {item.title}
                            </h1>
                            <p
                              className={`${
                                prp.theame.value == "White Background"
                                  ? "text-black"
                                  : "text-white"
                              } `}
                              style={{ fontSize: "14px" }}
                            >
                              {item.publisher}
                            </p>
                          </div>
                        </div>
                      </>
                    );
                  })}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const handleGoogleApps = (data) => {
  const prp = JSON.parse(data);
  console.log("text app ", prp);
  return (
    <div className="basic-list-group image-preview-container media-content">
      {prp && prp.fileData && prp.fileURL ? (
        <Iframe
          url={prp.fileURL}
          width="100%"
          height="100%"
          // id=""
          // className=""
          display="block"
          position="relative"
        />
      ) : (
        <>Loading</>
      )}
    </div>
  );
};


export const handlePeopleSpace = (data) => {
  const prp = JSON.parse(data);
  console.log("Handelling", prp);
  if(prp.slides && prp.slides.length > 0){
    if(prp.tempType && (prp.tempType == "temp1" || prp.tempType == 'temp4')){
      prp.slides = sliceIntoChunks(prp.slides, 3);
        return <>
        <div className=" h-100" style={{ margin: "2%" }}>
          {prp?.settingData?.isTitle ? <h5>{prp.appTitle}</h5> : ""}
          <Carousel
            interval={10000}
            duration={500}
            indicators={false}
            animation={"fade"}
            className="h-100"
          >
            {prp.slides.map((item, i) => {
              return <div className="row people-space text-center" key={i}>
                <div className="col-12 col-md-4">
                  <div className="d-flex">
                      {item.map((item1, index1) => {
                        return (
                          <div className="text-center" key={`${i}-${index1}`}>
                              <img style={{width:"100px"}} src={item1.image ? BASE_URL+item1.image : person} alt="person" />
                              <h3>{item1.name}</h3>
                              <p>{item1.message}</p>
                          </div>
                        );
                      })}
                    </div> 
                </div>
              </div>
            })}
                
          </Carousel>
        </div>
      </>
    }else{
      return <>
        <div className=" h-100" style={{ margin: "2%" }}>
          <Carousel
            interval={10000}
            duration={500}
            indicators={false}
            animation={"fade"}
            className="h-100"
          >
            {prp.slides.map((item, i) => {
              return <div className="row people-space text-center" key={i}>
                <div className="col-12 col-md-4">
                  <div className="d-flex" >
                    <div className="text-center" >
                        <img style={{width:"100px"}} src={item.image ? BASE_URL+item.image : person} alt="person" />
                        <h3>{item.name}</h3>
                        <p>{item.message}</p>
                    </div>
                  </div> 
                </div>
              </div>
            })}
                
          </Carousel>
        </div>
      </>
    }
  }
}

// AIzaSyCMJk6QpvPCdibrNzpOQlFrqpDgf4-GHjw
// AIzaSyDwH-RU1-mcb9_z3MobeWInZ-jCxBn2kTw
