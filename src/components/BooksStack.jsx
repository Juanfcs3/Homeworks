import React, { useState } from 'react';

const initialMockBooks = [
  { id: 1, name: 'Cien Años de Soledad', isbn: '978-3-16-148410-0', author: 'Gabriel García Márquez', editorial: 'Editorial Sudamericana' },
  { id: 2, name: 'Don Quijote de la Mancha', isbn: '978-84-670-0025-0', author: 'Miguel de Cervantes', editorial: 'Francisco de Robles' },
  { id: 3, name: 'Clean Code', isbn: '978-0-13-235088-4', author: 'Robert C. Martin', editorial: 'Prentice Hall' }
];

export default function BooksStack() {
  const [stack, setStack] = useState(initialMockBooks);
  const [form, setForm] = useState({ name: '', isbn: '', author: '', editorial: '' });
  const [message, setMessage] = useState(null);

  const push = (book) => {
    setStack(prev => [...prev, book]);
  };

  const pop = () => {
    if (stack.length === 0) {
      setMessage({ type: 'warn', text: 'La pila está vacia. No hay elementos para hacer pop.' });
      return null;
    }
    let popped = stack[stack.length - 1];
    setStack(prev => prev.slice(0, prev.length - 1));
    setMessage({ type: 'info', text: `Elemento quitado: ${popped.name} (ISBN: ${popped.isbn})` });
    return popped;
  };

  const peek = () => {
    if (stack.length === 0) {
      setMessage({ type: 'warn', text: 'La pila esta vacia' });
      return null;
    }
    const top = stack[stack.length - 1];
    setMessage({ type: 'info', text: `Tope de la pila: ${top.name} (ISBN: ${top.isbn})` });
    return top;
  };

  const isEmpty = () => stack.length === 0;
  const size = () => stack.length;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.isbn.trim() || !form.author.trim() || !form.editorial.trim()) {
      setMessage({ type: 'error', text: 'Por favor completa todos los campos' });
      return;
    }
    const newBook = {
      id: Date.now(),
      name: form.name.trim(),
      isbn: form.isbn.trim(),
      author: form.author.trim(),
      editorial: form.editorial.trim()
    };
    push(newBook);
    setForm({ name: '', isbn: '', author: '', editorial: '' });
    setMessage({ type: 'success', text: `Libro agregado: ${newBook.name}` });
  };

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const clearStack = () => {
    setStack([]);
    setMessage({ type: 'info', text: 'La pila fue limpiada.' });
  };

  return (
    <div style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial' }} className="p-6 max-w-4xl mx-auto">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Challenge 08 </h1>
      </header>

      <main className="grid md:grid-cols-2 gap-6">
        <section className="bg-white shadow rounded p-4">
          <h2 className="font-semibold mb-3">Agregar un nuevo libro</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-xs mb-1">Nombre</label>
              <input name="name" value={form.name} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Ej: El Principito" />
            </div>
            <div>
              <label className="block text-xs mb-1">ISBN</label>
              <input name="isbn" value={form.isbn} onChange={handleChange} className="w-full p-2 border rounded" placeholder="978" />
            </div>
            <div>
              <label className="block text-xs mb-1">Autor</label>
              <input name="author" value={form.author} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Nombre" />
            </div>
            <div>
              <label className="block text-xs mb-1">Editorial</label>
              <input name="editorial" value={form.editorial} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Editorial" />
            </div>

            <div className="flex gap-2 mt-2">
              <button type="submit" className="px-3 py-2 rounded shadow-sm bg-blue-600 text-white">Agregar (push)</button>
              <button type="button" onClick={pop} className="px-3 py-2 rounded shadow-sm bg-red-500 text-white">Eliminar tope (pop)</button>
              <button type="button" onClick={peek} className="px-3 py-2 rounded shadow-sm bg-yellow-500 text-black">Ver tope (peek)</button>
            </div>

            <div className="flex gap-2 mt-2">
              <button type="button" onClick={() => setMessage({type: 'info', text: `Tamaño de la pila: ${size()}`})} className="px-3 py-2 rounded border">Tamaño</button>
              <button type="button" onClick={() => setMessage({type: 'info', text: `¿Vacía?: ${isEmpty() ? 'Sí' : 'No'}`})} className="px-3 py-2 rounded border">¿isEmpty?</button>
              <button type="button" onClick={clearStack} className="px-3 py-2 rounded border">Limpiar pila</button>
            </div>

            {message && (
              <div className={`mt-3 p-2 rounded ${message.type === 'error' ? 'border-red-400 bg-red-50' : message.type === 'warn' ? 'border-yellow-400 bg-yellow-50' : 'border-green-200 bg-green-50'}`}>
                <small>{message.text}</small>
              </div>
            )}
          </form>
        </section>

        <section className="bg-white shadow rounded p-4">
          <h2 className="font-semibold mb-3">Visualización de la pila </h2>
          <p className="text-xs text-gray-600 mb-3">Muestra los libros desde el tope hacia abajo.</p>

          <div>
            {isEmpty() ? (
              <div className="p-4 text-center text-gray-500 border rounded">La pila está vacía.</div>
            ) : (
              <ul className="space-y-2">
                {[...stack].reverse().map((book, idx) => (
                  <li key={book.id} className={`p-3 border rounded flex justify-between items-start ${idx === 0 ? 'shadow-lg bg-gray-50' : ''}`}>
                    <div>
                      <div className="font-medium">{book.name}</div>
                      <div className="text-xs text-gray-600">Autor: {book.author} — Editorial: {book.editorial}</div>
                      <div className="text-xs text-gray-500">ISBN: {book.isbn}</div>
                    </div>
                    <div className="text-xs text-gray-500">#{stack.length - idx}</div>
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
