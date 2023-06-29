import "./Post.css";

export default function Post({ post }) {
  return (
    <div className="post">
      <span className="postTitle">{post.title}</span> <br />
      <span className="postContent">{post.content}</span>
    </div>
  );
}
