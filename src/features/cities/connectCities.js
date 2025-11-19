export function connectCities(network, a, b) {
  const adj = { ...network.adjacency };
  if (!adj[a].includes(b)) adj[a] = [...adj[a], b];
  if (!adj[b].includes(a)) adj[b] = [...adj[b], a];
  return { ...network, adjacency: adj };
}
