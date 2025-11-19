import { createId } from '../utils/id';

export function createCity(name) {
  return { id: createId(), name, rootZone: null };
}

export function createEmptyNetwork() {
  return { cities: [], adjacency: {} };
}
