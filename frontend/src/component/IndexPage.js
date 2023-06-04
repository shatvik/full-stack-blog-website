import React, { useEffect, useState } from "react";
import Post from "./Post";

const IndexPage = () => {
  const [posts,setPosts] = useState([]) 
  useEffect(() => {
    fetch("http://localhost:8080/post")
      .then((res) => res.json())
      .then((post) => setPosts(post));
  }, []);
  return (
    <div>
      {posts.length>0 && posts.map((post)=>(
        <Post {...post}/>
      ))}
    </div>
  );
};

export default IndexPage;
