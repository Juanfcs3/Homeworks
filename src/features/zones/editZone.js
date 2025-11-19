import { cloneZoneTree, findZoneById } from '../../models/zoneTree';

export function editZone(city, zoneId, newName) {
  if (!city.rootZone) return city;
  const root = cloneZoneTree(city.rootZone);
  const node = findZoneById(root, zoneId);
  if (node) node.name = newName;
  return { ...city, rootZone: root };
}
