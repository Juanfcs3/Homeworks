import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthState, logoutUser } from "./features/auth/authThunks";
import Header from "./components/Header";
import PostSection from "./components/PostSection.jsx";
import Notifications from "./components/Notifications";
import Login from "./components/Login"; 

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuthState());
  }, [dispatch]);

  return (
    <div className="p-4">
      <Header />
      {user ? (
        <>
          <p>Sesión activa: {user.email}</p>
          <button
            onClick={() => dispatch(logoutUser())}
            className="bg-red-500 text-white px-4 py-2 rounded-md mt-2"
          >
            Cerrar sesión
          </button>

          <PostSection />
          <Notifications />
        </>
      ) : (
        <>
          <p className="text-center mt-4">Inicia sesión para continuar</p>
          <Login /> }
        </>
      )}
    </div>
  );
};

export default App;
