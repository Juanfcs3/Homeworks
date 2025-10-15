import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotifications } from "../features/notifications/notificationsThunks";

const Header = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications.list || []);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  return (
    <header className="flex justify-between items-center p-4 bg-blue-600 text-white shadow-md">
      <h1 className="text-xl font-bold"> Red Social UAO</h1>

      {user ? (
        <div className="flex items-center gap-4">
          <p>Hola, {user.email}</p>
          <div className="relative">
            <span className="text-2xl">🔔</span>
            {notifications && notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 rounded-full">
                {notifications.length}
              </span>
            )}
          </div>
        </div>
      ) : (
        <p className="italic">Inicia sesión para ver tus notificaciones</p>
      )}
    </header>
  );
};

export default Header;
