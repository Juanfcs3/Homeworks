import { useState } from "react";
import { LinkedList } from "../structures/LinkedList";

const songs = new LinkedList();
songs.append("Kris R, Blessd - Cositas");
songs.append("Feid - Priority");
songs.append("J Balvin - Bruz Wein");
songs.append("Bad Bunny - VeLDÁ");

export default function LinkedListPage() {
  const [current, setCurrent] = useState(songs.head);

  const nextSong = () => {
    if (current && current.next) setCurrent(current.next);
};

  const restart = () => setCurrent(songs.head);

  return (
    <div style={{ padding: 20 }}>
      <h2> Playlist </h2>
      <p><strong>Cancion actual:</strong></p>
      <div style={{ margin: "8px 0", fontSize: 18 }}>
        {current ? current.value : "No hay canciones"}
      </div>
      <button onClick={nextSong} disabled={!current || !current.next}>
        Siguiente 
      </button>
      <button onClick={restart} style={{ marginLeft: 8 }}>
        Reiniciar 
      </button>

      <div style={{ marginTop: 20 }}>
        <strong>Lista completa:</strong>
        <pre>{JSON.stringify(songs.toArray(), null, 2)}</pre>
      </div>
    </div>
  );
}
