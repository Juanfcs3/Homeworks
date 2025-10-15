import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotifications } from "../features/notifications/notificationsThunks";

const Notifications = () => {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.notifications);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">Notificaciones</h2>

      {loading && <p>Cargando notificaciones...</p>}

      {list.length > 0 ? (
        list.map((notif) => (
          <div key={notif.id} className="border p-2 rounded-md mb-2">
            <p>{notif.message}</p>
          </div>
        ))
      ) : (
        <p>No hay notificaciones.</p>
      )}
    </div>
  );
};

export default Notifications;
