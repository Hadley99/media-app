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
import { Divider } from "@mui/material";

const ProfileMain = () => {
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
      <Divider sx={{ marginBottom: 3 }} />
      <ProfileGallery posts={posts} />
    </Box>
  );
};

export default ProfileMain;
