import React, { useEffect, useState } from "react";
import speakeasy from "speakeasy";
import QRCode from "qrcode";
import CryptoJS from "crypto-js";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
 verification,
 resendOtp,
 clearErrors,
 logout
} from "../../store/actions/AuthActions";
import { Button } from "react-bootstrap";
//
import logo from "../../img/logo.png";
import googleIcon from "../../img/google-icon.png";
import { authenticator } from 'otplib';

function Verification(props) {
  const [otp, setOtp] = useState("");
  let errorsObj = { email: "", password: "" };
  const [errors, setErrors] = useState(errorsObj);
  const [image, setImage] = useState("");
  const [validCode, setValidCode] = useState("");
  const [isCodeValid, setIsCodeValid] = useState(null);
  const [secret, setSecret] = useState(speakeasy.generateSecret());

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

  const handleLoginAgain = (e) => {
    e.preventDefault();
    dispatch(logout(props.history));
  }

  const getSecret = () => {
    QRCode.toDataURL(secret.otpauth_url, (err, image_data) => {
      setImage(image_data);
    });
  }

  const getCode = () => {
    const code = speakeasy.totp({
      secret: secret.hex,
      encoding: "hex",
      algorithm: "sha1"
    });
    setValidCode(code);
  };

  const verifyCode = (e) => {
    e.preventDefault()
    // const { base32, hex } = secret;
    // const isVerified = speakeasy.totp.verify({
    //   secret: base32,
    //   encoding: "base32",
    //   token: otp,
    //   window: 1
    // });
    console.log("secret", secret);
    //const { base32: secret } = secret;
    const isVerified = speakeasy.totp.verify({
      secret:secret.hex,
      encoding: 'hex',
      token:otp
    });

    console.log("isVerified -->", isVerified);
    //setIsCodeValid(isVerified)
  };

  useEffect(() => {
    getSecret()
  },[]);

 
  return (
    <div className="login-form-bx auth-page">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-7 d-flex box-skew1 relative login-leftpanel">
            <div className="inner-content align-self-center">
              <img src={`${image}`} />
              <div>
                <h2>{validCode}</h2>
                <button onClick={getCode}>Get valid code</button>
              </div>
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
            <form 
              //onSubmit={verifyCode}
            >
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
                {/* <button
                    type="submit"
                    className="btn btn-primary btn-block btn-pink"
                >
                    Verifiy
                </button> */}
                <button
                    type="button"
                    className="btn btn-primary btn-block btn-pink"
                    onClick={(e) => {verifyCode(e)}}
                >
                    Verifiy
                </button>
                </div>
            </form>
            <div className="new-account add-new-account  text-center mt-2">
                <p className="mb-0">
                Change your email?{" "}
                <Button className="signup-link" onClick={(e) => handleLoginAgain(e)}>
                    Sign up
                </Button>
                </p>
            </div>

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
