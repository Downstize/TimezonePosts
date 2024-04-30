import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

const ADD_ARTICLE = "ADD_ARTICLE";
const ADD_ARCHIVE = "ADD_ARCHIVE";
const DELETE_ARTICLE = "DELETE_ARTICLE";
const SET_TIMEZONE = "SET_TIMEZONE";
const PUBLISH_FROM_ARCHIVE = "PUBLISH_FROM_ARCHIVE";
const UPDATE_POST = "UPDATE_POST";
const UPDATE_ARCHIVE_POST = "UPDATE_ARCHIVE_POST";

const publishFromArchive = (index) => ({
  type: PUBLISH_FROM_ARCHIVE,
  payload: index,
});
const addArticle = (article) => ({ type: ADD_ARTICLE, payload: article });
const addArchive = (archive) => ({ type: ADD_ARCHIVE, payload: archive });
const deleteArticle = (index) => ({ type: DELETE_ARTICLE, payload: index });
const setTimezone = (timezone) => ({ type: SET_TIMEZONE, payload: timezone });
const updatePost = (index, post) => ({
  type: UPDATE_POST,
  payload: { index, post },
});
const updateArchivePost = (index, post) => ({
  type: UPDATE_ARCHIVE_POST,
  payload: { index, post },
});

const articlesReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_ARTICLE:
      return [...state, action.payload];
    case DELETE_ARTICLE:
      return state.filter((_, index) => index !== action.payload);
    case PUBLISH_FROM_ARCHIVE:
      return [...state, action.payload];
    case UPDATE_POST:
      return state.map((post, index) =>
        index === action.payload.index ? action.payload.post : post
      );
    default:
      return state;
  }
};

const archivesReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_ARCHIVE:
      return [...state, action.payload];
    case PUBLISH_FROM_ARCHIVE:
      return state.filter((_, index) => index !== action.payload);
    case UPDATE_ARCHIVE_POST:
      return state.map((post, index) =>
        index === action.payload.index ? action.payload.post : post
      );
      case DELETE_ARTICLE:
      return state.filter((_, index) => index !== action.payload);
    default:
      return state;
  }
};

const timezoneReducer = (state = "Europe/London", action) => {
  switch (action.type) {
    case SET_TIMEZONE:
      return action.payload;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  articles: articlesReducer,
  archives: archivesReducer,
  timezone: timezoneReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
export {
  ADD_ARTICLE,
  addArticle,
  ADD_ARCHIVE,
  addArchive,
  DELETE_ARTICLE,
  deleteArticle,
  SET_TIMEZONE,
  setTimezone,
  PUBLISH_FROM_ARCHIVE,
  publishFromArchive,
  UPDATE_POST,
  updatePost,
  UPDATE_ARCHIVE_POST,
  updateArchivePost,
};
