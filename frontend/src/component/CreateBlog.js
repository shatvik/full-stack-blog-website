import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Navigate } from "react-router-dom";
const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [summary, setSumary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];
  async function createNewPost(e) {
    e.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);
    // console.log(files);
    const response = await fetch("http://localhost:8080/post", {
      method: "POST",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      setRedirect(true);
    }
    // console.log(await response.json())
  }
  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <div>
      <form onSubmit={createNewPost}>
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
        <ReactQuill
          value={content}
          modules={modules}
          formats={formats}
          onChange={(newValue) => setContent(newValue)}
        />
        <button style={{ marginTop: "5px" }}>Create Post</button>
      </form>
    </div>
  );
};

export default CreateBlog;
