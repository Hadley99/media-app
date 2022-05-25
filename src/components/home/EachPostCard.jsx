import { IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { grey } from "@mui/material/colors";
import {
  LazyLoadComponent,
  LazyLoadImage,
} from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import DropdownMenu from "./DropdownMenu";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, toggleLike } from "../../redux/actions/postsAction";
import SinglePost from "../singlePost/SinglePost";
const EachPostCard = ({ post }) => {
  const [openModal, setOpenModal] = useState(false);
  const user = useSelector((state) => state.userSignin.user);

  const toggleModal = (id) => {
    setOpenModal((prev) => !prev);
  };

  const currentUserUid = user?.uid;
  const dispatch = useDispatch();
  const handleLike = async (id) => {
    dispatch(toggleLike(id));
  };
  const handleDelete = (id, uid) => {
    dispatch(deletePost(id, uid));
  };

  return (
    <>
      <Card
        key={post.id}
        elevation={0}
        sx={{
          borderRadius: 2,
          marginBottom: 2,
          backgroundColor: "white",
          border: 1,
          borderColor: grey[300],
        }}
      >
        <CardHeader
          avatar={
            <Link to={`/user/${post.createdBy.uid}`}>
              <Avatar
                aria-label="profile"
                sx={{ width: 35, height: 35 }}
                src={post.createdBy.photoURL}
              />
            </Link>
          }
          action={
            <DropdownMenu
              post={post}
              currentUserUid={currentUserUid}
              handleDelete={handleDelete}
            />
          }
          title={
            <Link to={`/user/${post.createdBy.uid}`}>
              {post.createdBy.displayName}
            </Link>
          }
          titleTypographyProps={{
            fontWeight: "medium",
            fontSize: "16px",
          }}
        />
        <Link to={`/post/${post.id}`}>
          <CardMedia
            component="img"
            sx={{
              maxHeight: { xs: 400, md: 500 },
              paddingTop: 0,
              paddingBottom: 0,
              objectFit: "contain",
              backgroundColor: "black",
            }}
            src={post.image}
            alt={post.description}
          />
        </Link>

        <CardContent
          sx={{
            "&:last-child": { paddingBottom: 1 },
            paddingY: 0,
            paddingTop: 1,
            paddingBottom: 1,
          }}
        >
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
            {post.likedBy.includes(currentUserUid) ? (
              <FavoriteIcon color="error" />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
          <Box>
            <Typography component="small" fontSize={14} fontWeight="bold">
              {post.likedBy.length}{" "}
              {post.likedBy.length === 1 ? "Like" : "Likes"}
            </Typography>
            <Typography fontSize={16} variant="body2">
              <Typography component="span" fontWeight="bold">
                <Link to={`/user/${post.createdBy.uid}`}>
                  {post.createdBy.displayName}
                </Link>{" "}
              </Typography>

              {post.description}
            </Typography>
            <Typography
              component="small"
              sx={{ fontSize: 12 }}
              variant="body2"
              color="text.secondary"
            >
              {post.timestamp}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default EachPostCard;