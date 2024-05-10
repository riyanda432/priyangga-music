import { loadData, saveData } from "../../utils/accessLocal";
import {
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  
} from "./actionTypes";

const initialState = {
  token: loadData("token") || false,
  user: loadData("user") || {},
  isAuthLoading: false,
  isError: false,
};

export const AuthReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_SIGNUP_REQUEST:
      return {
        ...state,
        isAuthLoading: true,
        isError: false,
      };
    case USER_SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthLoading: false,
        isError: false,
      };
    default:
      return state;
  }
};
