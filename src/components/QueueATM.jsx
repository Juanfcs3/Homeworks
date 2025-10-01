import React, { useState } from 'react';

const initialMockQueue = [
  { id: 1, name: 'Ana', amount: 200000, date: new Date('2025-09-24T09:30') },
  { id: 2, name: 'Carlos', amount: 50000, date: new Date('2025-09-24T08:15') },
  { id: 3, name: 'María', amount: 150000, date: new Date('2025-09-24T10:00') }
];

export default function QueueATM() {
  const [queue, setQueue] = useState(
    [...initialMockQueue].sort((a, b) => a.date - b.date)
  );
  const [form, setForm] = useState({ name: '', amount: '', date: '' });
  const [message, setMessage] = useState(null);

  const enqueue = (person) => {
    setQueue(prev => [...prev, person].sort((a, b) => a.date - b.date));
  };

  const dequeue = () => {
    if (queue.length === 0) {
      setMessage({ type: 'warn', text: 'La cola está vacía. No hay elementos para atender.' });
      return null;
    }
    const [first, ...rest] = queue;
    setQueue(rest);
    setMessage({ type: 'info', text: `Atendido: ${first.name} — Retiro: $${first.amount} — Fecha: ${first.date.toLocaleString()}` });
    return first;
  };

  const peek = () => {
    if (queue.length === 0) {
      setMessage({ type: 'warn', text: 'La cola está vacía.' });
      return null;
    }
    const first = queue[0];
    setMessage({ type: 'info', text: `Siguiente: ${first.name} — $${first.amount} — Fecha: ${first.date.toLocaleString()}` });
    return first;
  };

  const isEmpty = () => queue.length === 0;
  const size = () => queue.length;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.amount.trim() || !form.date.trim()) {
      setMessage({ type: 'error', text: 'Por favor completa todos los campos' });
      return;
    }
    const newPerson = {
      id: Date.now(),
      name: form.name.trim(),
      amount: Number(form.amount),
      date: new Date(form.date)
    };
    enqueue(newPerson);
    setForm({ name: '', amount: '', date: '' });
    setMessage({ type: 'success', text: `Persona agregada: ${newPerson.name}` });
  };

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const clearQueue = () => {
    setQueue([]);
    setMessage({ type: 'info', text: 'La cola fue limpiada.' });
  };

  return (
    <div style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial' }} className="p-6 max-w-4xl mx-auto">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Challenge 09 </h1>
      </header>

      <main className="grid md:grid-cols-2 gap-6">
        <section className="bg-white shadow rounded p-4">
          <h2 className="font-semibold mb-3">Agregar persona a la cola</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-xs mb-1">Nombre</label>
              <input name="name" value={form.name} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Ej: Juan" />
            </div>
            <div>
              <label className="block text-xs mb-1">Monto a retirar</label>
              <input name="amount" type="number" value={form.amount} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Ej: 50000" />
            </div>
            <div>
              <label className="block text-xs mb-1">Fecha y hora</label>
              <input name="date" type="datetime-local" value={form.date} onChange={handleChange} className="w-full p-2 border rounded" />
            </div>

            <div className="flex gap-2 mt-2">
              <button type="submit" className="px-3 py-2 rounded shadow-sm bg-blue-600 text-white">Agregar (enqueue)</button>
              <button type="button" onClick={dequeue} className="px-3 py-2 rounded shadow-sm bg-red-500 text-white">Atender (dequeue)</button>
              <button type="button" onClick={peek} className="px-3 py-2 rounded shadow-sm bg-yellow-500 text-black">Ver siguiente (peek)</button>
            </div>

            <div className="flex gap-2 mt-2">
              <button type="button" onClick={() => setMessage({ type: 'info', text: `Tamaño de la cola: ${size()}` })} className="px-3 py-2 rounded border">Tamaño</button>
              <button type="button" onClick={() => setMessage({ type: 'info', text: `¿Vacía?: ${isEmpty() ? 'Sí' : 'No'}` })} className="px-3 py-2 rounded border">¿isEmpty?</button>
              <button type="button" onClick={clearQueue} className="px-3 py-2 rounded border">Limpiar cola</button>
            </div>

            {message && (
              <div className={`mt-3 p-2 rounded ${message.type === 'error' ? 'border-red-400 bg-red-50' : message.type === 'warn' ? 'border-yellow-400 bg-yellow-50' : 'border-green-200 bg-green-50'}`}>
                <small>{message.text}</small>
              </div>
            )}
          </form>
        </section>

        <section className="bg-white shadow rounded p-4">
          <h2 className="font-semibold mb-3">Visualización de la cola</h2>
          <p className="text-xs text-gray-600 mb-3">Ordenada automáticamente por fecha más próxima.</p>

          <div>
            {isEmpty() ? (
              <div className="p-4 text-center text-gray-500 border rounded">La cola está vacía.</div>
            ) : (
              <ul className="space-y-2">
                {queue.map((p, idx) => (
                  <li key={p.id} className={`p-3 border rounded flex justify-between items-start ${idx === 0 ? 'shadow-lg bg-gray-50' : ''}`}>
                    <div>
                      <div className="font-medium">{p.name}</div>
                      <div className="text-xs text-gray-600">Monto: ${p.amount}</div>
                      <div className="text-xs text-gray-500">Fecha: {p.date.toLocaleString()}</div>
                    </div>
                    <div className="text-xs text-gray-500">Posición #{idx + 1}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
