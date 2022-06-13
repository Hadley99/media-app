import React, { useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";

import {
  LazyLoadComponent,
  LazyLoadImage,
} from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import DropdownMenu from "./DropdownMenu";
import { deletePost } from "../../redux/actions/postsAction";
import LikeButton from "../LikeButton";
import ConfirmDialog from "../ConfirmDialog";
import { useDispatch, useSelector } from "react-redux";

const EachPostCard = ({ post, setOpen }) => {
  const dispatch = useDispatch();

  const [dialogOpen, setDialogOpen] = useState(false);

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
          //   backgroundColor: "white",
          border: 1,
          borderColor: (theme) =>
            theme.palette.mode === "dark" ? grey[900] : grey[300],
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
          action={<DropdownMenu content={post} setDialogOpen={setDialogOpen} />}
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
        <ConfirmDialog
          dialogTitle={`Are you sure you want to delete this post ?`}
          handleAction={handleDelete}
          content={post}
          open={dialogOpen}
          setDialogOpen={setDialogOpen}
        />
        <Link to={`/post/${post.id}`}>
          <CardMedia
            component="img"
            sx={{
              maxHeight: { xs: 400, md: 500 },
              //  paddingTop: 0,
              //  paddingBottom: 0,
              objectFit: "contain",
              width: "100%",
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
          <LikeButton post={post} />
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

              {post.description && post.description}
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
