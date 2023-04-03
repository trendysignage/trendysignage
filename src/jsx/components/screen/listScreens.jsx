import React, { useEffect, useState } from "react";
import { Col, Card, Table, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const ListScreen = () => {
    const [test, settest] = useState(false);
    // use effect
    useEffect(() => {
      setTimeout(() => {
        settest(true);
      }, 2000);
    }, [test]);
    const chackbox = document.querySelectorAll(".custom-checkbox input");
    const motherChackBox = document.querySelector("#checkbox1_exam_all");
    const chackboxFun = (type) => {
      for (let i = 0; i < chackbox.length; i++) {
        const element = chackbox[i];
        if (type === "all") {
          if (motherChackBox.checked) {
            element.checked = true;
          } else {
            element.checked = false;
          }
        } else {
          if (!element.checked) {
            motherChackBox.checked = false;
            break;
          } else {
            motherChackBox.checked = true;
          }
        }
      }
    };

    return (
        <Row>
        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>All Screens</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th className="width50">
                      <div className="custom-control custom-checkbox checkbox-success check-lg mr-3">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="checkbox1_exam_all"
                          onClick={() => chackboxFun("all")}
                          required=""
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="checkbox1_exam_all"
                        ></label>
                      </div>
                    </th>
                    <th>
                      <strong>Screen.</strong>
                    </th>
                    <th>
                      <strong>Last Seen</strong>
                    </th>
                    <th>
                      <strong>Tag</strong>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="custom-control custom-checkbox checkbox-success check-lg mr-3">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="customCheckBox2"
                          onClick={() => chackboxFun()}
                          required=""
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="customCheckBox2"
                        ></label>
                      </div>
                    </td>
                    <td>
                      <strong>542</strong>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="w-space-no">01 August 2020</span>
                      </div>
                    </td>
                    <td>abc </td>
                   
                    <td>
                      <div className="d-flex">
                        <Link
                          href="#"
                          className="btn btn-primary shadow btn-xs sharp mr-1"
                        >
                          <i className="fa fa-pencil"></i>
                        </Link>
                        <Link
                          href="#"
                          className="btn btn-danger shadow btn-xs sharp"
                        >
                          <i className="fa fa-trash"></i>
                        </Link>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    )
};

export default ListScreen;