import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BlogContext from "../contexts/BlogContext";

const PostDetails = () => {
  const nav = useNavigate();

  //1) get the id from the nav params
  const { id } = useParams();
  //2) get the posts from BlogContext
  const { posts } = useContext(BlogContext);
  //3) find the post that matches the given id
  const post = posts.find((p) => p.id === Number(id));

  const handleBack = () => {
    nav(-1);
  };
  if (!post) {
    return <h2>No Such Post 404?</h2>;
  }
  return (
    <>
      <h2>Post Details</h2>
      <p>{post.title}</p>
      <p>{JSON.stringify(post)}</p>
      <button className="btn btn-outline-info" onClick={handleBack}>
        Back
      </button>
    </>
  );
};

export default PostDetails;
