import { useState } from "react";
import { DoubleLinkedList } from "../structures/DoubleLinkedList";

const historyList = new DoubleLinkedList();
historyList.append("https://google.com");
historyList.append("https://www.youtube.com/");
historyList.append("https://open.spotify.com/");
historyList.append("https://www.uao.edu.co/");

export default function DoubleLinkedListPage() {
  const [current, setCurrent] = useState(historyList.head);

  const goNext = () => {
    if (current && current.next) setCurrent(current.next);
};

  const goPrev = () => {
    if (current && current.prev) setCurrent(current.prev);
  };

  const goHead = () => setCurrent(historyList.head);
  const goTail = () => setCurrent(historyList.tail);

  return (
    <div style={{ padding: 20 }}>
      <h2>Historial WEB </h2>

      <p><strong>Pagina actual:</strong></p>
      <div style={{ margin: "8px 0", fontSize: 16 }}>
        {current ? current.value : "Sin historial"}
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={goPrev} disabled={!current || !current.prev}> Atrass</button>
        <button onClick={goNext} disabled={!current || !current.next}>Adelante </button>
        <button onClick={goHead}>Ir al inicio</button>
        <button onClick={goTail}>Ir al final</button>
      </div>

      <div style={{ marginTop: 20 }}>
        <strong>Historial completo:</strong>
        <pre>{JSON.stringify(historyList.toArrayForward(), null, 2)}</pre>
      </div>
    </div>
  );
}
