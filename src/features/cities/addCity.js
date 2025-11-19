import { createCity } from '../../models/network';

export function addCity(network, name) {
  const city = createCity(name);
  return {
    cities: [...network.cities, city],
    adjacency: { ...network.adjacency, [city.id]: [] },
  };
}
