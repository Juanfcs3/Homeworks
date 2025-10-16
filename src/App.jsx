import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginWithEmail,
  loginWithGoogle,
  logoutUser,
  registerWithEmail,
} from "./store/slices/authSlice";
import {
  startRealtimeNotes,
  addNote,
  updateNote,
  deleteNote,
  sendMessageRT,
  setMessages,
} from "./store/slices/dataSlice";
import { auth, rtdb } from "./firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { ref, onValue } from "firebase/database";

function App() {
  const dispatch = useDispatch();
  const authState = useSelector((s) => s.auth);
  const dataState = useSelector((s) => s.data);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [editingBody, setEditingBody] = useState("");

  const [chatMessage, setChatMessage] = useState("");
  const [screenId, setScreenId] = useState("my-screen");
  const [messages, setLocalMessages] = useState({});

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {});
    return () => unsub();
  }, []);

  useEffect(() => {
    dispatch(startRealtimeNotes());
  }, [dispatch]);

  useEffect(() => {
    const refPath = ref(rtdb, `messages/${screenId}`);
    const unsub = onValue(refPath, (snapshot) => {
      const val = snapshot.val() || {};
      setLocalMessages(val);
      dispatch(setMessages(val));
    });
    return () => {
      unsub();
    };
  }, [screenId, dispatch]);

  const handleEmailLogin = () => {
    dispatch(loginWithEmail({ email, password }));
  };
  const handleRegister = () => {
    dispatch(registerWithEmail({ email, password }));
  };
  const handleGoogleLogin = () => {
    dispatch(loginWithGoogle());
  };
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleAddNote = () => {
    if (!newTitle) return alert("Agrega un título");
    dispatch(addNote({ title: newTitle, body: newBody }));
    setNewTitle("");
    setNewBody("");
  };

  const startEdit = (note) => {
    setEditingId(note.id);
    setEditingTitle(note.title);
    setEditingBody(note.body);
  };
  const handleUpdateNote = () => {
    if (!editingId) return;
    dispatch(updateNote({ id: editingId, title: editingTitle, body: editingBody }));
    setEditingId(null);
    setEditingTitle("");
    setEditingBody("");
  };
  const handleDeleteNote = (id) => {
    if (!window.confirm("¿Eliminar nota?")) return;
    dispatch(deleteNote({ id }));
  };

  const handleSendMessage = () => {
    if (!chatMessage) return;
    const uid = authState.user?.uid || "anon";
    dispatch(sendMessageRT({ screenId, message: chatMessage, uid }));
    setChatMessage("");
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h1>Challenges  </h1>

      <section style={{ border: "1px solid #ddd", padding: 12, marginBottom: 12 }}>
        <h2>Auth (Challenge 11)</h2>
        {authState.user ? (
          <div>
            <p>Conectado como: {authState.user.email || authState.user.displayName}</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div>
            <div>
              <input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={handleEmailLogin}>Login con Email</button>
              <button onClick={handleRegister}>Registrar nuevo usuario</button>
            </div>
            <div style={{ marginTop: 8 }}>
              <button onClick={handleGoogleLogin}>Login con Google</button>
            </div>
            {authState.error && <p style={{ color: "red" }}>{authState.error}</p>}
          </div>
        )}
      </section>

      <section style={{ border: "1px solid #ddd", padding: 12, marginBottom: 12 }}>
        <h2>CRUD (Challenge 12)</h2>
        <div>
          <h3>Crear Nota</h3>
          <input
            placeholder="Título"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <input
            placeholder="Cuerpo"
            value={newBody}
            onChange={(e) => setNewBody(e.target.value)}
          />
          <button onClick={handleAddNote}>Agregar</button>
        </div>

        {dataState.error && (
          <p style={{ color: "red" }}>Error Firestore: {dataState.error}</p>
        )}

        <div
          style={{
            marginTop: 12,
            display: "flex",
            flexDirection: "column-reverse",
            gap: "8px",
            maxHeight: "300px",
            overflowY: "auto",
            border: "1px solid #eee",
            padding: "8px",
            background: "#fafafa",
          }}
        >
          {dataState.notes?.map((n) => (
            <div
              key={n.id}
              style={{
                background: "#fff",
                borderRadius: "8px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                padding: "8px",
              }}
            >
              <strong>{n.title}</strong>
              <p style={{ margin: "4px 0" }}>{n.body}</p>
              {n.createdAt && (
                <small style={{ color: "#666" }}>
                  {new Date(n.createdAt).toLocaleString()}
                </small>
              )}
              <div style={{ marginTop: "6px" }}>
                <button onClick={() => startEdit(n)}>Editar</button>
                <button onClick={() => handleDeleteNote(n.id)}>Eliminar</button>
              </div>
            </div>
          ))}
        </div>

        {editingId && (
          <div style={{ marginTop: 12 }}>
            <h3>Editar Nota</h3>
            <input
              value={editingTitle}
              onChange={(e) => setEditingTitle(e.target.value)}
            />
            <input
              value={editingBody}
              onChange={(e) => setEditingBody(e.target.value)}
            />
            <button onClick={handleUpdateNote}>Guardar Cambios</button>
            <button onClick={() => setEditingId(null)}>Cancelar</button>
          </div>
        )}
      </section>

      <section style={{ border: "1px solid #ddd", padding: 12 }}>
        <h2>Chat en vivo (Challenge 13)</h2>
        <div>
          <label>Screen id: </label>
          <input value={screenId} onChange={(e) => setScreenId(e.target.value)} />
        </div>
        <div style={{ marginTop: 8 }}>
          <input
            placeholder="Mensaje..."
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
          />
          <button onClick={handleSendMessage}>Enviar</button>
        </div>

        <div style={{ marginTop: 12 }}>
          <h4>Mensajes (en vivo)</h4>
          <div
            style={{
              maxHeight: 200,
              overflow: "auto",
              border: "1px solid #eee",
              padding: 8,
              background: "#fafafa",
            }}
          >
            {Object.entries(messages || {}).length === 0 && <p>No hay mensajes</p>}
            {Object.entries(messages || {}).map(([k, v]) => (
              <div
                key={k}
                style={{
                  marginBottom: 6,
                  background: "#fff",
                  borderRadius: "8px",
                  padding: "6px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                }}
              >
                <small>{new Date(v.ts).toLocaleString()}</small>
                <div>
                  <strong>{v.uid}</strong>: {v.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
