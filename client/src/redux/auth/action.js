import {
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILURE
} from "./actionTypes";

export const signupRequest = () => {
  return {
    type: USER_SIGNUP_REQUEST,
  };
};

export const signupSuccess = (payload) => {
  return {
    type: USER_SIGNUP_SUCCESS,
    payload,
  };
};

export const signupFailure = () => {
  return {
    type: USER_SIGNUP_FAILURE,
  };
};
