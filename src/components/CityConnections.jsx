function CityConnections({ network, cityId }) {
  if (!cityId) return null;
  const ids = network.adjacency[cityId] || [];
  const cities = ids
    .map((id) => network.cities.find((c) => c.id === id))
    .filter(Boolean);
  return (
    <div className="section">
      <h3>Ciudades conectadas</h3>
      {cities.length ? (
        <ul>{cities.map((c) => <li key={c.id}>{c.name}</li>)}</ul>
      ) : (
        <p>Sin conexiones</p>
      )}
    </div>
  );
}

export default CityConnections;
