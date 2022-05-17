import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {
  createPostReducer,
  fetchPostReducer,
  likePostReducer,
} from "./redux/reducers/PostsReducer";

import { userSignInReducer } from "./redux/reducers/userReducer";
const reducers = combineReducers({
  userSignin: userSignInReducer,
  createPost: createPostReducer,
  fetchPost: fetchPostReducer,
  likePost: likePostReducer,
});

const initialState = { fetchPost: { posts: [] } };

const middleware = [thunk];

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
