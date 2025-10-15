import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../features/posts/postsThunks";

const Feed = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((s) => s.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div>
      <h4>Publicaciones</h4>
      {items.map((p) => (
        <div key={p.id} style={{ borderBottom: "1px solid #ddd", padding: "0.5rem 0" }}>
          <p><strong>{p.userEmail}</strong>: {p.text}</p>
        </div>
      ))}
    </div>
  );
};

export default Feed;
