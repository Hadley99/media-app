import { getDoc } from "firebase/firestore";
import { commentsDocRef } from "../../firebase/firebase";
import { Constants } from "../constants/constants";

export const fetchCommentsOfPost = (postid) => async (dispatch, getState) => {
  try {
    dispatch({ type: Constants.FETCH_COMMENTS_OF_POST_REQUEST });
    const res = await getDoc(commentsDocRef("0PzLaeRuH8gTg4cAXhsH"));
    const data = res.data().allComments;
    console.log(data);
    dispatch({ type: Constants.FETCH_COMMENTS_OF_POST_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
  }
};
