function CityList({ cities, selectedId, onSelect, onDelete }) {
  return (
    <ul className="city-list">
      {cities.map((c) => (
        <li key={c.id}>
          <div>
            <span className="city-name">{c.name}</span>
            {selectedId === c.id && <span className="badge-selected">Seleccionada</span>}
          </div>
          <div>
            <button className="secondary" onClick={() => onSelect(c.id)}>Ver</button>
            <button className="danger" onClick={() => onDelete(c.id)}>Eliminar</button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CityList;
