import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
 verification,
 resendOtp,
 clearErrors
} from "../../store/actions/AuthActions";
import { Button } from "react-bootstrap";
//
import logo from "../../img/logo.png";

function Verification(props) {
  const [otp, setOtp] = useState("");
  let errorsObj = { email: "", password: "" };
  const [errors, setErrors] = useState(errorsObj);
  const dispatch = useDispatch();

  function onLogin(e) {
    e.preventDefault();
    let error = false;
    const errorObj = { ...errorsObj };
    if (otp === "") {
      errorObj.otp = "OTP is Required";
      error = true;
    }
    setErrors(errorObj);
    if (error) {
      return;
    }
    // dispatch(loadingToggleAction(true));
    dispatch(verification(otp, props.history));
  }

  const sendOtpAgain = (e) => {
    e.preventDefault();
    dispatch(resendOtp(props.history));
  }

 
  return (
    <div className="login-form-bx auth-page">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-7 d-flex box-skew1 relative login-leftpanel">
            <div className="inner-content align-self-center">
              <Link to="/dashboard" className="login-logo">
                <img src={logo} alt="" className="logo-icon mr-2" />
              </Link>
              <h2 className="m-b10 text-white">
                Sign In to <br /> Trendy Website
              </h2>
              <p className="m-b40 text-white">
                Boost your engagement & productivity, streamline processes, and
                make faster communications.
              </p>
            </div>
            <div className="login-center-img"></div>
          </div>
          <div className="col-lg-4 col-md-5 box-skew d-flex pl-0 pr-0 login-rightpanel">
            <div className="authincation-content">
            <div>
          <div className="mb-4">
            <h3 className="mb-1 font-w600">Verification</h3>
            <p className="welcome-content-paragraph">
              Enter OTP to verify your Account
            </p>
          </div>
            {props.errorMessage && (
                <div className="alert alert-danger ">
                <h5>{props.errorMessage}</h5>
                </div>
            )}
            {props.successMessage && (
                <div className="alert alert-success">
                <h5>{props.successMessage}</h5>
                </div>
            )}
            <form onSubmit={onLogin}>
                <div className="form-group">
                <input
                    type="numer"
                    autoComplete="off"
                    className="form-control"
                    value={otp}
                    placeholder="OTP..."
                    onChange={(e) => setOtp(e.target.value)}
                />
                {errors.otp && (
                    <div className="text-danger fs-12">{errors.otp}</div>
                )}
                </div>
                <div className="recover-password d-flex justify-content-end">
                    <Button className="revover-password" onClick={(e) => {sendOtpAgain(e)}}>
                        Resend OTP
                    </Button>
                </div>
                <div className="text-center">
                <button
                    type="submit"
                    className="btn btn-primary btn-block btn-pink"
                >
                    Verifiy
                </button>
                </div>
            </form>
            {/* <div className="new-account add-new-account  text-center mt-2">
                <p className="mb-0">
                Don't have an account?{" "}
                <Link className="signup-link" to="./page-register">
                    Sign up
                </Link>
                </p>
            </div> */}

            {/* <Button className='btn-google-signin' variant='outline-primary'>
            <img src={googleIcon} alt="" className="logo-icon mr-2"/> <span>Sign in with Google</span>
            </Button> */}
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMessage,
    successMessage: state.auth.successMessage,
    showLoading: state.auth.showLoading,
    auth: state.auth.auth,
  };
};
export default connect(mapStateToProps)(Verification);
