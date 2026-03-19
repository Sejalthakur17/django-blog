import { useEffect, useState } from "react";
import "./App.css";

const API = "/api";

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    fetch(`${API}/posts/`)   // ✅ fixed
      .then(res => res.json())
      .then(data => setPosts(data));
  };

  const createPost = () => {
    if (!title || !content) return;

    fetch(`${API}/posts/`, {   // ✅ fixed
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
    fetch(`${API}/posts/${id}/`, {   // ✅ fixed
      method: "DELETE",
    }).then(fetchPosts);
  };

  return (
    <div className="container">
      <h1>🚀 Blog App</h1>

      <div>
        <input
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Enter content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button onClick={createPost}>Add Post</button>
      </div>

      <hr />

      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>

          <button onClick={() => deletePost(post.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;