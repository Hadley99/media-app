import Box from "@mui/material/Box";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { useParams } from "react-router-dom";
import {
  fetchSelectedPosts,
  fetchSelectedUser,
} from "../../redux/actions/fetchActions";
import ProfileTop from "./ProfileTop";
import ProfileGallery from "./ProfileGallery";

const ProfileDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.selectedPosts.posts) || [];

  useEffect(() => {
    dispatch(fetchSelectedUser(id));
    dispatch(fetchSelectedPosts(id));
  }, [id, dispatch]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <ProfileTop posts={posts} />
      <ProfileGallery posts={posts} />
    </Box>
  );
};

export default ProfileDetails;
