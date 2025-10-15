import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, addPost } from "../features/posts/postsThunks";
import { addNotification } from "../features/notifications/notificationsThunks";

const PostSection = () => {
  const dispatch = useDispatch();
  const { items: posts, loading } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);
  const [content, setContent] = useState("");

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleAddPost = async () => {
    if (!content.trim()) return;
    const newPost = { content, author: user.email };
    await dispatch(addPost(newPost));
    await dispatch(addNotification(`${user.email} publicó algo nuevo.`));
    setContent("");
  };

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-2">Publicaciones</h2>

      <div className="mb-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Escribe algo..."
          className="border p-2 w-full rounded-md"
        />
        <button
          onClick={handleAddPost}
          disabled={!content.trim()}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
        >
          Publicar
        </button>
      </div>

      {loading && <p>Cargando publicaciones...</p>}

      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} className="border rounded-md p-2 mb-2">
            <p className="text-gray-800">{post.content}</p>
            <p className="text-sm text-gray-500">Por {post.author}</p>
          </div>
        ))
      ) : (
        <p>No hay publicaciones.</p>
      )}
    </div>
  );
};

export default PostSection;
