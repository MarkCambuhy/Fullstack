import { React, useState, useEffect, useRef } from "react";
import api from "../../api/api.js";
import Postagens from "../../components/posts/Posts.jsx";
import "./style.css";
import Header from "../../components/header/Header.jsx";

const Posts = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem("token");

  const limpar = useRef();
  const limparoutro = useRef();

  const fetchPosts = async () => {
    const res = await api.get("/posts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    api.defaults.headers.Authorization = `Bearer ${token}`;
    await api.post("/posts", {
      title,
      content,
    });
    fetchPosts();
    limpar.current.value = "";
    limparoutro.current.value = "";
  };

  return (
    <div className="postcontainer">
      <Header />
      <form className="postsForm" onSubmit={(e) => handleSubmit(e)}>
        <h2>Criar posts:</h2>
        <div className="inputs">
          <label htmlFor="title">Title:</label>
          <input
            ref={limpar}
            type="text"
            name="title"
            id="title"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="inputs">
          <label htmlFor="content">Content:</label>
          <input
            ref={limparoutro}
            type="text"
            name="content"
            id="content"
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit" id="postar">
          Postar
        </button>
      </form>
      <Postagens posts={posts} />
    </div>
  );
};

export default Posts;
