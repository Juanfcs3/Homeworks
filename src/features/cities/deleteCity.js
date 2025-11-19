export function deleteCity(network, id) {
  const cities = network.cities.filter((c) => c.id !== id);
  const adjacency = {};
  Object.entries(network.adjacency).forEach(([k, v]) => {
    if (k !== id) adjacency[k] = v.filter((n) => n !== id);
  });
  return { cities, adjacency };
}
