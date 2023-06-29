import { React, useState, useEffect } from "react";
import api from "../../api/api.js";
import Postagens from "../../components/posts/Posts.jsx";

const Posts = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem("token");

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
  };

  return (
    <div>
      <form className="postsForm" onSubmit={(e) => handleSubmit(e)}>
        <h2>Criar posts:</h2>
        <div className="inputs">
          <label htmlFor="title">Title:</label>
          <input
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
