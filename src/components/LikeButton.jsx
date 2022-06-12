import IconButton from "@mui/material/IconButton";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleLike } from "../redux/actions/postsAction";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const LikeButton = ({ post }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userSignin.user);
  const posts = useSelector((state) => state.selectedPost.post);
  const currentUserUid = user?.uid;
  const handleLike = async (id) => {
    dispatch(toggleLike(id));
  };

  return (
    <>
      <IconButton
        disableRipple
        sx={{
          paddingX: 0,
          "&:hover": {
            color: "red",
          },
        }}
        onClick={() => {
          handleLike(post.id);
        }}
      >
        {post.likedBy?.includes(currentUserUid) ? (
          <FavoriteIcon color="error" />
        ) : (
          <FavoriteBorderIcon />
        )}
      </IconButton>
    </>
  );
};

export default LikeButton;
