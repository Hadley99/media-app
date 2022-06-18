import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { grey } from "@mui/material/colors";
import ShareIcon from "@mui/icons-material/Share";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";

import ReactReadMoreReadLess from "react-read-more-read-less";
import { RWebShare } from "react-web-share";

import DropdownMenu from "./DropdownMenu";
import LikeButton from "../LikeButton";
import ConfirmDialog from "../ConfirmDialog";
import { deletePost } from "../../redux/actions/postsAction";

// import {
//   LazyLoadComponent,
//   LazyLoadImage,
// } from "react-lazy-load-image-component";
const EachPostCard = ({ post }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = (id, uid, imageUrl) => {
    dispatch(deletePost(id, uid, imageUrl));
  };

  return (
    <>
      <Card
        key={post.id}
        elevation={0}
        sx={{
          borderRadius: 2,
          marginBottom: 2,
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
              height: { xs: 325, sm: 400, md: 500 },
              //  aspectRatio: "1/1",
              //maxHeight: { xs: 400, md: 500 },
              objectFit: "contain",
              objectPosition: "center",
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
          <Stack flexDirection="row" alignItems="center">
            <>
              <LikeButton post={post} />
            </>
            <>
              {/* <Typography marginLeft={1}>{post.commentsCount}</Typography> */}
              <Link to={`/post/${post.id}`}>
                <IconButton
                  disableRipple
                  sx={{
                    padding: 0,
                    marginLeft: 1,
                    "&:hover": {
                      color: grey[400],
                    },
                  }}
                >
                  <InsertCommentOutlinedIcon />
                </IconButton>
              </Link>
            </>
            <>
              <RWebShare
                data={{
                  text: `Check this post out by ${post?.createdBy?.displayName} on Friend.ly`,
                  url: `${window.location.href}post/${post.id}`,
                  title: "Friend.ly",
                }}
              >
                <IconButton
                  disableRipple
                  sx={{
                    padding: 0,
                    marginLeft: 1,
                    "&:hover": {
                      color: grey[400],
                    },
                  }}
                >
                  <ShareIcon />
                </IconButton>
              </RWebShare>
            </>
          </Stack>
          <Box>
            <>
              <Typography>
                {post.likedBy.length}{" "}
                {post.likedBy.length === 1 ? "like" : "likes"}
              </Typography>
            </>
            <Typography fontSize={16} variant="body2">
              <Typography component="span" fontWeight="bold">
                <Link to={`/user/${post.createdBy.uid}`}>
                  {post.createdBy.displayName}
                </Link>{" "}
              </Typography>
              {post.description && (
                <ReactReadMoreReadLess
                  charLimit={200}
                  readMoreText={"Read more"}
                  readLessText={"Read less"}
                  readMoreClassName="read-more-less--more"
                  readLessClassName="read-more-less--less"
                >
                  {post.description}
                </ReactReadMoreReadLess>
              )}
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
