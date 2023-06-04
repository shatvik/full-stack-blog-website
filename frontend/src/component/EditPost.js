import React, { useEffect, useState } from "react";
// import ReactQuill from "react-quill";
import { Navigate, useParams } from "react-router-dom";
import Editor from "./Editor";

const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSumary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [cover, setCover] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/post/" + id)
      .then((res) => res.json())
      .then((postInfo) => {
        setTitle(postInfo.title);
        setContent(postInfo.content);
        setSumary(postInfo.summary);
      });
  }, []);

  const updatePost = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id", id);
    if (files?.[0]) {
      data.set("file", files?.[0]);
    }
    const response = await fetch("http://localhost:8080/post", {
      method: "PUT",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      setRedirect(true);
    }
  };
  if (redirect) {
    return <Navigate to={"/post/" + id} />;
  }
  return (
    <div>
      <form onSubmit={updatePost}>
        <input
          type="title"
          placeholder={"title"}
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <input
          type="summary"
          placeholder={"summary"}
          value={summary}
          onChange={(ev) => setSumary(ev.target.value)}
        />
        <input type="file" onChange={(e) => setFiles(e.target.files)} />
        <Editor onChange={setContent} value={content} />
        <button style={{ marginTop: "5px" }}>Update Post</button>
      </form>
    </div>
  );
};

export default EditPost;
