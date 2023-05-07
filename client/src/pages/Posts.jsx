import React from "react";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PostsP from "../components/posts/Posts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

const Posts = () => {
  const titulo = document.querySelector("#title");
  const conteudo = document.querySelector("#content");

  const [posts, setPosts] = useState([]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [token, set_token] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const tokenUser = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response);
      } catch (error) {
        navigate("/");
      }
    };
    tokenUser();
  }, [token]);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  });

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts");
      setPosts(res.data);
    };
    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/posts", {
        title,
        content,
      });
    } catch (error) {
      console.log(error);
    }
    const fetchPosts = async () => {
      const res = await axios.get("/posts");
      setPosts(res.data);
    };
    titulo.value = "";
    conteudo.value = "";
    fetchPosts();
  };

  return (
    <div className="postspage">
      <header>
        <div className="logo">
          <svg
            class="tds-icon tds-icon-logo-wordmark tds-site-logo-icon"
            viewBox="0 0 342 35"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 .1a9.7 9.7 0 0 0 7 7h11l.5.1v27.6h6.8V7.3L26 7h11a9.8 9.8 0 0 0 7-7H0zm238.6 0h-6.8v34.8H263a9.7 9.7 0 0 0 6-6.8h-30.3V0zm-52.3 6.8c3.6-1 6.6-3.8 7.4-6.9l-38.1.1v20.6h31.1v7.2h-24.4a13.6 13.6 0 0 0-8.7 7h39.9v-21h-31.2v-7h24zm116.2 28h6.7v-14h24.6v14h6.7v-21h-38zM85.3 7h26a9.6 9.6 0 0 0 7.1-7H78.3a9.6 9.6 0 0 0 7 7zm0 13.8h26a9.6 9.6 0 0 0 7.1-7H78.3a9.6 9.6 0 0 0 7 7zm0 14.1h26a9.6 9.6 0 0 0 7.1-7H78.3a9.6 9.6 0 0 0 7 7zM308.5 7h26a9.6 9.6 0 0 0 7-7h-40a9.6 9.6 0 0 0 7 7z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
        <div className="language">
          <FontAwesomeIcon icon={faGlobe} />
          <span>en-US</span>
        </div>
      </header>
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
      <PostsP posts={posts} />
    </div>
  );
};

export default Posts;
