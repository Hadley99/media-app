import { Constants } from "../constants/constants";

export const fetchCommentsReducer = (state = {}, action) => {
  switch (action.type) {
    case Constants.FETCH_COMMENTS_OF_POST_REQUEST:
      return { loading: true, comments: null };

    case Constants.FETCH_COMMENTS_OF_POST_SUCCESS:
      return { loading: false, comments: action.payload };

    case Constants.FETCH_COMMENTS_OF_POST_FAIL:
      return {
        loading: false,
        errorCode: action.payload.code,
        errorMessage: action.payload.message,
      };

    default:
      return state;
  }
};

export const createCommentsReducer = (state = {}, action) => {
  switch (action.type) {
    case Constants.CREATE_COMMENTS_REQUEST:
      return { loading: true };

    case Constants.CREATE_COMMENTS_SUCCESS:
      return { loading: false };

    case Constants.CREATE_COMMENTS_FAIL:
      return {
        loading: false,
        errorCode: action.payload.code,
        errorMessage: action.payload.message,
      };

    default:
      return state;
  }
};

export const deleteCommentsReducer = (state = {}, action) => {
  switch (action.type) {
    case Constants.DELETE_COMMENTS_REQUEST:
      return { loading: true };

    case Constants.DELETE_COMMENTS_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        message: action.payload.message,
      };

    case Constants.DELETE_COMMENTS_FAIL:
      return {
        loading: false,
        errorCode: action.payload.code,
        errorMessage: action.payload.message,
      };

    default:
      return state;
  }
};
