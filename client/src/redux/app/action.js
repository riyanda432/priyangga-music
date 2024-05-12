import axios from "axios";
import { notify } from "../../utils/extraFunction";
import {
  GET_MUSIC_RECORDS_REQUEST,
  GET_MUSIC_RECORDS_SUCCESS,
  GET_MUSIC_RECORDS_FAILURE,
  ADD_MUSIC_RECORDS_REQUEST,
  ADD_MUSIC_RECORDS_SUCCESS,
  ADD_MUSIC_RECORDS_FAILURE,
  UPDATE_MUSIC_RECORDS_SUCCESS,
  UPDATE_MUSIC_RECORDS_FAILURE,
  UPDATE_MUSIC_RECORDS_REQUEST,
  DELETE_MUSIC_RECORDS_REQUEST,
  DELETE_MUSIC_RECORDS_SUCCESS,
  DELETE_MUSIC_RECORDS_FAILURE,
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

const addMusicRequest = () => {
  return { type: ADD_MUSIC_RECORDS_REQUEST };
};

const addMusicSuccess = (payload) => {
  return { type: ADD_MUSIC_RECORDS_SUCCESS, payload };
};

const addMusicFailure = (payload) => {
  return { type: ADD_MUSIC_RECORDS_FAILURE, payload };
};

const updateMusicRequest = () => {
  return { type: UPDATE_MUSIC_RECORDS_REQUEST };
};

const updateMusicSuccess = (payload) => {
  return { type: UPDATE_MUSIC_RECORDS_SUCCESS, payload };
};

const updateMusicFailure = (payload) => {
  return { type: UPDATE_MUSIC_RECORDS_FAILURE, payload };
};

const deleteMusicRequest = () => {
  return { type: DELETE_MUSIC_RECORDS_REQUEST };
};

const deleteMusicSuccess = () => {
  return { type: DELETE_MUSIC_RECORDS_SUCCESS };
};

const deleteMusicFailure = (payload) => {
  return { type: DELETE_MUSIC_RECORDS_FAILURE, payload };
};

export const getMusicRecords = (params, token, toast) => async (dispatch) => {
  dispatch(getMusicRequest());
  try {
    const response = await axios.get(`/api/v1/albums`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      params
    });
    dispatch(getMusicSuccess(response.data.data));
    notify(toast, "Album Fetched successfully", "success");
  } catch (error) {
    dispatch(getMusicFailure(error));
    const errorMessage = error.response ? error.response.data.error.message : "An error occurred";
    notify(toast, errorMessage, "error");
  }
};

export const addMusicRecords = (payload, token, toast) => (dispatch) => {
  dispatch(addMusicRequest());
  return axios({
    method: "post",
    url: `/api/v1/albums`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  })
    .then((res) => {
      dispatch(addMusicSuccess(res.data.data));
      notify(toast, res.data.message, "success");
    })
    .catch((err) => {
      notify(toast, err.response.data.message, "error");
      dispatch(addMusicFailure(err));
    });
};

export const updateMusicRecords = (id, payload, token, toast) => async (dispatch) => {
  try {
    dispatch(updateMusicRequest());
    const response = await axios.patch(`/api/v1/albums/${id}`, payload, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    dispatch(updateMusicSuccess(response.data.data));
    notify(toast, response.data.message, "success");
  } catch (error) {
    dispatch(updateMusicFailure());
    const errorMessage = error.response ? error.response.data.message : "An error occurred";
    notify(toast, errorMessage, "error");
  }
};

export const deleteMusicRecords = (id, token, toast) => async (dispatch) => {
  try {
    dispatch(deleteMusicRequest());
    const response = await axios.delete(`/api/v1/albums/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(deleteMusicSuccess());
    notify(toast, response.data.message, "success");
  } catch (error) {
    dispatch(deleteMusicFailure());
    const errorMessage = error.response ? error.response.data.message : "An error occurred";
    notify(toast, errorMessage, "error");
  }
};

