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
