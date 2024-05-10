import axios from "axios";
import { notify } from "../../utils/extraFunction";
import {
  GET_MUSIC_RECORDS_REQUEST,
  GET_MUSIC_RECORDS_SUCCESS,
  GET_MUSIC_RECORDS_FAILURE
} from "./actionTypes";

const getMusicRequest = () => {
  return { type: GET_MUSIC_RECORDS_REQUEST };
};

const getMusicSuccess = (payload) => {
  return { type: GET_MUSIC_RECORDS_SUCCESS, payload };
};

const getMusicFailure = (payload) => {
  return { type: GET_MUSIC_RECORDS_FAILURE, payload };
};

export const getMusicRecords = (params, token, toast) => (dispatch) => {
  dispatch(getMusicRequest());
  return axios
    .get(`/albums`, params)
    .then((res) => {
      dispatch(getMusicSuccess(res.data));
    })
    .catch((err) => {
      dispatch(getMusicFailure(err));
      notify(toast, err.response.data.message, "error");
    });
};
