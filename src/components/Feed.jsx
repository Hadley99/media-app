import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Menu,
  MenuItem,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { grey } from "@mui/material/colors";
import { deleteDoc, doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../firebase/firebase";
import { fetchPosts, toggleLike } from "../redux/actions/postsAction";

const Feed = () => {
  const feed = useSelector((state) => state.fetchPost);
  const create = useSelector((state) => state.createPost);
  const user = useSelector((state) => state.userSignin.user);
  const userUidRef = user?.uid;
  const dispatch = useDispatch();
  const { loading, posts } = feed;
  const { loadingOfCreate } = create;
  //console.log(feed);
  const [anchorEl, setAnchorEl] = useState(false);

  const handleMenuOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = (e) => {
    setAnchorEl(false);
  };

  const handleLike = async (id) => {
    dispatch(toggleLike(id));
  };
  const handleDelete = async (id) => {
    const docRef = doc(db, "posts", `${id}`);
    await deleteDoc(docRef);
    dispatch(fetchPosts(id));
    handleMenuClose();
  };
  return (
    <Box>
      {loading || loadingOfCreate ? (
        <div>loading...</div>
      ) : (
        posts &&
        posts.map((post) => (
          <Card
            key={post.id}
            elevation={0}
            sx={{
              my: 2,
              py: 2,
              backgroundColor: grey[100],
            }}
          >
            <CardHeader
              avatar={
                <Avatar
                  aria-label="profile"
                  sx={{ width: 35, height: 35 }}
                  src={post.createdBy.photoURL}
                />
              }
              action={
                <IconButton onClick={handleMenuOpen} aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={post.createdBy.displayName}
              titleTypographyProps={{ fontWeight: "medium", fontSize: "16px" }}
            />
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem
                onClick={() => {
                  handleDelete(post.id);
                }}
              >
                Delete
              </MenuItem>
            </Menu>
            <CardMedia
              component="img"
              sx={{
                objectFit: "contain",
              }}
              src={post.image}
              alt={post.description}
            />
            <CardContent>
              <br />
              {post.description}
              <small>{post.timestamp}</small>
              <br />
              <IconButton
                onClick={() => {
                  handleLike(post.id);
                }}
              >
                {post.likedBy.includes(userUidRef) ? (
                  <FavoriteIcon color="error" />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </IconButton>
              {post.likedBy.length}
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default Feed;
