import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {
  createCommentsReducer,
  deleteCommentsReducer,
  fetchCommentsReducer,
} from "./redux/reducers/commentsReducer";
import {
  createPostReducer,
  deletePostReducer,
  fetchPostReducer,
  likePostReducer,
  loadMoreReducer,
  selectedPostReducer,
  selectedPostsReducer,
} from "./redux/reducers/PostsReducer";

import {
  changeUserProfileDetails,
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
  deleteComment: deleteCommentsReducer,
  changeProfilePhoto: changeUserProfileDetails,
});

const initialState = {
  createPost: { loading: false },
  fetchPost: { posts: null, lastDoc: null, end: false },
  userSignin: { user: null },
  selectedPost: { post: null },
  deletePost: { success: false, message: null },
  deleteComment: { success: false, message: null },
};

const middleware = [thunk];

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
