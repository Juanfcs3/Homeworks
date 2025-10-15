import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchQueue, addMessage } from "../features/directQueue/queueThunks";
import { dequeueLocal } from "../features/directQueue/queueSlice";

const DirectQueue = () => {
  const dispatch = useDispatch();
  const { queue } = useSelector((s) => s.queue);
  const user = useSelector((s) => s.auth.user);
  const [message, setMessage] = useState("");

  useEffect(() => {
    dispatch(fetchQueue());
  }, [dispatch]);

  const sendMessage = () => {
    if (!user || !message.trim()) return;
    dispatch(addMessage({ user: user.email, message, createdAt: Date.now() }));
    setMessage("");
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
      <h4>Cola Directa</h4>
      <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Mensaje" />
      <button onClick={sendMessage}>Enviar</button>
      <button onClick={() => dispatch(dequeueLocal())}>Atender primero</button>
      <ul>
        {queue.map((m) => (
          <li key={m.id}><strong>{m.user}</strong>: {m.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default DirectQueue;
