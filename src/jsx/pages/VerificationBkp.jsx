import React, { useEffect, useState } from "react";
import speakeasy from "speakeasy";
import QRCode from "qrcode";
import { toast } from "react-toastify";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  verification,
  verify2fa,
  resendOtp,
  clearErrors,
  logout,
} from "../../store/actions/AuthActions";
import { Button } from "react-bootstrap";
//
import logo from "../../img/logo.png";
import googleIcon from "../../img/google-icon.png";
import { authenticator } from "otplib";
import crypto from "crypto";
import base32Decode from "base32-decode";
import base32Encode from "base32-encode";
import util from "util";

function Verification(props) {
  const [otp, setOtp] = useState("");
  let errorsObj = { email: "", password: "" };
  const [errors, setErrors] = useState(errorsObj);
  const [image, setImage] = useState("");
  const [validCode, setValidCode] = useState("");
  const [isCodeValid, setIsCodeValid] = useState(null);
  const [secret, setSecret] = useState(
    speakeasy.generateSecret({ name: "Trendy" })
  );
  const [mfaSecret, setMfaSecret] = useState(null);

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

  const generateHOTP = (secret, counter) => {
    const decodedSecret = base32Decode(secret, "RFC4648");

    const buffer = Buffer.alloc(8);
    for (let i = 0; i < 8; i++) {
      buffer[7 - i] = counter & 0xff;
      counter = counter >> 8;
    }

    // Step 1: Generate an HMAC-SHA-1 value
    const hmac = crypto.createHmac("sha1", Buffer.from(decodedSecret));
    hmac.update(buffer);
    const hmacResult = hmac.digest();

    // Step 2: Generate a 4-byte string (Dynamic Truncation)
    const offset = hmacResult[hmacResult.length - 1] & 0xf;
    const code =
      ((hmacResult[offset] & 0x7f) << 24) |
      ((hmacResult[offset + 1] & 0xff) << 16) |
      ((hmacResult[offset + 2] & 0xff) << 8) |
      (hmacResult[offset + 3] & 0xff);

    // Step 3: Compute an HOTP value
    return `${code % 10 ** 6}`.padStart(6, "0");
  };

  const generateTOTP = (secret, window = 0) => {
    const counter = Math.floor(Date.now() / 30000);
    return generateHOTP(secret, counter + window);
  };

  const sendOtpAgain = (e) => {
    e.preventDefault();
    dispatch(resendOtp(props.history));
  };

  const handleLoginAgain = (e) => {
    e.preventDefault();
    dispatch(logout(props.history));
  };

  const getSecret = async () => {
    console.log("auth", props.auth.vendor.mfa);
    const buffer = await util.promisify(crypto.randomBytes)(14);
    const mfaSecret = props.auth.vendor.mfa
      ? props.auth.vendor.mfa
      : base32Encode(buffer, "RFC4648", { padding: false });
    setMfaSecret(mfaSecret);
    const issuer = "MfaDemo";
    const algorithm = "SHA1";
    const digits = "6";
    const period = "30";
    const otpType = "totp";
    const configUri = `otpauth://${otpType}/${issuer}:${"Anuj"}?algorithm=${algorithm}&digits=${digits}&period=${period}&issuer=${issuer}&secret=${mfaSecret}`;
    console.log("configuri", configUri);
    //qrcode.toFileStream(res, configUri);
    QRCode.toDataURL(configUri, (err, image_data) => {
      setImage(image_data);
    });
    // QRCode.toDataURL(secret.otpauth_url, (err, image_data) => {
    //   setImage(image_data);
    // });
  };

  const getCode = async () => {
    const code = speakeasy.totp({
      secret: secret.hex,
      encoding: "hex",
      algorithm: "sha1",
    });
    setValidCode(code);
  };

  const verifyCode = (e) => {
    e.preventDefault();
    const isVerify = verifyTOTP(otp, mfaSecret);
    if (isVerify) {
      dispatch(verify2fa(mfaSecret, props.history));
    } else {
      return toast.error("Invalid OTP", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const verifyTOTP = (token, secret, window = 1) => {
    console.log(token, secret);
    for (let errorWindow = -window; errorWindow <= +window; errorWindow++) {
      const totp = generateTOTP(secret, errorWindow);
      console.log(totp, token);
      if (token === totp) {
        console.log("true");
        return true;
      }
    }
    console.log("false");
    return false;
  };

  useEffect(() => {
    getSecret();
  }, []);

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
                <div className="mb-4 text-center">
                  <img src={`${image}`} className="mb-3" />
                  <p
                    className="welcome-content-paragraph text-white"
                    style={{ opacity: 1 }}
                  >
                    Scan the QR code on your authenticator app
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
                  {/* <div className="recover-password d-flex justify-content-end">
                    <Button className="revover-password" onClick={(e) => {sendOtpAgain(e)}}>
                        Resend OTP
                    </Button>
                </div> */}
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
                      onClick={(e) => {
                        verifyCode(e);
                      }}
                    >
                      Verifiy
                    </button>
                  </div>
                </form>
                {/* <div className="new-account add-new-account  text-center mt-2">
                <p className="mb-0">
                Change your email?{" "}
                <Button className="signup-link" onClick={(e) => handleLoginAgain(e)}>
                    Sign up
                </Button>
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
