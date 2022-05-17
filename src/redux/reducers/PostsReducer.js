import { Constants } from "../constants/constants";

export const createPostReducer = (state = {}, action) => {
  switch (action.type) {
    case Constants.POSTS_CREATE_REQUEST:
      return { loading: true };

    case Constants.POSTS_CREATE_SUCCESS:
      return { loading: false };

    case Constants.POSTS_CREATE_FAIL:
      return {
        loading: false,
        errorCode: action.payload.code,
        errorMessage: action.payload.message,
      };

    default:
      return state;
  }
};

export const fetchPostReducer = (state = {}, action) => {
  switch (action.type) {
    case Constants.POSTS_FETCH_REQUEST:
      return { loading: true };

    case Constants.POSTS_FETCH_SUCCESS:
      return { loading: false, posts: action.payload };

    case Constants.POSTS_FETCH_FAIL:
      return {
        loading: false,
        errorCode: action.payload.code,
        errorMessage: action.payload.message,
      };

    default:
      return state;
  }
};

export const likePostReducer = (state = {}, action) => {
  switch (action.type) {
    case Constants.POSTS_LIKE_REQUEST:
      return { loading: true };
    case Constants.POSTS_LIKE_SUCCESS:
      return { loading: false };
    case Constants.POSTS_LIKE_FAIL:
      return {
        loading: false,
        errorCode: action.payload.code,
        errorMessage: action.payload.message,
      };

    default:
      return state;
  }
};
