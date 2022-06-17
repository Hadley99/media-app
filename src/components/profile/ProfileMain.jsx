import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchSelectedPosts,
  fetchSelectedUser,
} from "../../redux/actions/fetchActions";
import ProfileTop from "./ProfileTop";
import ProfileGallery from "./ProfileGallery";

const ProfileMain = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { posts, error } = useSelector((state) => state.selectedPosts);

  useEffect(() => {
    dispatch(fetchSelectedUser(id));
    dispatch(fetchSelectedPosts(id));
  }, [id, dispatch]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <ProfileTop posts={posts} />
      <Divider sx={{ marginBottom: 3 }} />
      <ProfileGallery posts={posts} error={error} />
    </Box>
  );
};

export default ProfileMain;
