import { useState, createContext } from "react";

//1) הגדרת טיפוסים למצב התחלתי
const initialState = {
  posts: [],
  setPosts: () => {},
};

//2) create the context:
const BlogContext = createContext(initialState);

//3)  create the wrapper:
const BlogContextProvider = (props) => {
  //state:
  const [posts, setPosts] = useState([]);

  return (
    <>
      <BlogContext.Provider
        value={{ posts, setPosts }}
      >
        {props.children}
      </BlogContext.Provider>
    </>
  );
};

export { BlogContextProvider, BlogContext };
export default BlogContext;
