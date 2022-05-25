import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {
  createCommentsReducer,
  fetchCommentsReducer,
} from "./redux/reducers/commentsReducer";
import {
  createPostReducer,
  deletePostReducer,
  fetchPostReducer,
  likePostReducer,
  selectedPostReducer,
  selectedPostsReducer,
} from "./redux/reducers/PostsReducer";

import {
  selectedUserReducer,
  toggleUserFollowersReducer,
  userSignInReducer,
} from "./redux/reducers/userReducer";
const reducers = combineReducers({
  userSignin: userSignInReducer,
  createPost: createPostReducer,
  fetchPost: fetchPostReducer,
  likePost: likePostReducer,
  deletePost: deletePostReducer,
  selectedUser: selectedUserReducer,
  selectedPosts: selectedPostsReducer,
  togglefollowers: toggleUserFollowersReducer,
  selectedPost: selectedPostReducer,
  fetchComments: fetchCommentsReducer,
  createComments: createCommentsReducer,
});

const initialState = { fetchPost: { posts: [] } };

const middleware = [thunk];

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
