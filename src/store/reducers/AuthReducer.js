import {
    LOADING_TOGGLE_ACTION,
    LOGIN_CONFIRMED_ACTION,
    LOGIN_FAILED_ACTION,
    LOGOUT_ACTION,
    SIGNUP_CONFIRMED_ACTION,
    SIGNUP_FAILED_ACTION,
    CLEAR_ERRORS,
    OTP_CONFIRMED_ACTION,
    OTP_FAILED_ACTION,
    RESET_PASSWORD_CONFIRMED_ACTION,
    RESET_PASSWORD_FAILED_ACTION,
    GET_PERMISSION_CONFIRMED_ACTION,
    GET_PERMISSION_FAILED_ACTION
} from '../actions/AuthActions';

const initialState = {
    permission:null,
    auth: {
        email: '',
        idToken: '',
        localId: '',
        expiresIn: '',
        refreshToken: '',
    },
    errorMessage: '',
    successMessage: '',
    showLoading: false,
};

export function AuthReducer(state = initialState, action) {
    if (action.type === SIGNUP_CONFIRMED_ACTION) {
        return {
            ...state,
            auth: action.payload,
            permission:null,
            errorMessage: '',
            successMessage: 'OTP has been sent to registered email',
            showLoading: false,
        };
    }
    if (action.type === LOGIN_CONFIRMED_ACTION) {
        const isV = action?.payload?.vendor?.isVerified;
        return {
            ...state,
            auth: action.payload,
            permission:null,
            errorMessage: '',
            successMessage: !isV ? "" : 'Login Successfully Completed',
            showLoading: false,
        };
    }
    if (action.type === GET_PERMISSION_CONFIRMED_ACTION) {
        return {
            ...state,
            permission: action.payload
        };
    }

    if (action.type === OTP_CONFIRMED_ACTION || action.type === RESET_PASSWORD_CONFIRMED_ACTION) {
        return {
            ...state,
            auth: action.payload,
            errorMessage: '',
            successMessage: 'Mail has been Sent Successfully',
            showLoading: false,
        };
    }

    if (action.type === LOGOUT_ACTION) {
        return {
            ...state,
            errorMessage: '',
            successMessage: '',
            permission:null,
            auth: {
                email: '',
                idToken: '',
                localId: '',
                expiresIn: '',
                refreshToken: '',
            },
        };
    }

    if (
        action.type === SIGNUP_FAILED_ACTION ||
        action.type === LOGIN_FAILED_ACTION  ||
        action.type === OTP_FAILED_ACTION ||
        action.type === RESET_PASSWORD_FAILED_ACTION
    ) {
        return {
            ...state,
            errorMessage: action.payload,
            successMessage: '',
            showLoading: false,
        };
    }

    if (action.type === LOADING_TOGGLE_ACTION) {
        return {
            ...state,
            showLoading: action.payload,
        };
    }
    if (action.type === CLEAR_ERRORS) {
        return {
            ...state,
            errorMessage: '',
            successMessage: '',
        };
    }
    return state;
}

    
