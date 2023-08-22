import {
    formatError,
    runLogoutTimer,
    saveTokenInLocalStorage,
    signUp
} from '../../services/AuthService';
import { login, register, otpVerification, getResetPassword, sentOtpAgain, socialLoginApi } from '../../utils/api';

export const SIGNUP_CONFIRMED_ACTION = '[signup action] confirmed signup';
export const SIGNUP_FAILED_ACTION = '[signup action] failed signup';
export const LOGIN_CONFIRMED_ACTION = '[login action] confirmed login';
export const LOGIN_FAILED_ACTION = '[login action] failed login';
export const LOADING_TOGGLE_ACTION = '[Loading action] toggle loading';
export const LOGOUT_ACTION = '[Logout action] logout action';
export const CLEAR_ERRORS = '[Clear Error] clear error'

export const OTP_CONFIRMED_ACTION = '[otp action] confirmed otp';
export const OTP_FAILED_ACTION = '[otp action] failed otp';
export const RESET_PASSWORD_CONFIRMED_ACTION = '[reset password action] confirmed reset password';
export const RESET_PASSWORD_FAILED_ACTION = '[reset password action] failed reset password';

export function signupAction(name,email, password, history) {
    return (dispatch) => {
        register(name,email, password)
        .then((response) => {
            response.data.data.vendor.isVerified = false;
            saveTokenInLocalStorage(response.data.data);
            // runLogoutTimer(
            //     dispatch,
            //     response.data.expiresIn * 1000,
            //     history,
            // );
            dispatch(confirmedSignupAction(response.data.data));
            history.push('/verification');
        })
        .catch((error) => {
            // const errorMessage = formatError(error.response.data);
            // dispatch(signupFailedAction(errorMessage));
            const errorMessage = error.response.data.message;
            console.log("errorMessage",errorMessage)
            dispatch(signupFailedAction(errorMessage));
        });
    };
}

export function logout(history) {
    localStorage.removeItem('userDetails');
    history.push('/login');
    return {
        type: LOGOUT_ACTION,
    };
}

export function loginAction(email, password, history) {
    return (dispatch) => {
        login(email, password)
            .then((response) => {
                const token = response.data.data;
                saveTokenInLocalStorage(token);
                dispatch(loginConfirmedAction(token));
				history.push('/');
            })
            .catch((error) => {
                // console.log(error.response.data)
                // const errorMessage = formatError(error.response.data);
                // dispatch(loginFailedAction(errorMessage));
                const errorMessage = error.response.data.message;
                console.log("errorMessage",errorMessage)
                //swal('OOPS', errorMessage, "error",{ button: "Try Again!",});
                dispatch(loginFailedAction(errorMessage));
            });
    };
}

export function socialLoginAction(email, name, token, history) {
    return (dispatch) => {
        socialLoginApi(email, name, token)
            .then((response) => {
                const token = response.data.data;
                saveTokenInLocalStorage(token);
                dispatch(loginConfirmedAction(token));
				history.push('/');
            })
            .catch((error) => {
                const errorMessage = error.response.data.message;
                console.log("errorMessage",errorMessage)
                dispatch(loginFailedAction(errorMessage));
            });
    };
}


export function verification(otp, history) {
    return (dispatch) => {
        otpVerification({otp})
            .then((response) => {
                const tokenDetailsString = localStorage.getItem('userDetails');

                let token = JSON.parse(tokenDetailsString);
                token.vendor.isVerified=true;
                saveTokenInLocalStorage(token);
                dispatch(loginConfirmedAction(token));
				history.push('/');
            })
            .catch((error) => {
                const errorMessage = error.response.data.message;
                console.log("errorMessage",errorMessage)
                dispatch(loginFailedAction(errorMessage));
            });
    };
}

export function resendOtp(history) {
    return (dispatch) => {
        sentOtpAgain()
            .then((response) => {
                dispatch(sendOtpConfired(response));
            })
            .catch((error) => {
                const errorMessage = error.response.data.message;
                console.log("errorMessage",errorMessage)
                dispatch(sendOtpFailed(errorMessage));
            });
    };
}

export function resetPassword(email, history) {
    return (dispatch) => {
        getResetPassword({email})
            .then((response) => {
                dispatch(resetPasswordConfirmed(response));
                history.push('/');
            })
            .catch((error) => {
                if(error.response){
                    const errorMessage = error.response.data.message;
                    console.log("errorMessage",errorMessage)
                    dispatch(resetPasswordFailed(errorMessage));
                }
                
            });
    };
}

export function sendOtpFailed(data) {
    return {
        type: OTP_FAILED_ACTION,
        payload:data
    };
}

export function sendOtpConfired() {
    return {
        type: OTP_CONFIRMED_ACTION,
    };
}

export function resetPasswordFailed(data) {
    return {
        type: RESET_PASSWORD_FAILED_ACTION,
        payload:data
    };
}

export function resetPasswordConfirmed(data) {
    return {
        type: RESET_PASSWORD_CONFIRMED_ACTION,
        payload:data
    };
}
export function loginFailedAction(data) {
    return {
        type: LOGIN_FAILED_ACTION,
        payload: data,
    };
}

export function loginConfirmedAction(data) {
    return {
        type: LOGIN_CONFIRMED_ACTION,
        payload: data,
    };
}

export function confirmedSignupAction(payload) {
    return {
        type: SIGNUP_CONFIRMED_ACTION,
        payload,
    };
}

export function signupFailedAction(message) {
    return {
        type: SIGNUP_FAILED_ACTION,
        payload: message,
    };
}

export function loadingToggleAction(status) {
    return {
        type: LOADING_TOGGLE_ACTION,
        payload: status,
    };
}
export function clearErrors() {
    return {
        type: CLEAR_ERRORS
    };
}
