import { Button, Modal, Row, Col } from "react-bootstrap";
import cancelIcon from "../../img/cancel-icon.png";
import { changePassword } from "../../utils/api";
import { toast } from "react-toastify";
import { useState } from "react";

const ChangePassword = ({ setShowModel, show }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const notifyTopRight = (success) => {
    toast.success(`✅ ${success}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };
  const notifyError = (error) => {
    toast.error(`❌${error}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // let error = false;
    // // const errorObj = { ...errorsObj };
    // // if (oldPassword === "") {
    // //   errorObj.oldPassword = "Old Password is Required";
    // //   error = true;
    // // }
    // // if (newPassword === "") {
    // //   errorObj.newPassword = "Password is Required";
    // //   error = true;
    // // }
    // // if (confirmPassword === "") {
    // //   errorObj.confirmPassword = "Password is Required";
    // //   error = true;
    // // }
    // // if (oldPassword == newPassword && oldPassword !== "") {
    // //   errorObj.newPassword = "Please create new password";
    // //   error = true;
    // // }
    // // if (newPassword !== confirmPassword) {
    // //   errorObj.confirmPassword = "Password not matched";
    // //   error = true;
    // // }
    // // setErrors(errorObj);
    // // if (error) {
    // //   return;
    // // }
    try {
      const response = await changePassword(oldPassword, newPassword);
      console.log(response.data.message, "successssss");
      notifyTopRight(response.data.message);
      setOldPassword("");
      setNewPassword("");

      setShowModel(false);
    } catch (error) {
      console.log(error.response.data, "error");
      notifyError(error.response.data.message);
    }
  };
  return (
    <Modal
      className="fade bd-example-modal-lg mt-4 custom-modal custom-modal-medium"
      show={show}
      size="md"
    >
      <Modal.Header>
        <Modal.Title>Change Password</Modal.Title>
        <Button
          variant=""
          className="close"
          onClick={() => setShowModel(false)}
        >
          <img className="cancel-icon" src={cancelIcon} alt="cancel-icon" />
        </Button>
      </Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <div className="mb-3">
            <strong>
              <label className="mb-3"> Old Password</label>
            </strong>

            <input
              type="password"
              className="form-control"
              autocomplete="off"
              name="name"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Enter your old password"
              required
              minLength={6}
            />
          </div>
          <div className="mb-4">
            <strong>
              <label className="mb-3"> New Password</label>
            </strong>
            <input
              type="password"
              className="form-control"
              autocomplete="off"
              name="department"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              required
              minLength={6}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Row className="w-100 m-0">
            <Col lg={6} md={6} sm={6} xs={6} className="pl-0 pr-2">
              <Button
                className="cancel-btn w-100"
                variant="outline-light"
                onClick={() => setShowModel(false)}
              >
                Cancel
              </Button>
            </Col>
            <Col lg={6} md={6} sm={6} xs={6} className="pl-2 pr-0">
              <Button
                variant=""
                type="submit"
                className="btn btn-primary btn-block primary-btn"
              >
                Save
              </Button>
            </Col>
          </Row>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ChangePassword;
