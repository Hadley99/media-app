import { Constants } from "../constants/constants";

export const userSignInReducer = (state = {}, action) => {
  switch (action.type) {
    case Constants.USER_SIGNIN_REQUEST:
      return { loading: true };

    case Constants.USER_SIGNIN_SUCCESS:
      return { loading: false, user: action.payload };

    case Constants.USER_SIGNIN_FAIL:
      return {
        loading: false,
        errorCode: action.payload.code,
        errorMessage: action.payload.message,
      };

    case Constants.USER_SIGNOUT:
      return {
        loading: false,
        user: null,
      };

    default:
      return state;
  }
};

export const selectedUserReducer = (state = {}, action) => {
  switch (action.type) {
    case Constants.SELECTED_USER_FETCH_REQUEST:
      return { loading: true };
    case Constants.SELECTED_USER_FETCH_SUCCESS:
      return { loading: false, user: action.payload };
    case Constants.SELECTED_USER_FETCH_FAIL:
      return {
        loading: false,
        errorCode: action.payload.code,
        errorMessage: action.payload.message,
      };

    default:
      return state;
  }
};

export const toggleUserFollowersReducer = (state = {}, action) => {
  switch (action.type) {
    case Constants.USER_FOLLOWERS_REQUEST:
      return { loading: true };
    case Constants.USER_FOLLOWERS_SUCCESS:
      return { loading: false };
    case Constants.USER_FOLLOWERS_FAIL:
      return {
        loading: false,
        errorCode: action.payload.code,
        errorMessage: action.payload.message,
      };

    default:
      return state;
  }
};
