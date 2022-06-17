import Avatar from "@mui/material/Avatar";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import { grey } from "@mui/material/colors";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteComment } from "../../../redux/actions/commentsAction";
import DropdownMenu from "../../home/DropdownMenu";
import ConfirmDialog from "../../ConfirmDialog";

const AllComments = ({ comment, postId }) => {
  const dispatch = useDispatch();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDelete = (id, uid) => {
    dispatch(deleteComment(id, uid, postId));
  };

  return (
    <Card
      elevation={0}
      sx={{
        marginY: 1,
      }}
    >
      <CardHeader
        sx={{
          paddingY: 1,
          paddingLeft: 2,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? grey[900] : grey[200],
        }}
        action={
          <DropdownMenu content={comment} setDialogOpen={setDialogOpen} />
        }
        avatar={
          <Link to={`/user/${comment.createdBy?.uid}`}>
            <Avatar
              sx={{ width: 30, height: 30 }}
              aria-label="profile"
              src={comment.createdBy?.photoURL}
            />
          </Link>
        }
        title={
          <Link to={`/user/${comment.createdBy?.uid}`}>
            {comment.createdBy?.displayName}
          </Link>
        }
        titleTypographyProps={{
          fontWeight: "medium",
          fontSize: "16px",
        }}
      />
      <ConfirmDialog
        dialogTitle={`Are you sure you want to delete this comment ?`}
        handleAction={handleDelete}
        content={comment}
        open={dialogOpen}
        setDialogOpen={setDialogOpen}
      />
      <CardContent
        sx={{
          paddingY: 1,
          paddingLeft: 7,
          "&:last-child": { paddingBottom: 1 },
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? grey[900] : grey[200],
        }}
      >
        <Typography>{comment.description}</Typography>

        <Typography
          textAlign="end"
          display="block"
          color={grey[600]}
          variant="small"
          component="small"
          fontStyle="italic"
        >
          {comment.timestamp}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default AllComments;
