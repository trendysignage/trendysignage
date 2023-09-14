import React, { useState, useCallback } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  loadingToggleAction,
  loginAction,
  signupAction,
  socialLoginAction
} from "../../store/actions/AuthActions";
import ResetPassword from "../modals/ResetPassword";
import { Row, Col, Card, Tab, Nav, Button } from "react-bootstrap";
import {
  LoginSocialGoogle,
  IResolveParams
} from 'reactjs-social-login';
import {
  GoogleLoginButton
} from 'react-social-login-buttons';
import logo from "../../img/logo.png";
import eyeOff from "../../img/eye-off.svg";
import googleIcon from "../../img/google-icon.png";

function Login(props) {
  const REDIRECT_URI = 'http://localhost:3000/login'

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  let errorsObj = { email: "", password: "" };
  const [errors, setErrors] = useState(errorsObj);
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const [showResetPassword, setShowResetPassword] = useState(false)

  function onLogin(e) {
    e.preventDefault();
    let error = false;
    const errorObj = { ...errorsObj };
    if (email === "") {
      errorObj.email = "Email is Required";
      error = true;
    }
    if (password === "") {
      errorObj.password = "Password is Required";
      error = true;
    }
    setErrors(errorObj);
    if (error) {
      return;
    }
    dispatch(loadingToggleAction(true));
    dispatch(loginAction(email, password, props.history));
  }

  const onSignup = (e) => {
    console.log("sdfsdfsfs");
    e.preventDefault();
    let error = false;
    const errorObj = { ...errorsObj };
    if (name === "") {
      errorObj.name = "Name is Required";
      error = true;
    }
    if (email === "") {
      errorObj.email = "Email is Required";
      error = true;
    }
    if (password === "") {
      errorObj.password = "Password is Required";
      error = true;
    }
    setErrors(errorObj);
    if (error) {
      return;
    }
    dispatch(loadingToggleAction(true));
    dispatch(signupAction(name, email, password, props.history));
  }

  const [provider, setProvider] = useState('');
  const [profile, setProfile] = useState("");

  const onLoginStart = useCallback(() => {
    //alert('login start');
  }, []);

  // const onLogoutSuccess = useCallback(() => {
  //   setProfile(null);
  //   setProvider('');
  //   alert('logout success');
  // }, []);

  // const onLogout = useCallback(() => {}, []);

  const onSocialLogin = (data) => {
    console.log(data)
    dispatch(socialLoginAction(data.email, data.name, data.sub, props.history))
  }
  

  const tabData = [
    {
      name: "Sign in",
      content: (
        <div>
          <div className="mb-4">
            <h3 className="mb-1 font-w600">Welcome Back</h3>
            <p className="welcome-content-paragraph">
              Log in with your data that you entered during your registration
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
                type="email"
                autoComplete="off"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <div className="text-danger fs-12">{errors.email}</div>
              )}
            </div>
            <div className="form-group password-textfield">
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="eye-off">
                <img src={eyeOff} alt="" className="eye-off" />{" "}
              </span>
              {errors.password && (
                <div className="text-danger fs-12">{errors.password}</div>
              )}
            </div>
            <div className="recover-password d-flex justify-content-end">
              <Button className="revover-password" onClick={(e) => setShowResetPassword(true)}>
                Recover Password ?
              </Button>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-primary btn-block btn-pink"
              >
                Sign In
              </button>
            </div>
          </form>
          {/* <LoginSocialGoogle
            client_id={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            onLoginStart={onLoginStart}
            redirect_uri={REDIRECT_URI}
            scope="openid profile email"
            discoveryDocs="claims_supported"
            access_type="offline"
            onResolve={({provider, data }) => {
              console.log(data)
              onSocialLogin(data);
            }}
            onReject={err => {
              console.log("errr",err);
            }}
        >
          <GoogleLoginButton />
          </LoginSocialGoogle> */}
          <div className="new-account add-new-account  text-center mt-2">
            <p className="mb-0">
              Don't have an account?{" "}
              <Link className="signup-link" to="./page-register">
                Sign up
              </Link>
            </p>
          </div>

          {/* <Button className='btn-google-signin' variant='outline-primary'>
		  <img src={googleIcon} alt="" className="logo-icon mr-2"/> <span>Sign in with Google</span>
		  </Button> */}
        </div>
      ),
    },
    {
      name: "Register",
      content: (
        <div>
          <div className="mb-4">
            <h3 className="mb-1 font-w600">Let’s get Started</h3>
            <p className="welcome-content-paragraph">
              Enter your basic information to create new account on Trendyy
            </p>
          </div>
          {props.errorMessage && ( <div className="alert alert-danger"><h5>{props.errorMessage}</h5></div> )}
          {props.successMessage && ( <div className="alert alert-success"> <h5>{props.successMessage}</h5> </div> )}
          <form onSubmit={(e) => {onSignup(e)}} id="signUpForm">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Name"
                value={name}
                name="name"
                id="name"
                onChange={(e) => {setName(e.target.value)}}
              />
              {errors.name && <div className="text-danger fs-12">{errors.name}</div>}
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <div className="text-danger fs-12">{errors.email}</div>
              )}
            </div>
            {/* <div className="form-group">
              <input
                type="phone"
                className="form-control"
                placeholder="Phone Number"
                name="phoneNumber"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              {errors.email && <div className="text-danger fs-12">{errors.email}</div>}
            </div> */}
            <div className="form-group password-textfield">
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="eye-off">
                <img src={eyeOff} alt="" className="eye-off" />{" "}
              </span>
              {errors.password && (
                <div className="text-danger fs-12">{errors.password}</div>
              )}
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-primary btn-block btn-pink"
              >
                Register
              </button>
            </div>
          </form>
          <div className="new-account add-new-account  text-center mt-2">
            <p className="mb-0">
              Already have an account?{" "}
              <Link className="signup-link" to="./page-register">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      ),
    },
  ];
  return (
    <>
    <ResetPassword show={showResetPassword} setShowResetPassword={setShowResetPassword} />
    <div className="login-form-bx auth-page">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-7 d-flex box-skew1 relative login-leftpanel">
            <div className="inner-content align-self-center">
              <Link to="/dashboard" className="login-logo">
                <img src={logo} alt="" className="logo-icon mr-2" />
              </Link>
              <h2 className="m-b10 text-white">
                Best website for <br /> digital signage
              </h2>
              <p className="m-b40 text-white">
                Elevate your brand presence with our immersive digital signage,
                revolutionizing the way you connect and communicate with your
                audience
              </p>
            </div>
            <div className="login-center-img"></div>
          </div>
          <div className="col-lg-4 col-md-5 box-skew d-flex pl-0 pr-0 login-rightpanel">
            <div className="authincation-content">
              <Tab.Container defaultActiveKey={tabData[0].name.toLowerCase()}>
                <Nav as="ul" className="nav-pills light">
                  {tabData.map((data, i) => (
                    <Nav.Item as="li" key={i}>
                      <Nav.Link eventKey={data.name.toLowerCase()}>
                        <i className={`la la-${data.icon} mr-2`} />
                        {data.name}
                      </Nav.Link>
                    </Nav.Item>
                  ))}
                </Nav>
                <Tab.Content className="auth-tab-content">
                  {tabData.map((data, i) => (
                    <Tab.Pane eventKey={data.name.toLowerCase()} key={i}>
                      <div>{data.content}</div>
                    </Tab.Pane>
                  ))}
                </Tab.Content>
              </Tab.Container>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMessage,
    successMessage: state.auth.successMessage,
    showLoading: state.auth.showLoading,
  };
};
export default connect(mapStateToProps)(Login);
