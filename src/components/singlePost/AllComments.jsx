import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const AllComments = () => {
  const allComments = useSelector((state) => state.fetchComments.comments);

  return (
    allComments &&
    allComments.map((comment) => (
      <div key={comment.id}>{comment.description}</div>
    ))
  );
};

export default AllComments;
