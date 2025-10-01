import React, { useState } from 'react';


export default function PersonForm({ onAdd }) {
const [name, setName] = useState('');
const [amount, setAmount] = useState('');


const submit = (e) => {
e.preventDefault();
if (!name.trim() || !amount) return alert('Por favor ingresa nombre y monto');
onAdd(name.trim(), amount);
setName('');
setAmount('');
};


return (
<form onSubmit={submit} className="person-form">
<h3>Agregar persona</h3>


<label>
Nombre
<input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej: Juan" />
</label>


<label>
Monto a retirar
<input
type="number"
value={amount}
onChange={(e) => setAmount(e.target.value)}
placeholder="Ej: 50000"
/>
</label>


<button type="submit">Agregar (enqueue)</button>
</form>
);
}