import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import React from "react";
import { Link } from "react-router-dom";
import DropdownMenu from "../home/DropdownMenu";

const PostHeader = ({ post, setDialogOpen, display }) => {
  return (
    <>
      {/* for xs and sm screens */}
      <CardHeader
        action={<DropdownMenu content={post} setDialogOpen={setDialogOpen} />}
        sx={{
          display: display,
          paddingTop: 1,
          paddingX: 0,
        }}
        avatar={
          <Link to={`/user/${post.createdBy?.uid}`}>
            <Avatar aria-label="profile" src={post.createdBy?.photoURL} />
          </Link>
        }
        title={
          <Link to={`/user/${post.createdBy?.uid}`}>
            {post.createdBy?.displayName}
          </Link>
        }
        subheader={post.timestamp}
        titleTypographyProps={{
          fontWeight: "medium",
          fontSize: "16px",
        }}
      />
    </>
  );
};

export default PostHeader;
