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
        error: action.payload.error,
        errorMessage: action.payload.message,
      };

    default:
      return state;
  }
};

export const deletePostReducer = (state = {}, action) => {
  switch (action.type) {
    case Constants.POSTS_DELETE_REQUEST:
      return { loading: true };

    case Constants.POSTS_DELETE_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        message: action.payload.message,
      };

    case Constants.POSTS_DELETE_FAIL:
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
      return { ...state, loading: true };

    case Constants.POSTS_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: [...action.payload.posts],
        lastDoc: action.payload.lastDoc,
      };
    case Constants.POSTS_RESET:
      return {
        loading: false,
        posts: null,
        lastDoc: null,
        end: false,
      };

    case Constants.POSTS_FETCH_FAIL:
      return {
        ...state,
        loading: false,
        end: action.payload.end,
        errorCode: action.payload.code,
        errorMessage: action.payload.message,
      };

    case Constants.POSTS_LOADMORE_SUCCESS:
      return {
        ...state,

        posts: [...state.posts, ...action.payload.posts],
        lastDoc: action.payload.lastDoc,
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

export const selectedPostsReducer = (state = {}, action) => {
  switch (action.type) {
    case Constants.SELECTED_USER_POSTS_REQUEST:
      return { loading: true };
    case Constants.SELECTED_USER_POSTS_SUCCESS:
      return { loading: false, posts: [...action.payload] };
    case Constants.SELECTED_USER_POSTS_FAIL:
      return {
        loading: false,
        error: action.payload.error,
        errorCode: action.payload.code,
        errorMessage: action.payload.message,
      };

    default:
      return state;
  }
};

export const selectedPostReducer = (state = {}, action) => {
  switch (action.type) {
    case Constants.SELECTED_POST_FETCH_REQUEST:
      return { loading: true };
    case Constants.SELECTED_POST_FETCH_SUCCESS:
      return { loading: false, post: action.payload };
    case Constants.SELECTED_POST_FETCH_FAIL:
      return {
        loading: false,
        errorCode: action.payload.code,
        errorMessage: action.payload.message,
      };
    default:
      return state;
  }
};
