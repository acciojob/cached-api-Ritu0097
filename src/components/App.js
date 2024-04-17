import React, { useState, useEffect, useMemo } from 'react';
import './App.css';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPosts = useMemo(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
          signal: abortController.signal,
        });
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Error fetching posts:', error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    return fetchData;
  }, []);

  useEffect(() => {
    fetchPosts();

    return () => {
      abortController.abort();
    };
  }, [fetchPosts]);

  return (
    <div className="app-container">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul className="post-list">
          {posts.map((post) => (
            <li key={post.id} className="post-item">
              <h3 className="post-title">{post.title}</h3>
              <p className="post-body">{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;