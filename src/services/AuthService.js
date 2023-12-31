import axios from "axios";
import swal from "sweetalert";
import { loginConfirmedAction, logout } from "../store/actions/AuthActions";
import { getPermission } from "../utils/api";
import { GET_PERMISSION_CONFIRMED_ACTION } from "../store/actions/AuthActions";

export function signUp(email, password) {
  //axios call

  const postData = {
    email,
    password,
    returnSecureToken: true,
  };

  return axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD3RPAp3nuETDn9OQimqn_YF6zdzqWITII`,
    postData
  );
}

export function login(email, password) {
  const postData = {
    email,
    password,
    returnSecureToken: true,
  };

  return axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD3RPAp3nuETDn9OQimqn_YF6zdzqWITII`,
    postData
  );
}

export function formatError(errorResponse) {
  switch (errorResponse.error.message) {
    case "EMAIL_EXISTS":
      //return 'Email already exists';
      swal("Oops", "Email already exists", "error");
      break;
    case "EMAIL_NOT_FOUND":
      //return 'Email not found';
      swal("Oops", "Email not found", "error", { button: "Try Again!" });
      break;
    case "INVALID_PASSWORD":
      //return 'Invalid Password';
      swal("Oops", "Invalid Password", "error", { button: "Try Again!" });
      break;
    case "USER_DISABLED":
      return "User Disabled";

    default:
      return "";
  }
}

export function saveTokenInLocalStorage(tokenDetails) {
  localStorage.setItem("userDetails", JSON.stringify(tokenDetails));
}

export function runLogoutTimer(dispatch, timer, history) {
  setTimeout(() => {
    dispatch(logout(history));
  }, timer);
}

export function checkAutoLogin(dispatch, history) {
  const tokenDetailsString = localStorage.getItem("userDetails");
  let tokenDetails = "";
  if (!tokenDetailsString) {
    dispatch(logout(history));
    return;
  }

  tokenDetails = JSON.parse(tokenDetailsString);
  console.log("expireDate", tokenDetails);
  let expireDate = tokenDetails.token.expires;
  let todaysDate = new Date();

  if (todaysDate > expireDate) {
    console.log("logout", todaysDate, expireDate);
    dispatch(logout(history));
    return;
  }
  if (!tokenDetails.vendor.isVerified) {
    history.push("/verification");
  }
  dispatch(loginConfirmedAction(tokenDetails));

  // const timer = expireDate - todaysDate.getTime();
  // runLogoutTimer(dispatch, timer, history);
}

export function checkAutoPermission(dispatch, history) {
  getPermission()
    .then((response) => {
      console.log("response", response);
      dispatch({
        type: GET_PERMISSION_CONFIRMED_ACTION,
        payload: response.data?.data,
      });
    })
    .catch((error) => {
      // console.log("error", error.response.data);
      // const errorMessage = error.response.data.message;
      // console.log("errorMessage",errorMessage)
      // dispatch(loginFailedAction(errorMessage));
    });
  //dispatch(loginConfirmedAction(tokenDetails));
}
