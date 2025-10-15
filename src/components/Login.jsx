import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, loginUser, checkAuthState } from "../features/auth/authThunks"; 
const Login = () => {
  const dispatch = useDispatch();
  const auth = useSelector((s) => s.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {

    dispatch(checkAuthState());
  }, [dispatch]);

  return (
    <div>
      {!auth.user ? (
        <div>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={() => dispatch(loginUser({ email, password }))}>
            Login
          </button>
          <button onClick={() => dispatch(registerUser({ email, password }))}>
            Registrar
          </button>
        </div>
      ) : (
        <p>Sesión activa: {auth.user.email}</p>
      )}
      {auth.loading && <p>Cargando...</p>}
      {auth.error && <p style={{ color: "red" }}>{auth.error}</p>}
    </div>
  );
};

export default Login;
