import React, { useContext, useEffect } from "react";
import { request } from "../utils/axios-interceptors";
import { useQuery } from "react-query";
import Spinner from "../components/Spinner";
import BlogContext from "../contexts/BlogContext";
import { useNavigate } from "react-router-dom";
const postsRequest = () => request({ url: "/posts" });

const Posts = () => {
  const { isLoading, data: res } = useQuery("get-posts", postsRequest);
  const { setPosts } = useContext(BlogContext);
  
  const nav = useNavigate();

  useEffect(() => {
    if (res && res.data) {
      setPosts(res.data);
    }
  }, [res, setPosts]);

  if (isLoading) {
    return <Spinner />;
  }

  
  const handlePostClicked = (e)=>{
    // e = event, e.target = the element that triggered the event.
    const postId = e.target.id;
    nav(`/posts/${postId}`);
  }
  return (
    <>
      <h2>Posts</h2>
      {res &&
        res.data &&
        res.data.map((item) => {
          return (
            <div onClick={handlePostClicked} key={item.id} id={item.id}>
              {item.title}
            </div>
          );
        })}
    </>
  );
};

export default Posts;
