import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const API = process.env.REACT_APP_API_URL; // 👈 ADD

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    fetch(`${API}/api/posts/`)
      .then(res => res.json())
      .then(data => setPosts(data));
  };

  const createPost = () => {
    if (!title || !content) return;

    fetch(`${API}/api/posts/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    }).then(() => {
      setTitle("");
      setContent("");
      fetchPosts();
    });
  };

  const deletePost = (id) => {
    fetch(`${API}/api/posts/${id}/`, {
      method: "DELETE",
    }).then(fetchPosts);
  };

  return (
    <div className="container">
      <h1 className="heading">🚀 Blog App</h1>

      <div className="form">
        <h2>Create Post</h2>
        <input
          className="input"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="textarea"
          placeholder="Enter content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button className="btn" onClick={createPost}>
          Add Post
        </button>
      </div>

      <div className="posts">
        {posts.map((post) => (
          <div key={post.id} className="card">
            <h2>{post.title}</h2>
            <p>{post.content}</p>

            <button
              className="deleteBtn"
              onClick={() => deletePost(post.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;