import { Button, Modal, Row, Col, Badge } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import cancelIcon from "../../img/cancel-icon.png";
import { resetPassword } from "../../store/actions/AuthActions";
import React, { useState, useEffect } from "react";

const ResetPassword = ({
  errorMessage,
  successMessage,
  show,
  setShowResetPassword,
  history,
}) => {
  const [email, setEmail] = useState("");
  const [errMsg, setErrMsg] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {}, []);

  const handleCreateApp = async (e) => {
    e.preventDefault();
    setErrMsg("");
    if (email === "") {
      setErrMsg("Email is Required");
      return;
    }
    dispatch(resetPassword(email, history));
  };
  return (
    <>
      <Modal
        className="fade bd-example-modal-lg mt-4 app-modal"
        show={show}
        size="xm"
        centered
      >
        <Modal.Header className="border-0">
          <Modal.Title className="mr-auto app-modal-heading">
            Reset Password
          </Modal.Title>
          <Button
            variant=""
            className="close"
            onClick={() => setShowResetPassword(false)}
          >
            <img
              className="cancel-icon"
              src={cancelIcon}
              alt="cancel-icon"
              height="25px"
              width="25px"
            />
          </Button>
        </Modal.Header>
        <Modal.Body>
          {errorMessage && (
            <h5 className="alert alert-danger">{errorMessage}</h5>
          )}
          {successMessage && (
            <h5 className="alert alert-success">{successMessage}</h5>
          )}
          {errMsg && <h5 className="alert alert-danger">{errMsg}</h5>}
          <form className="row">
            <div className="form-group col-12 mb-0  ">
              <label>Email</label>
              <input
                type="email"
                className="  form-control "
                placeholder="Enter Your Email..."
                required
                name="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer className="border-0 mb-2">
          <Row className="w-100 m-0">
            <Col lg={6} md={6} sm={6} xs={6} className="pl-0 pr-2">
              <Button
                className="cancel-btn w-100"
                variant="outline-light"
                onClick={() => setShowResetPassword(false)}
              >
                Cancel
              </Button>
            </Col>
            <Col lg={6} md={6} sm={6} xs={6} className="pl-2 pr-0">
              <Button
                variant=""
                type="button"
                className="btn btn-primary btn-block primary-btn"
                onClick={(e) => handleCreateApp(e)}
              >
                Reset Password
              </Button>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMessage,
    successMessage: state.auth.successMessage,
    showLoading: state.auth.showLoading,
  };
};
export default connect(mapStateToProps)(ResetPassword);
